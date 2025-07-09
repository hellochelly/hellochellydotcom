# Blog Setup Guide for Vercel + MongoDB

Your cyberpunk blog is now ready to work with Vercel and MongoDB! Here's how to set it up:

## 🚀 **Step 1: Set up MongoDB Atlas**

1. **Create MongoDB Atlas Account**
   - Go to https://mongodb.com
   - Sign up for a free account
   - Create a new project

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## 🔧 **Step 2: Set up Vercel Environment Variables**

1. **Go to your Vercel Dashboard**
   - Navigate to your project
   - Go to "Settings" → "Environment Variables"

2. **Add MongoDB URI**
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production, Preview, Development
   - Click "Save"

## 📦 **Step 3: Install Dependencies**

Run this command in your project directory:
```bash
npm install
```

## 🚀 **Step 4: Deploy to Vercel**

1. **Push your changes to GitHub**
2. **Deploy to Vercel** (should happen automatically)
3. **Check the deployment** in your Vercel dashboard

## ✍️ **Step 5: Create Your First Blog Post**

1. **Visit your blog**: `yourdomain.com/blog.html?admin=true`
2. **Fill out the form**:
   - Title: "Welcome to My Digital Blog"
   - Excerpt: "The first post in my cyberpunk-themed blog..."
   - Content: Your full blog post content
3. **Click "Publish Post"**
4. **Check your blog** at `yourdomain.com/blog.html`

## 🎯 **How It Works**

### **For Users:**
- Visit `/blog.html` to see all posts
- Click "Read More" to view full posts
- Posts are loaded from MongoDB via API

### **For You (Admin):**
- Visit `/blog.html?admin=true` to access admin panel
- Create new posts through the form
- Posts are saved to MongoDB and appear immediately

## 🔒 **Security Notes**

- The admin panel is currently public (anyone with the URL can access it)
- For better security, consider adding authentication
- MongoDB Atlas has built-in security features

## 🐛 **Troubleshooting**

### **Posts not loading:**
- Check MongoDB connection string in Vercel environment variables
- Verify MongoDB Atlas network access allows Vercel IPs
- Check Vercel function logs for errors

### **Can't create posts:**
- Ensure all form fields are filled
- Check browser console for errors
- Verify API endpoint is working

### **Database connection issues:**
- Make sure MongoDB Atlas cluster is running
- Verify username/password in connection string
- Check network access settings

## 📈 **Next Steps (Optional)**

1. **Add Authentication** - Protect the admin panel
2. **Add Image Upload** - Include images in blog posts
3. **Add Categories/Tags** - Organize posts better
4. **Add Comments** - Let readers comment on posts
5. **Add Search** - Search through blog posts

Your blog is now fully functional with Vercel and MongoDB! 🎉 