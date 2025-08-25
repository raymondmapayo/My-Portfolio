// /api/send-email.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // respond to preflight CORS requests (if any)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    console.warn("Method not allowed:", req.method);
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed. Use POST." });
  }

  try {
    // optional: allow same-origin only (remove if not needed)
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      console.warn("Bad request - missing fields:", { name, email, message });
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS env vars");
      return res.status(500).json({
        success: false,
        message: "Mail server not configured (missing env vars)",
      });
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
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
    console.error("Error in /api/send-email:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err?.message || String(err),
    });
  }
}
