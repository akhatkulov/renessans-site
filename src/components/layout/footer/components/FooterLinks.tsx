import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterLinks = () => {
  const { t } = useTranslation();

  const links = [
    { name: t("footer.quickLinks.aboutUs"), href: "/about" },
    {
      name: t("footer.quickLinks.competitionsAndEvents"),
      href: "/competitions",
    },
    { name: t("footer.quickLinks.opportunities"), href: "/opportunities" },
    { name: t("footer.quickLinks.faq"), href: "/faq" },
    { name: t("footer.quickLinks.news"), href: "/news" },
    { name: t("footer.quickLinks.contacts"), href: "/contact" },
  ];

  return (
    <div>
      <h3 className="footer-title text-base mb-4">
        {t("footer.quickLinks.title")}
      </h3>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="footer-text hover:text-primary transition-colors font-medium text-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(FooterLinks);
