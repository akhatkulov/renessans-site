import { memo } from "react";
import ContactForm from "./components/ContactForm";

const Contact = () => {
  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Contact Us
          </h2>
          <p className="text-slate-600">
            Get in touch with us. We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
