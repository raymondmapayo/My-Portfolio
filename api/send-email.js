// /api/send-email.js
import dotenv from "dotenv";
dotenv.config();

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed. Use POST." });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASS || "").trim();

  if (!user || !pass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS env vars");
    return res.status(500).json({
      success: false,
      message: "Mail server not configured (missing env vars)",
    });
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // Verify credentials early with clear error if auth fails
    await new Promise((resolve, reject) => {
      transporter.verify((err, success) => {
        if (err) {
          // nodemailer gives detailed auth errors here (EAUTH / BadCredentials)
          return reject(err);
        }
        resolve(success);
      });
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: user,
      subject: `New message from ${name} via portfolio site`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    // Provide helpful hint for common auth errors without leaking sensitive info
    const msg = /Auth|EAUTH|535|5.7.8|BadCredentials/i.test(String(err))
      ? "Authentication failed. Check EMAIL_USER and EMAIL_PASS (use Gmail App Password with 2FA)."
      : "Failed to send email";
    return res
      .status(500)
      .json({ success: false, message: msg, error: String(err) });
  }
}
