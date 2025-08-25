import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve React build (after running npm run build)
app.use(express.static(path.join(__dirname, "dist"))); // adjust if your build folder is elsewhere

// API route
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: "Missing fields" });

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS?.replace(/\s/g, "");

  if (!emailUser || !emailPass) {
    console.error("EMAIL_USER or EMAIL_PASS missing in .env");
    return res
      .status(500)
      .json({ success: false, error: "Server email credentials missing" });
  }

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
    console.error("Nodemailer error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// Catch all other requests and serve React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
