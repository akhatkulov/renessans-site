import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const BOT_TOKEN = "8366057730:AAHzbOGzdgy3y0A4MGbo0cbJBKJygwlMryM";
const CHAT_ID = "-1003197446662";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^(\+998|998)?[0-9]{9}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Email noto'g'ri formatda kiritilgan!");
      return;
    }

    if (!validatePhone(formData.phoneNumber)) {
      toast.error(
        "Telefon raqami noto'g'ri formatda! (+998901234567 ko'rinishida kiriting)"
      );
      return;
    }

    const text = `
📩 *Yangi xabar!*
👤 *Ism:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Telefon:* ${formData.phoneNumber}
💬 *Xabar:* ${formData.message}
    `;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
            parse_mode: "Markdown",
          }),
        }
      );

      const data = await res.json();
      if (!data.ok) throw new Error(data.description);

      toast.success("Xabar muvaffaqiyatli yuborildi ✅");
      setFormData({ name: "", email: "", phoneNumber: "", message: "" });
    } catch (err) {
      toast.error("Xabar yuborishda xatolik yuz berdi ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Name
        </label>
        <Input
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-slate-200"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Email
        </label>
        <Input
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-slate-200"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Phone Number
        </label>
        <Input
          name="phoneNumber"
          type="tel"
          placeholder="+998901234567"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="border-slate-200"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Message
        </label>
        <Textarea
          name="message"
          placeholder="Your message here..."
          value={formData.message}
          onChange={handleChange}
          required
          className="border-slate-200 resize-none"
          rows={5}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-indigo-700 text-white py-3"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};

export default memo(ContactForm);
