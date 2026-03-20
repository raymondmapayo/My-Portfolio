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
      .json({ success: false, message: "Missing required fields." });
  }

  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASS || "").trim();

  if (!user || !pass) {
    return res.status(500).json({
      success: false,
      message: "Mail server not configured. Check EMAIL_USER and EMAIL_PASS.",
    });
  }

  try {
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"Portfolio Contact" <${user}>`, // your Gmail
      replyTo: email, // visitor email
      to: user, // you receive the email
      subject: `New message from ${name} <${email}> via portfolio site`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color: #333;">New message from your portfolio contact form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f4f4f4; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);

    const msg = /Auth|EAUTH|535|5.7.8|BadCredentials/i.test(String(err))
      ? "Authentication failed. Make sure EMAIL_USER and EMAIL_PASS are correct (use Gmail App Password with 2FA)."
      : "Failed to send email. Check server logs.";

    return res
      .status(500)
      .json({ success: false, message: msg, error: String(err) });
  }
}
