import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// ===== Allowed frontend domains =====
const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://my-portfolio-evh016hbe-raymonds-projects-0478c341.vercel.app", // Vercel prod
];

// ===== CORS setup =====
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight globally (fixed TS6133 warning)
app.options("*", (_req, res) => res.sendStatus(200));

// ===== JSON parser =====
app.use(express.json());

// ===== POST /send-email =====
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    console.error("Missing fields:", req.body);
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS?.trim();

  if (!emailUser || !emailPass) {
    console.error("EMAIL_USER or EMAIL_PASS missing in environment");
    return res
      .status(500)
      .json({ success: false, message: "Email credentials missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    const info = await transporter.sendMail({
      from: emailUser,
      replyTo: email,
      to: emailUser,
      subject: `New message from ${name}`,
      text: message,
    });

    console.log("Email sent:", info.messageId ?? info);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer sendMail error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// ===== Start server =====
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
