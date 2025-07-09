# Contact Form Setup Guide

Your contact form is now configured to use a Vercel serverless function. Here's how to set it up:

## 🚀 **Step 1: Install Dependencies**

Run this command in your project directory:
```bash
npm install
```

## 📧 **Step 2: Set Up Email Service**

### **Option A: Outlook/Hotmail (Most Common)**
1. **Enable 2-Step Verification** on your Microsoft account
2. **Generate an App Password**:
   - Go to Microsoft Account → Security → Advanced security options → App passwords
   - Create a new app password for "Mail"
   - Copy the generated password

### **Option B: Gmail**
1. **Enable 2-Step Verification** on your Google account
2. **Generate an App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Copy the generated password (16 characters)

### **Option C: Yahoo**
1. **Enable 2-Step Verification** on your Yahoo account
2. **Generate an App Password**:
   - Go to Yahoo Account → Security → App passwords
   - Create a new app password
   - Copy the generated password

### **Option D: Zoho Email (Custom Domain)**
1. **Log into Zoho Mail**:
   - Go to https://mail.zoho.com
   - Sign in with your email (chelly@hellochelly.com)

2. **Get your SMTP settings**:
   - Go to Settings → Mail Accounts
   - Click on your email account
   - Look for "SMTP Settings" or "Outgoing Server"
   
3. **Zoho SMTP settings**:
   - **Host**: `smtp.zoho.com`
   - **Port**: 587 (TLS) or 465 (SSL)
   - **Username**: Your full email address
   - **Password**: Your Zoho email password (or app-specific password if you have 2FA enabled)
   
4. **Set EMAIL_SERVICE to `custom`** and add these environment variables:
   - `SMTP_HOST`: smtp.zoho.com
   - `SMTP_PORT`: 587
   - `SMTP_SECURE`: false (for TLS)

## 🔧 **Step 3: Set Environment Variables**

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

```
# For Outlook/Hotmail:
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password

# For Gmail:
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# For Yahoo:
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password

# For Zoho Email:
EMAIL_SERVICE=custom
EMAIL_USER=chelly@hellochelly.com
EMAIL_PASS=your-zoho-password
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
```

## 🧪 **Step 4: Test the Form**

1. Deploy your changes to Vercel
2. Go to your contact page
3. Fill out and submit the form
4. Check your email (chelly@hellochelly.com) for the message

## 🔒 **Security Notes**

- ✅ App passwords are more secure than regular passwords
- ✅ Environment variables are encrypted in Vercel
- ✅ Email validation prevents spam
- ✅ Rate limiting is handled by Vercel

## 🎨 **Email Styling**

The emails you receive will have cyberpunk styling matching your website's theme!

## 🐛 **Troubleshooting**

If emails aren't sending:

1. Check Vercel function logs in your dashboard
2. Verify environment variables are set correctly
3. Ensure your email service allows SMTP access
4. Check spam folder for test emails

## 📱 **Local Development**

For local testing, create a `.env.local` file:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Then run:
```bash
npm run dev
```

Your contact form is now ready to send real emails! 🚀 