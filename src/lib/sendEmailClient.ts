// src/lib/sendEmailClient.ts
export interface SendEmailPayload {
  name: string;
  email: string;
  message: string;
}

const BASE = import.meta.env.VITE_API_URL ?? "";

export async function sendEmailClient(
  payload: SendEmailPayload,
  timeoutMs = 10000,
): Promise<{ success: boolean; message?: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${BASE}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("sendEmailClient non-OK response:", res.status, data);
      return {
        success: false,
        message: data?.message || "Unknown server error",
      };
    }

    return { success: data?.success === true, message: data?.message };
  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.error("sendEmailClient: request timed out");
      return { success: false, message: "Request timed out" };
    } else {
      console.error("sendEmailClient error:", err);
      return { success: false, message: String(err) };
    }
  } finally {
    clearTimeout(timeout);
  }
}
