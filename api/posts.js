import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get all posts
        try {
            await client.connect();
            const database = client.db('hellochelly-blog');
            const posts = database.collection('posts');
            
            const allPosts = await posts.find({}).sort({ date: -1 }).toArray();
            
            res.status(200).json(allPosts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch posts' });
        } finally {
            await client.close();
        }
    } else if (req.method === 'POST') {
        // Create new post
        try {
            const { title, excerpt, content, author } = req.body;
            
            if (!title || !excerpt || !content) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            
            await client.connect();
            const database = client.db('hellochelly-blog');
            const posts = database.collection('posts');
            
            const newPost = {
                title,
                excerpt,
                content,
                author: author || 'HelloChelly',
                date: new Date().toISOString(),
                id: Date.now() // Simple ID generation
            };
            
            const result = await posts.insertOne(newPost);
            
            res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create post' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 