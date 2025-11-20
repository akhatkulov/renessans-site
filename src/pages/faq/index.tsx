import { memo } from "react";
import { useTranslation } from "react-i18next";
import FaqAccordion from "./components/FaqAccordion";

const Faq = () => {
  const { t } = useTranslation();

  // translation faylida faq.items array bo'lishi kerak
  const items = t("faq.items", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  const accordionItems = items.map((item) => ({
    title: item.question,
    content: item.answer,
  }));

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            {t("faq.title")}
          </h2>
          <p className="text-slate-600">
            Find answers to commonly asked questions
          </p>
        </div>
        <FaqAccordion items={accordionItems} />
      </div>
    </section>
  );
};

export default memo(Faq);
