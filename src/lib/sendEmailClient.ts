const API_URL = "/api/send-email";

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
      const errText = await res.text().catch(() => "");
      console.error("sendEmailClient non-OK response:", res.status, errText);
      return false;
    }

    const data = await res.json().catch(() => null);
    return data?.success === true;
  } catch (err) {
    console.error("sendEmailClient error:", err);
    return false;
  }
}
