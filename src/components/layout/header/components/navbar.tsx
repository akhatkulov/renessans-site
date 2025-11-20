"use client";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  isMobile?: boolean;
  onMenuClose?: () => void;
}

export const Navbar = ({ isMobile = false, onMenuClose }: NavbarProps) => {
  const { t } = useTranslation();

  const navItems = [
    { key: "home", path: "/" },
    { key: "aboutUs", path: "/about" },
    { key: "opportunities", path: "/opportunities" },
    { key: "news", path: "/news" },
    { key: "faq", path: "/faq" },
    { key: "contacts", path: "/contact" },
  ];

  const handleNavClick = () => {
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  return (
    <nav
      className={`${
        isMobile
          ? "flex flex-col gap-0 p-4"
          : "flex items-center justify-center gap-1"
      }`}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={handleNavClick}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium transition-all text-sm ${
              isMobile ? "w-full block" : ""
            } ${isActive ? "nav-active" : "text-slate-600 hover:nav-hover"}`
          }
        >
          {t(`header.navbar.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  );
};
