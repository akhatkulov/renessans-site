import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: "en", label: "English", countryCode: "GB" },
    { value: "ru", label: "Русский", countryCode: "RU" },
    { value: "uz", label: "O'zbek", countryCode: "UZ" },
  ];

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-slate-600 border-slate-200"
        >
          <ReactCountryFlag
            countryCode={
              languages.find((l) => l.value === i18n.language)?.countryCode ||
              "GB"
            }
            svg
            style={{ width: 18, height: 18 }}
          />
          <span className="font-medium">{i18n.language.toUpperCase()}</span>
          <ChevronDown size={16} className="opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-slate-200">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => changeLang(lang.value)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{ width: 18, height: 18 }}
              />
              {lang.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
