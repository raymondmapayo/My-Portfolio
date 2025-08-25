// src/lib/sendEmailClient.ts
const API_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL ?? "http://localhost:8081/send-email")
  : (import.meta.env.VITE_API_URL ?? "/api/send-email");

/**
 * sendEmailClient - send a message to the serverless function
 * @param name - sender name
 * @param email - sender email
 * @param message - message body
 * @param testOnly - optional boolean; when true server will only run diagnostic and not send email
 * @returns boolean true on success, or diagnostic object if testOnly was used (returns object)
 */
export async function sendEmailClient(
  name: string,
  email: string,
  message: string,
  testOnly = false
): Promise<boolean | any> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, testOnly }),
    });

    if (!res.ok) {
      // Log and return false; if testOnly used the server will return OK (200)
      const txt = await res.text().catch(() => "");
      console.error("Server returned non-OK:", res.status, txt);
      return false;
    }

    const data = await res.json().catch(() => null);
    // If diagnostic mode was used, server returns { success: true, diagnostic: {...} }
    if (testOnly) return data;

    return data?.success === true;
  } catch (err) {
    console.error("sendEmailClient error:", err);
    return false;
  }
}
