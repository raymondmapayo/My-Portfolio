import { sendEmailClient } from "@/lib/sendEmailClient";
import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Modal, message as antdMessage } from "antd";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

interface ModalMessageProps {
  open: boolean;
  onClose: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current || !open) return;
    const typed = new Typed(typedRef.current, {
      strings: ["Send a Message"],
      typeSpeed: 50,
      backSpeed: 0,
      showCursor: true,
      cursorChar: "_",
      loop: false,
    });
    return () => typed.destroy();
  }, [open]);

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      antdMessage.warning("Please fill up all fields before sending.");
      console.warn("Cannot send: some fields are empty.");
      return;
    }

    setLoading(true);
    const result = await sendEmailClient(name, email, message);
    setLoading(false);

    if (result) {
      antdMessage.success("Email sent successfully!");
      console.log("Email sent successfully!");
    } else {
      antdMessage.error("Failed to send email.");
      console.error("Failed to send email.");
    }

    onClose();
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-xl font-semibold">
          <SendOutlined className="transform -rotate-45 text-lg" />
          <span ref={typedRef}></span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <div className="flex flex-col gap-6">
        <div>
          <label className="flex items-center gap-1 text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="text-red-500 text-xl">*</span>
            Name
          </label>
          <Input
            placeholder="Your Name"
            className="h-12 text-lg placeholder:text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="text-red-500 text-xl">*</span>
            Email
          </label>
          <Input
            placeholder="Your Email"
            type="email"
            className="h-12 text-lg placeholder:text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="text-red-500 text-xl">*</span>
            Message
          </label>
          <Input.TextArea
            placeholder="Your Message"
            rows={4}
            className="text-lg placeholder:text-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <small className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
            Feel free to send a message — I’ll respond directly to your email.
          </small>
        </div>

        <Button
          type="primary"
          icon={<SendOutlined className="transform -rotate-45" />}
          onClick={handleSend}
          loading={loading}
          className="flex items-center justify-center py-5 px-5 text-base font-semibold"
        >
          Send
        </Button>
      </div>
    </Modal>
  );
};

export default ModalMessage;
