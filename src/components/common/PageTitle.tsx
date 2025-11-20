import { useEffect,type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface PageTitleProps {
  titleKey: string; 
  children: ReactNode;
}

const PageTitle = ({ titleKey, children }: PageTitleProps) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t(titleKey);
  }, [titleKey, i18n.language, t]);

  return <>{children}</>;
};

export default PageTitle;
