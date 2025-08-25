const API_URL = import.meta.env.DEV
  ? "http://localhost:8081/send-email" // local dev
  : "https://my-express-server.onrender.com/send-email"; // deployed backend

export async function sendEmailClient(
  name: string,
  email: string,
  message: string
) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return data?.success === true;
  } catch (err) {
    console.error("sendEmailClient error:", err);
    return false;
  }
}
