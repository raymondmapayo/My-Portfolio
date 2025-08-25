// src/lib/sendEmailClient.ts
export interface SendEmailPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendEmailClient(
  payload: SendEmailPayload
): Promise<boolean> {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST", // <-- MUST be POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // try parse JSON even on non-2xx so we can log useful info
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("sendEmailClient non-OK response:", res.status, data);
      return false;
    }

    // success when { success: true }
    return data?.success === true;
  } catch (err) {
    console.error("sendEmailClient error:", err);
    return false;
  }
}
