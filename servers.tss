// server.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(cors());
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP
  port: 465, // Secure port
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER, // from .env
    pass: process.env.EMAIL_PASS, // from .env
  },
});

// Test connection (optional)
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ Server is ready to take messages");
  }
});

// Route: send email
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (to, subject, text/html)",
      });
    }

    const mailOptions = {
      from: `"My Portfolio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📩 Message sent:", info.messageId);

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start server (only for local dev, Vercel ignores this)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
