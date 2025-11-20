import { memo } from "react";
import PageTitle from "@/components/common/PageTitle";
import { useTranslation } from "react-i18next";
import { NewsList } from "./components/NewsList";

const AllNewsPage = () => {
  const { t } = useTranslation();

  return (
    <PageTitle titleKey="home.news.title">
      <div className="py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            {t("home.news.title")}
          </h2>
          <p className="text-slate-600">
            Stay updated with our latest news and announcements
          </p>
        </div>
        <NewsList />
      </div>
    </PageTitle>
  );
};

export default memo(AllNewsPage);
