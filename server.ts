// server.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

console.log("Starting mail server - Node:", process.version);

// ===== Allowed frontend domains =====
// IMPORTANT: include the exact Vercel origin you see in the browser console.
// Example: "https://my-portfolio-j06y92lma-raymonds-projects-0478c341.vercel.app"
const allowedOrigins = [
  "http://localhost:5173",
  // add your exact deployed frontend origins here:
  "https://my-portfolio-j06y92lma-raymonds-projects-0478c341.vercel.app",
  "https://my-portfolio-evh016hbe-raymonds-projects-0478c341.vercel.app",
];

const ALLOW_ALL = false; // set true temporarily for debugging only

// ===== CORS middleware =====
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS check - origin:", origin);
      if (!origin) return callback(null, true); // non-browser clients allowed
      if (ALLOW_ALL) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Explicit preflight handler (returns Access-Control-Allow-* for browsers)
app.options("*", (req, res) => {
  const origin = req.header("Origin") ?? "";
  console.log("OPTIONS preflight from origin:", origin);

  if (!origin) return res.sendStatus(200);

  if (ALLOW_ALL || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    // If you need to send cookies between frontend/back, uncomment:
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }

  console.warn("OPTIONS blocked for origin:", origin);
  return res.sendStatus(403);
});

// JSON parser
app.use(express.json());

// ===== Validate env early =====
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS?.trim();

console.log("Env check - EMAIL_USER present:", !!emailUser);
console.log("Env check - EMAIL_PASS present:", !!emailPass);

if (!emailUser || !emailPass) {
  console.error(
    "WARNING: EMAIL_USER or EMAIL_PASS missing. Add them to your environment variables."
  );
}

// ===== Nodemailer transporter (Gmail example) =====
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: emailUser ?? "",
    pass: emailPass ?? "",
  },
});

// Verify transporter at startup (logs errors but won't crash)
transporter.verify().then(
  () => console.log("Nodemailer transporter verified (ready to send)."),
  (err) =>
    console.warn(
      "Nodemailer transporter verification failed (check creds):",
      err
    )
);

// ===== POST /send-email =====
// Expects: { name: string, email: string, message: string }
// Sends email TO your EMAIL_USER and sets replyTo to the sender's email.
app.post("/send-email", async (req, res) => {
  try {
    console.log("POST /send-email - origin:", req.header("Origin"));
    const { name, email, message } = req.body ?? {};

    if (!name || !email || !message) {
      console.error("Missing fields in request body:", req.body);
      return res.status(400).json({
        success: false,
        message: "Missing fields: name, email, message",
      });
    }

    if (!emailUser || !emailPass) {
      console.error("Email credentials missing on server.");
      return res
        .status(500)
        .json({ success: false, message: "Server email credentials missing" });
    }

    const mailOptions = {
      from: `"Portfolio Contact" <${emailUser}>`, // sender shown in inbox
      to: emailUser, // send to yourself
      replyTo: email, // sender's email so you can reply directly
      subject: `Portfolio message from ${name}`,
      text: `You received a message from ${name} <${email}>:\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    };

    console.log("Sending mail (redacted):", {
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent, id:", info?.messageId ?? info);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// Simple health endpoint
app.get("/_health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
