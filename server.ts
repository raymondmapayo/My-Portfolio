// /api/send-email.ts (Vercel serverless)
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  const emailPass = process.env.EMAIL_PASS?.trim();

  if (!emailUser || !emailPass) {
    return res
      .status(500)
      .json({ success: false, error: "Server email credentials missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: email,
      to: emailUser,
      subject: `New message from ${name}`,
      text: message,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
}
