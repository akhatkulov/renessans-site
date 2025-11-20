import { memo } from "react";
import FooterLogo from "./components/FooterLogo";
import FooterLinks from "./components/FooterLinks";
import FooterContact from "./components/FooterContact";
import FooterBottom from "./components/FooterBottom";

const Footer = () => {
  return (
    <footer className="footer-premium pt-16 pb-8">
      <div className="container grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <FooterLogo />
        </div>

        <div className="md:col-span-1">
          <FooterLinks />
        </div>

        <div className="md:col-span-2">
          <FooterContact />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default memo(Footer);
