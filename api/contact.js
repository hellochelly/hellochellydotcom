import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create transporter using environment variables
    let transporter;
    
    if (process.env.EMAIL_SERVICE === 'custom') {
      // Custom SMTP settings
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Use predefined service (outlook, yahoo, etc.)
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'outlook',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    }

    // Email content with cyberpunk styling
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'chelly@hellochelly.com',
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #00ff41; border: 2px solid #00ff41;">
          <h2 style="color: #00ffff; text-align: center; margin-bottom: 30px;">🚀 New Contact Form Transmission 🚀</h2>
          
          <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #ff0080; margin-bottom: 15px;">📡 Transmission Details</h3>
            <p><strong style="color: #00ffff;">From:</strong> ${name}</p>
            <p><strong style="color: #00ffff;">Email:</strong> ${email}</p>
            <p><strong style="color: #00ffff;">Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px;">
            <h3 style="color: #ff0080; margin-bottom: 15px;">💬 Message Content</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #00ff41;">
            <p style="color: #666; font-size: 12px;">Transmitted from HelloChelly.com</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
} 