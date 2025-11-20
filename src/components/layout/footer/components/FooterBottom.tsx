import { memo } from "react";
import { useTranslation } from "react-i18next";

const FooterBottom = () => {
  const { t } = useTranslation();

  return (
    <div className="border-t border-border mt-12 py-6 text-center footer-text text-sm">
      © {new Date().getFullYear()} {t("footer.privacy.title")}
    </div>
  );
};

export default memo(FooterBottom);
