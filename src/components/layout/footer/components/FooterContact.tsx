import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
} from "lucide-react";

const FooterContact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="footer-title text-base mb-4">
        {t("footer.contact.title")}
      </h3>

      <ul className="space-y-3 footer-text text-sm mb-6">
        <li className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="leading-relaxed">{t("footer.contact.address")}</span>
        </li>

        <li className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-primary shrink-0" />
          <Link
            to="tel:+998559005490"
            target="_blank"
            className="hover:text-primary transition-colors font-medium"
          >
            +998 55 900-54-90
          </Link>
        </li>

        <li className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary shrink-0" />
          <Link
            to="mailto:support@life-style.uz"
            target="_blank"
            className="hover:text-primary transition-colors font-medium"
          >
            support@life-style.uz
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <Link
          to="https://t.me/renessans_oromgoh"
          target="_blank"
          rel="noreferrer"
          className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-all"
        >
          <Send className="w-5 h-5" />
        </Link>
        <Link
          to="https://www.instagram.com/renessans.oromgoh/"
          target="_blank"
          rel="noreferrer"
          className="p-2 hover:bg-pink-100 text-pink-600 rounded-lg transition-all"
        >
          <Instagram className="w-5 h-5" />
        </Link>
        <Link
          to="https://www.facebook.com/people/Renessansoromgoh/"
          target="_blank"
          rel="noreferrer"
          className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-all"
        >
          <Facebook className="w-5 h-5" />
        </Link>
        <Link
          to="https://www.youtube.com/@renessans.oromgoh-m8u"
          target="_blank"
          rel="noreferrer"
          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-all"
        >
          <Youtube className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default memo(FooterContact);
