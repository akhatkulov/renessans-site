import { memo } from "react";

const FooterLogo = () => {
  return (
    <div>
      <h2 className="footer-title text-2xl font-bold mb-3">Renessans</h2>
      <p className="footer-text text-sm leading-relaxed max-w-xs">
        Biz bilan o‘sish yo‘liga qadam qo‘ying — ishonch, sifat va yangilik bir
        joyda.
      </p>
    </div>
  );
};

export default memo(FooterLogo);
