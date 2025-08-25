// api/send-email.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

// Use the supported Node serverless runtime
export const config = { runtime: "nodejs" };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Quick health check for GET
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, now: new Date().toISOString() });
  }

  // Only POST allowed for sending email
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    // Read env vars
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    // Debug: log presence (do not log actual values)
    console.log(
      "Env - EMAIL_USER present:",
      !!EMAIL_USER,
      "EMAIL_PASS present:",
      !!EMAIL_PASS
    );
    if (EMAIL_USER)
      console.log("EMAIL_USER length:", String(EMAIL_USER).length);
    if (EMAIL_PASS)
      console.log("EMAIL_PASS length:", String(EMAIL_PASS).length);

    // Missing envs -> clear error
    if (!EMAIL_USER || !EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        code: "MISSING_ENV",
        message:
          "EMAIL_USER or EMAIL_PASS missing. Add them in Vercel → Project → Settings → Environment Variables (set for Preview & Production) and redeploy.",
      });
    }

    // Safely parse body (avoid crashing on invalid JSON)
    let body: any = {};
    try {
      body =
        typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : (req.body ?? {});
    } catch (parseErr) {
      console.error("Body parse error:", parseErr);
      return res.status(400).json({
        success: false,
        code: "BAD_JSON",
        message: "Invalid JSON body",
      });
    }

    // Accept diagnostic mode flag
    const { name, email, message, testOnly } = body ?? {};

    // Diagnostic mode: do not attempt SMTP; only report env presence
    if (testOnly === true) {
      return res.status(200).json({
        success: true,
        diagnostic: {
          envEmailUserPresent: !!EMAIL_USER,
          envEmailPassPresent: !!EMAIL_PASS,
          note: "Diagnostic mode - SMTP not attempted. Remove testOnly to send actual email.",
        },
      });
    }

    // Validate required fields for an email send
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        code: "BAD_REQUEST",
        message: "Missing fields: name, email, message",
      });
    }

    // Create transporter with timeouts suitable for serverless
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      // Add timeouts to reduce chance of long TCP hangs in serverless
      connectionTimeout: 10_000, // 10 seconds
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
      tls: {
        rejectUnauthorized: false, // aids some serverless TLS environments; change if you prefer strict TLS
      },
    });

    // Send mail (will throw on auth/network errors)
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER, // always send to yourself (EMAIL_USER)
      replyTo: email, // so you can reply to the visitor
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    });

    console.log("sendMail success, id:", (info as any)?.messageId ?? info);
    return res
      .status(200)
      .json({ success: true, messageId: (info as any)?.messageId ?? null });
  } catch (err: any) {
    // Log full error in server logs for debugging
    console.error("SEND_FAILED error:", err);
    return res.status(500).json({
      success: false,
      code: "SEND_FAILED",
      message: err?.message ?? String(err),
    });
  }
}
