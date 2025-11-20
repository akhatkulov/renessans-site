import { Navbar } from "./components/navbar";
import { LanguageSelector } from "./components/LanguageSelector";
import logo from "@/assets/icons/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full header-premium sticky top-0 z-50">
      <div className="container flex flex-col md:flex-row items-center justify-between py-4 gap-4 md:gap-0">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="Logo" width={100} className="h-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Navbar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 nav-hover rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mobile-menu-premium">
          <Navbar isMobile onMenuClose={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
