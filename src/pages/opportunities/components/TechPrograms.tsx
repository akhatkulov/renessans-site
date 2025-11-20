import { memo } from "react";
import { useTranslation } from "react-i18next";
import techImage from "@/assets/images/techPrograms.jpg";

const TechPrograms = () => {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div>
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Programs
          </span>
          <h3 className="text-4xl font-bold text-foreground mt-2">
            {t("opportunities.techPrograms.title")}
          </h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          {t("opportunities.techPrograms.description")}
        </p>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={techImage || "/placeholder.svg"}
          alt={t("opportunities.techPrograms.title")}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default memo(TechPrograms);
