// src/lib/sendEmailClient.ts
const API_URL = import.meta.env.DEV
  ? "http://localhost:8081/api/send-email" // local dev Express server
  : "https://my-express-server.onrender.com/api/send-email"; // deployed Express server URL

export async function sendEmailClient(
  name: string,
  email: string,
  message: string
) {
  console.log("Sending email with:", { name, email, message });
  console.log("Using API URL:", API_URL);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    console.log("Server responded with status:", res.status);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("sendEmailClient non-OK response:", res.status, errText);
      return false;
    }

    const data = await res.json().catch(() => null);
    console.log("Server response JSON:", data);

    return data?.success === true;
  } catch (err) {
    console.error("sendEmailClient error:", err);
    return false;
  }
}
