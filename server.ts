import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

console.log("Starting email server. Node:", process.version);

// ===== Allowed frontend domains =====
// IMPORTANT: include the exact Vercel origin shown in your browser console.
// From your error message: "https://my-portfolio-j06y92lma-raymonds-projects-0478c341.vercel.app"
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-portfolio-evh016hbe-raymonds-projects-0478c341.vercel.app",
  "https://my-portfolio-j06y92lma-raymonds-projects-0478c341.vercel.app",
  // add any other Vercel preview domains you use here
];

// ===== Optional quick debug: enable this to allow any origin (debug only!) =====
// const ALLOW_ALL = true;
const ALLOW_ALL = false;

// ===== CORS middleware (global) =====
app.use(
  cors({
    origin: (origin, callback) => {
      // origin === undefined for non-browser requests (curl/Postman/server)
      console.log("CORS check - incoming origin:", origin);
      if (!origin) {
        // allow non-browser requests
        return callback(null, true);
      }
      if (ALLOW_ALL) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // else reject
      console.warn("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false, // let our handler return response
    optionsSuccessStatus: 204,
  })
);

// Explicit preflight handler that returns the correct headers for the browser
app.options("*", (req, res) => {
  const origin = req.header("Origin") ?? "";
  console.log("OPTIONS preflight received from origin:", origin);

  if (!origin) {
    // Non-browser client - just return 200
    return res.sendStatus(200);
  }

  if (ALLOW_ALL || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    // If you need cookies/auth between frontend and backend, uncomment:
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }

  console.warn("OPTIONS blocked for origin:", origin);
  return res.sendStatus(403);
});

// ===== JSON parser =====
app.use(express.json());

// ===== Nodemailer transporter =====
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER ?? "",
    pass: process.env.EMAIL_PASS ?? "",
  },
});

// Optional: verify transporter at startup (logs error if auth wrong)
transporter.verify().then(
  () => console.log("Nodemailer transporter verified"),
  (err) => console.warn("Nodemailer transporter verification failed:", err)
);

// ===== POST /send-email =====
app.post("/send-email", async (req, res) => {
  console.log("POST /send-email - origin:", req.header("Origin"));
  try {
    const { name, email, message } = req.body ?? {};
    if (!name || !email || !message) {
      console.error("Missing fields:", req.body);
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const mail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: message,
    };

    const info = await transporter.sendMail(mail);
    console.log("Email sent:", info?.messageId ?? info);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// Simple health check
app.get("/_health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
