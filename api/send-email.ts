import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // Extract form data
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // Get credentials from Vercel environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, ""); // remove any spaces

  if (!emailUser || !emailPass) {
    console.error("EMAIL_USER or EMAIL_PASS is missing in environment");
    return res
      .status(500)
      .json({ success: false, error: "Server email credentials missing" });
  }

  try {
    console.log("Creating transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });
    console.log("Transporter created.");

    console.log("Sending email...");
    await transporter.sendMail({
      from: emailUser, // your Gmail
      replyTo: email, // user email
      to: emailUser, // send to yourself
      subject: `New message from ${name}`,
      text: message,
    });
    console.log("Email sent successfully.");

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
}
