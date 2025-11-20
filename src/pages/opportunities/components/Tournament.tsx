import { memo } from "react";
import { useTranslation } from "react-i18next";
import tournamentImage from "@/assets/images/tournament.jpg";

const Tournament = () => {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div>
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Events
          </span>
          <h3 className="text-4xl font-bold text-foreground mt-2">
            {t("opportunities.tournament.title")}
          </h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          {t("opportunities.tournament.description")}
        </p>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg order-first md:order-last">
        <img
          src={tournamentImage || "/placeholder.svg"}
          alt={t("opportunities.tournament.title")}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default memo(Tournament);
