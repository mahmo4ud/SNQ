"use client";
import { useT } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LanguageButton() {
  const { i18n } = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>("");

  useEffect(() => {
    // Extract language from pathname
    const langFromPath = pathname.match(/^\/(en|ar)/)?.[1] as "ar" | "en";
    const activeLang = langFromPath || i18n.resolvedLanguage || "ar";
    setCurrentLang(activeLang as "ar" | "en");
  }, [pathname, i18n.resolvedLanguage]);

  const handleLanguageSwitch = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";

    // change i18n language
    i18n.changeLanguage(newLang);

    // build new path
    const pathWithoutLang = pathname.replace(/^\/(en|ar)(\/|$)/, "/");
    const newPath = `/${newLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;

    // push to new route
    router.push(newPath);

    // update state
    setCurrentLang(newLang);
  };

  return (
    <button
      onClick={handleLanguageSwitch}
      className="w-fit font-medium bg-primary text-lite-primary text-sm 2xl:text-base flex gap-2 rounded-md px-2 xl:px-4 py-1 xl:py-2 cursor-pointer hover:shadow-inner/50 transition-all duration-300"
      aria-label="Switch Language"
    >
      <span className={`transition-colors duration-300 ${currentLang === "en" ? "text-white" : ""}`}>
        EN
      </span>
      <span>
        |
      </span> 
      <span className={`transition-colors duration-300 ${currentLang === "ar" ? "text-white" : ""}`}>
        عربى
      </span>
    </button>
  );
}
