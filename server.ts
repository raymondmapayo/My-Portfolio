import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Enable CORS for your frontend domain (replace with your actual Vercel URL)
app.use(
  cors({
    origin:
      "https://my-portfolio-brmq2nzkg-raymonds-projects-0478c341.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON bodies
app.use(express.json());

// POST /api/send-email
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, "");

  if (!emailUser || !emailPass) {
    console.error("EMAIL_USER or EMAIL_PASS missing in .env");
    return res
      .status(500)
      .json({ success: false, error: "Server email credentials missing" });
  }

  // Optional debug logs
  console.log("EMAIL_USER:", emailUser);
  console.log("EMAIL_PASS:", emailPass ? "SET" : "MISSING");
  console.log("Request body:", req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: emailUser, pass: emailPass },
  });

  try {
    // Timeout wrapper for 30 seconds
    const info = await Promise.race([
      transporter.sendMail({
        from: emailUser,
        replyTo: email,
        to: emailUser,
        subject: `New message from ${name}`,
        text: message,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("sendMail timed out")), 30000)
      ),
    ]);

    console.log("Email sent:", info.messageId ?? info);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Nodemailer sendMail error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
