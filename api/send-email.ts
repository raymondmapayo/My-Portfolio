import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ===== CORS =====
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://my-portfolio-a1yiw7r6m-raymonds-projects-0478c341.vercel.app"
  ); // your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // =================

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, "");

  if (!emailUser || !emailPass) {
    console.error("EMAIL_USER or EMAIL_PASS missing in environment");
    return res
      .status(500)
      .json({ success: false, error: "Email credentials missing" });
  }

  // Optional debug logs (won't break anything)
  console.log("EMAIL_USER:", emailUser);
  console.log("EMAIL_PASS:", emailPass ? "SET" : "MISSING");
  console.log("Request body:", req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: emailUser, pass: emailPass },
  });

  try {
    // Timeout wrapper for 30 seconds
    const info = await Promise.race([
      transporter.sendMail({
        from: emailUser,
        replyTo: email,
        to: emailUser,
        subject: `New message from ${name}`,
        text: message,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("sendMail timed out")), 30000)
      ),
    ]);

    console.log("Email sent:", info.messageId ?? info);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer sendMail error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
}
