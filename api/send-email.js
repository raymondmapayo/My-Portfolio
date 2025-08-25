// api/send-email.js  (ESM)
// Full, uncut file — paste as-is into your repository at /api/send-email.js
import nodemailer from "nodemailer";

export const config = { runtime: "nodejs" };

// Handler for Vercel serverless function
export default async function handler(req, res) {
  // Allow a simple GET health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, now: new Date().toISOString() });
  }

  // Only POST is allowed for sending emails
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    // Read environment variables
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    // Log presence of envs (do NOT log the values themselves)
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

    // If envs missing, return clear error
    if (!EMAIL_USER || !EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        code: "MISSING_ENV",
        message:
          "EMAIL_USER or EMAIL_PASS missing. Add them in Vercel → Project → Settings → Environment Variables (set for Preview & Production) and redeploy.",
      });
    }

    // Safely parse request body (avoid crashing on invalid JSON)
    let body = {};
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

    // Extract fields
    const { name, email, message, testOnly } = body ?? {};

    // Diagnostic-only mode: do not attempt SMTP; return env presence
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

    // Validate required fields for actual send
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        code: "BAD_REQUEST",
        message: "Missing fields: name, email, message",
      });
    }

    // Create Nodemailer transporter with reasonable timeouts for serverless
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        // In some serverless environments this avoids TLS handshake rejections.
        // If you want strict TLS, remove this line.
        rejectUnauthorized: false,
      },
    });

    // Send the email (to yourself) and set replyTo to the visitor
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER, // always send to your inbox
      replyTo: email, // visitor's address for replies
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    });

    console.log("sendMail success, id:", info?.messageId ?? info);
    return res
      .status(200)
      .json({ success: true, messageId: info?.messageId ?? null });
  } catch (err) {
    // Log error server-side for debugging, but return a safe JSON to client
    console.error("SEND_FAILED error:", err);
    return res.status(500).json({
      success: false,
      code: "SEND_FAILED",
      message: err?.message ?? String(err),
    });
  }
}
