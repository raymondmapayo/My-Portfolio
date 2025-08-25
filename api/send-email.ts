import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: message,
      html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`,
    });

    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email" });
  }
}
