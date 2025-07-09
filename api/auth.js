const { MongoClient } = require('mongodb');

// Get password from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check if admin password is configured
    if (!ADMIN_PASSWORD) {
        console.error('ADMIN_PASSWORD environment variable not set');
        return res.status(500).json({ 
            success: false, 
            error: 'Admin authentication not configured' 
        });
    }

    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Check if password matches
        if (password === ADMIN_PASSWORD) {
            // In a real application, you'd want to use proper session management
            // For now, we'll just return a success response
            return res.status(200).json({ 
                success: true, 
                message: 'Authentication successful' 
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid password' 
            });
        }

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
} 