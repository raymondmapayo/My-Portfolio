// api/send-email.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

// Use the supported Node serverless runtime
export const config = { runtime: "nodejs" };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        code: "MISSING_ENV",
        message:
          "EMAIL_USER or EMAIL_PASS missing. Add them in Vercel → Project → Settings → Environment Variables (set for Production & Preview) and redeploy.",
      });
    }

    // Handle both parsed body and raw string body
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : (req.body ?? {});
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        code: "BAD_REQUEST",
        message: "Missing fields: name, email, message",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    // Don't call transporter.verify() here — it can increase cold start latency and cause timeouts.
    // Instead, try to send and return any error message back for debugging.

    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    });

    return res
      .status(200)
      .json({ success: true, messageId: (info as any)?.messageId ?? null });
  } catch (err: any) {
    // Include err.message so you can inspect logs / browser response
    return res.status(500).json({
      success: false,
      code: "SEND_FAILED",
      message: err?.message ?? String(err),
    });
  }
}
