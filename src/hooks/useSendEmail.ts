import { SEND_EMAIL } from "@/lib/graphql/mutations/emailMutations";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export const useSendEmail = () => {
  const [sendEmailMutation, { data, loading: mutationLoading, error }] =
    useMutation(SEND_EMAIL);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);

  // Optional delay to show loading skeleton/UI
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = async (name: string, email: string, message: string) => {
    try {
      const response = await sendEmailMutation({
        variables: { name, email, message },
      });
      setSuccess(response.data.sendEmail);
      return response.data.sendEmail;
    } catch (err) {
      console.error("Send email error:", err);
      setSuccess(false);
      return false;
    }
  };

  return {
    sendEmail,
    success,
    loading: loading || mutationLoading,
    error,
    data,
  };
};
