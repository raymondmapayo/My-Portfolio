// /api/send-email.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  api: {
    bodyParser: true, // Accept JSON body
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed. Use POST." });
  }

  try {
    const { name, email, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, message",
      });
    }

    // Ensure environment variables exist
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return res.status(500).json({
        success: false,
        message: "Mail server not configured (missing env vars)",
      });
    }

    // Dynamically import nodemailer (reduces cold-start risk slightly)
    const nodemailer = await import("nodemailer");

    // Create transporter. For Gmail: use App Password (2FA) in EMAIL_PASS.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    // Compose email
    const mailOptions = {
      from: `${name} <${email}>`, // displays sender name and email
      to: user, // your receiving address (EMAIL_USER)
      subject: `New message from ${name} via portfolio site`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
      // If you want HTML:
      // html: `<p>You received a message from <strong>${name}</strong> (${email})</p><p>${message}</p>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Error in /api/send-email:", err);
    // If nodemailer throws authentication error, you'll see it in logs (EAUTH)
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err?.message || String(err),
    });
  }
}
