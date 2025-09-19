"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/notification";
import ElectricBorder from "@/components/ElectricBorder";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.trim() === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/ashwinsm10@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _captcha: false,
          }),
        }
      );

      if (!response.ok) throw new Error("Form submission failed");

      setNotificationType("success");
      setNotificationMessage(
        "Thanks for reaching out! I'll get back to you soon."
      );
      setNotificationOpen(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Submission error:", err);
      setNotificationType("error");
      setNotificationMessage("Something went wrong. Please try again later.");
      setNotificationOpen(true);
    }
  };

  return (
    <>
      <Notification
        type={notificationType}
        message={notificationMessage}
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />

      <div
        className="md:w-1/2"
      >
        <ElectricBorder>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Shoot me a message!</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="john@doe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setIsEmailTouched(true)}
                />
                {isEmailTouched && email && !isValidEmail(email) && (
                  <p className="text-sm text-red-500">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                  placeholder="I'm here to help 😎"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <Button
                className="w-full cursor-pointer"
                type="submit"
                disabled={!message.trim() || (!!email && !isValidEmail(email))}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        </ElectricBorder>
      </div>
    </>
  );
};

export default ContactForm;
