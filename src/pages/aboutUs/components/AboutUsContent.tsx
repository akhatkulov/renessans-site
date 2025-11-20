import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

const AboutUsContent = () => {
  const { t } = useTranslation();

  const items = [
    t("aboutUs.content.physicalEducation"),
    t("aboutUs.content.intellectualDevelopment"),
    t("aboutUs.content.youthStartups"),
    t("aboutUs.content.internationalCompetitions"),
    t("aboutUs.content.disabilitySupport"),
    t("aboutUs.content.digitalMechanisms"),
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-primary font-semibold text-sm tracking-wider uppercase">
          About Us
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
          {t("aboutUs.content.title")}
        </h2>
      </div>

      <p className="text-slate-600 leading-relaxed text-lg">
        {t("aboutUs.content.description")}
      </p>
      <p className="text-slate-600 leading-relaxed text-lg">
        {t("aboutUs.content.more")}
      </p>

      <div className="space-y-3 pt-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(AboutUsContent);
