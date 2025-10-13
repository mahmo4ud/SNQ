"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.png"
import MobileLogo from "@/../public/mobile-logo.png"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/outline";
import SideMenu from "./side-menu";
import LanguageButton from "./Language-button";
import { useT } from "@/app/i18n/client";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function Navbar() {
  const { t, i18n } = useT("navbar");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const pathname = usePathname();
  
  // Extract current language from pathname
  const currentLang = pathname.match(/^\/(en|ar)/)?.[1] || i18n.language || "ar";

  const handleMouseEnter = (dropdown: string) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="flex items-center bg-primary h-[70px] sticky top-0 z-50" dir="rtl">
        <div className="flex items-center gap-3 xl:gap-6 w-11/12 h-full mx-auto">
          <div className="flex justify-between items-center h-full w-full gap-4">
            <div>
              {/* Desktop Logo - Hidden on small screens */}
              <Image src={Logo} alt="Logo" width={200} className="hidden xl:block" />
              {/* Mobile Logo - Visible on small screens */}
              <Image src={MobileLogo} alt="Logo" width={42} className="block xl:hidden" />
            </div>
            
            {/* Hamburger Menu Button - Visible on small screens */}
            <button
              onClick={() => setOpenSideMenu(true)}
              className="lg:hidden text-lite-primary hover:text-white transition-colors"
            >
              <Bars3Icon className="w-8 h-8" />
            </button>

            {/* Desktop Menu - Hidden on small screens */}
            <div className="hidden lg:flex justify-center items-center gap-3 xl:gap-4 text-sm xl:text-base text-lite-primary font-medium leading-4">
              <Link href={`/${currentLang}`} className={`hover:text-white transition-colors ${pathname === `/${currentLang}` && 'text-white'}`}>{t("home")}</Link>
              {/* من نحن - قائمة منسدلة */}
              <Popover open={openDropdown === 'about'} onOpenChange={(open) => !open && handleMouseLeave()}>
                <div onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
                  <PopoverTrigger asChild>
                    <button className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${pathname.startsWith('/about-us') && 'text-white'}`}>
                      <span className="w-fit text-nowrap">{t("aboutUs.title")}</span>
                    <ChevronDownIcon className={`w-4 h-4 ${openDropdown === 'about' && 'rotate-180'} transition-all duration-200`} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="bg-primary border-none rounded-xl font-medium shadow-lg py-2 px-0 w-fit text-nowrap text-center mt-6">
                    <div className="flex flex-col">
                      <Link href={`/${currentLang}/our-message`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/our-message` && 'text-white'}`}>
                        {t("aboutUs.ourMessage")}
                      </Link>
                      <Link href={`/${currentLang}/our-vision`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/our-vision` && 'text-white'}`}>
                        {t("aboutUs.ourVision")}
                      </Link>
                      <Link href={`/${currentLang}/our-values`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/our-values` && 'text-white'}`}>
                        {t("aboutUs.ourValues")}
                      </Link>
                    </div>
                  </PopoverContent>
                </div>
              </Popover >
              {/* ما يميزنا - قائمة منسدلة */}
              <Popover open={openDropdown === 'our-advantages'} onOpenChange={(open) => !open && handleMouseLeave()}>
                <div onMouseEnter={() => handleMouseEnter('our-advantages')} onMouseLeave={handleMouseLeave}>
                  <PopoverTrigger asChild>
                    <button className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${pathname.startsWith('/our-advantages') && 'text-white'}`}>
                      <span className="w-fit text-nowrap">{t("advantages.title")}</span>
                    <ChevronDownIcon className={`w-4 h-4 ${openDropdown === 'our-advantages' && 'rotate-180'} transition-all duration-200`} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="bg-primary border-none rounded-xl font-medium shadow-lg py-2 px-0 w-fit text-nowrap text-center mt-6">
                    <div className="flex flex-col">
                      <Link href={`/${currentLang}/our-professional-approach`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/our-professional-approach` && 'text-white'}`}>
                        {t("advantages.professionalApproach")}
                      </Link>
                      <Link href={`/${currentLang}/accreditations`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/accreditations` && 'text-white'}`}>
                        {t("advantages.accreditations")}
                      </Link>
                    </div>
                  </PopoverContent>
                </div>
              </Popover>
              <Link href={`/${currentLang}/our-services`} className={`hover:text-white transition-colors w-fit text-nowrap ${pathname === `/${currentLang}/our-services` && 'text-white'}`}>{t("services")}</Link>
              <Link href={`/${currentLang}/legal-consultations`} className={`hover:text-white transition-colors w-fit text-nowrap ${pathname === `/${currentLang}/legal-consultations` && 'text-white'}`}>{t("legalConsultations")}</Link>
              {/* الأخبار والفعاليات - قائمة منسدلة */}
              <Popover open={openDropdown === 'news-and-articles'} onOpenChange={(open) => !open && handleMouseLeave()}>
                <div onMouseEnter={() => handleMouseEnter('news-and-articles')} onMouseLeave={handleMouseLeave}>
                  <PopoverTrigger asChild>
                    <button className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${pathname.startsWith('/news') || pathname.startsWith('/articles') && 'text-white'}`}>
                      <span className="w-fit text-nowrap">{t("news.title")}</span>
                    <ChevronDownIcon className={`w-4 h-4 ${openDropdown === 'news-and-articles' && 'rotate-180'} transition-all duration-200`} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="bg-primary border-none rounded-xl font-medium shadow-lg py-2 px-0 w-fit text-nowrap text-center mt-6">
                    <div className="flex flex-col">
                      <Link href={`/${currentLang}/news`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/news` && 'text-white'}`}>
                        {t("news.newsAndEvents")}
                      </Link>
                      <Link href={`/${currentLang}/articles`} className={`block px-4 py-2 text-lite-primary hover:text-white transition-colors ${pathname === `/${currentLang}/articles` && 'text-white'}`}>
                        {t("news.articles")}
                      </Link>
                    </div>
                  </PopoverContent>
                </div>
              </Popover>
              <Link href={`/${currentLang}/join-us`} className={`hover:text-white transition-colors w-fit text-nowrap ${pathname === `/${currentLang}/join-us` && 'text-white'}`}>{t("joinUs")}</Link>
              <Link href={`/${currentLang}/contact-us`} className={`hover:text-white transition-colors w-fit text-nowrap ${pathname === `/${currentLang}/contact-us` && 'text-white'}`}>{t("contactUs")}</Link>
              <LanguageButton />
            </div>
          </div>
        </div>
      </nav>


      {/* Side Menu Component */}
      <SideMenu isOpen={openSideMenu} onClose={() => setOpenSideMenu(false)} />
    </>
  )
}