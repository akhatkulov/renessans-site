import { memo } from "react";
import { useTranslation } from "react-i18next";

export const MapSection = memo(() => {
  const latitude = 41.614906;
  const longitude = 70.047144;
  const zoom = 16;
  const { t } = useTranslation();

  const mapSrc = `https://yandex.com/map-widget/v1/?ll=${longitude}%2C${latitude}&z=${zoom}&pt=${longitude},${latitude},pm2rdm`;

  return (
    <section className="py-20">
      <div>
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground">
            {t("home.map.title", "Bizning manzil")}
          </h2>
          <p className="text-slate-600 mt-2">Visit us at our location</p>
        </div>

        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            title="Renessans joylashuvi"
            src={mapSrc}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
});

MapSection.displayName = "MapSection";
