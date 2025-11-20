import { useTranslation } from "react-i18next";
import aboutImg from "@/assets/images/homeAbout.jpg";
import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group overflow-hidden rounded-2xl">
          <img
            src={aboutImg || "/placeholder.svg"}
            alt="About us"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
              {t("home.about.title")}
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">
            {t("home.about.description")}
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            {t("home.about.more")}
          </p>
          <Button className="bg-primary text-white hover:bg-indigo-700">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
