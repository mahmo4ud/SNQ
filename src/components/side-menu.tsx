"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LanguageButton from "./Language-button";
import { useT } from "@/app/i18n/client";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { t, i18n } = useT("navbar");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Extract current language from pathname
  const currentLang = pathname.match(/^\/(en|ar)/)?.[1] || i18n.language || "ar";

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-primary text-lite-primary z-[70] transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-lite-primary/30">
          <Image src={Logo} alt="Logo" width={150} />
          <button
            onClick={onClose}
            className="text-nav-text hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-4 space-y-4 font-medium">
          <Link
            href={`/${currentLang}`}
            className={`hover:text-white transition-colors ${pathname === `/${currentLang}` && 'text-white'}`}
            onClick={onClose}
          >
            {t("home")}
          </Link>

          {/* من نحن - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('about')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith('/about-us') && 'text-white'
              }`}
            >
              {t("aboutUs.title")}
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'about' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'about' && (
              <ul className="pr-4 mt-2 space-y-2">
                <li>
                  <Link
                    href={`/${currentLang}/our-message`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/our-message` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("aboutUs.ourMessage")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/our-vision`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/our-vision` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("aboutUs.ourVision")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/our-values`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/our-values` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("aboutUs.ourValues")}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* ما يميزنا - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('advantages')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith('/advantages') && 'text-white'
              }`}
            >
              {t("advantages.title")}
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'advantages' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'advantages' && (
              <ul className="pr-4 mt-2 space-y-2">
                <li>
                  <Link
                    href={`/${currentLang}/our-professional-approach`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/our-professional-approach` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("advantages.professionalApproach")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/accreditations`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/accreditations` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("advantages.accreditations")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/#commitment-to-clients`}
                    className={`block py-1 hover:text-white transition-colors`}
                    onClick={onClose}
                  >
                    {t("advantages.commitmentToClients")}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link
            href={`/${currentLang}/services`}
            className={`hover:text-white transition-colors ${pathname === `/${currentLang}/services` && 'text-white'}`}
            onClick={onClose}
          >
            {t("services")}
          </Link>

          {/* الإستشارات القانونية - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('legal-consultations')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith('/legal-consultations') && 'text-white'
              }`}
            >
              {t("legalConsultations.title")}
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'legal-consultations' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'legal-consultations' && (
              <ul className="pr-4 mt-2 space-y-2">
                <li>
                  <Link
                    href={`/${currentLang}/legal-consultations`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/legal-consultations` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("legalConsultations.startConsultation")}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* الأخبار والمقالات - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('news')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith('/articles-and-news') && 'text-white'
              }`}
            >
              {t("news.title")}
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'news' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'news' && (
              <ul className="pr-4 mt-2 space-y-2">
                <li>
                  <Link
                    href={`/${currentLang}/news`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/news` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("news.newsAndEvents")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/articles`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/articles` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("news.articles")}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* انضم إلى فريقنا - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('join-us')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith(`/${currentLang}/join-us`) && 'text-white'
              }`}
            >
              {t("joinUs.title")}
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'join-us' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'join-us' && (
              <ul className="pr-4 mt-2 space-y-2">
                <li>
                  <Link
                    href={`/${currentLang}/join-us`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/join-us` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("joinUs.training")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLang}/join-us`}
                    className={`block py-1 hover:text-white transition-colors ${
                      pathname === `/${currentLang}/join-us` && 'text-white'
                    }`}
                    onClick={onClose}
                  >
                    {t("joinUs.employment")}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link
            href={`/${currentLang}/contact-us`}
            className={`hover:text-white transition-colors ${pathname === `/${currentLang}/contact-us` && 'text-white'}`}
            onClick={onClose}
          >
            {t("contactUs")}
          </Link>
          <LanguageButton />
        </div>
      </div>
    </>
  );
}
