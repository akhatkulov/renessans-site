import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const NewsSection = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const newsItems = t("home.news.items", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section className="py-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold text-foreground">
            {t("home.news.title")}
          </h2>
        </div>
        <Button
          onClick={() => navigate("/news")}
          variant="outline"
          className="flex items-center gap-2"
        >
          {t("home.news.all")}
          <ArrowRight size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newsItems.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/newsDetails/${idx + 1}`)}
            className="cursor-pointer group"
          >
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-indigo-100 to-cyan-100"></div>
              <div className="p-6">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Read more →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

NewsSection.displayName = "NewsSection";
