import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const emailResolver = {
  Mutation: {
    sendEmail: async (
      _: any,
      args: { name: string; email: string; message: string }
    ) => {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, // your Gmail
            pass: process.env.EMAIL_PASS, // app password
          },
        });

        await transporter.sendMail({
          from: args.email,
          to: process.env.EMAIL_USER, // your email
          subject: `New message from ${args.name}`,
          text: args.message,
        });

        return true;
      } catch (err) {
        console.error("Error sending email:", err);
        return false;
      }
    },
  },
};
