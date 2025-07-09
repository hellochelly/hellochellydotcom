import { Pool } from 'pg';

// Create a connection pool using Vercel environment variables
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let client;
  
  try {
    client = await pool.connect();
    
    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS guestbook_entries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        message TEXT NOT NULL,
        ip_address VARCHAR(45),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    if (req.method === 'GET') {
      // Get all entries, ordered by newest first
      const result = await client.query(`
        SELECT id, name, message, created_at 
        FROM guestbook_entries 
        ORDER BY created_at DESC 
        LIMIT 100;
      `);
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({ error: 'Invalid JSON' });
        }
      }
      const { name, message } = body;

      // Validation
      if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
      }
      if (name.length > 30) {
        return res.status(400).json({ error: 'Name must be 30 characters or less' });
      }
      if (message.length > 500) {
        return res.status(400).json({ error: 'Message must be 500 characters or less' });
      }
      if (message.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters' });
      }

      // Get IP address (for rate limiting)
      const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';

      // Check for recent submissions from this IP (rate limiting)
      const recentEntries = await client.query(`
        SELECT COUNT(*) as count 
        FROM guestbook_entries 
        WHERE ip_address = $1 
        AND created_at > NOW() - INTERVAL '30 seconds';
      `, [ip]);
      
      if (parseInt(recentEntries.rows[0].count) > 0) {
        return res.status(429).json({ error: 'Please wait 30 seconds between submissions' });
      }

      // Check total entries limit
      const totalEntries = await client.query(`
        SELECT COUNT(*) as count FROM guestbook_entries;
      `);
      if (parseInt(totalEntries.rows[0].count) >= 100) {
        return res.status(429).json({ error: 'Guestbook is full. Please try again later.' });
      }

      // Insert new entry
      const result = await client.query(`
        INSERT INTO guestbook_entries (name, message, ip_address)
        VALUES ($1, $2, $3)
        RETURNING id, name, message, created_at;
      `, [name, message, ip]);
      
      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Guestbook API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) {
      client.release();
    }
  }
}