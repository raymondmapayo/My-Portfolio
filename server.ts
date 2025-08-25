// server.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Allow frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-portfolio-n0gknm417-raymonds-projects-0478c341.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON parser
app.use(express.json());

// POST /api/send-email
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    console.error("Missing fields:", req.body);
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

  console.log("EMAIL_USER loaded:", emailUser ? true : false);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: emailUser,
      replyTo: email,
      to: emailUser,
      subject: `New message from ${name}`,
      text: message,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer sendMail error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// OPTIONS preflight
app.options("/api/send-email", (req, res) => res.sendStatus(200));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
