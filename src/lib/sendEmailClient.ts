const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8081/send-email";

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

    if (!res.ok) {
      console.error("Server returned non-OK:", res.status, await res.text());
      return false;
    }

    const data = await res.json().catch(() => null);
    return data?.success === true;
  } catch (err) {
    console.error("sendEmailClient error:", err);
    return false;
  }
}
