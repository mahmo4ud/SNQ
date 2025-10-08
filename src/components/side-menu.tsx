"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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
        className={`fixed top-0 right-0 h-full w-[280px] bg-primary text-nav-text z-[70] transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-nav-text/30">
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
            href="/"
            className={`hover:text-white transition-colors ${pathname === '/' && 'text-white'}`}
            onClick={onClose}
          >
            الرئيسية
          </Link>

          {/* من نحن - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('about')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith('/about-us') && 'text-white'
              }`}
            >
              من نحن
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'about' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'about' && (
              <div className="pr-4 mt-2 space-y-2">
                <Link
                  href="/about-us/our-message"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/about-us/our-message' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  رسالتنا
                </Link>
                <Link
                  href="/about-us/our-vision"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/about-us/our-vision' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  رؤيتنا
                </Link>
                <Link
                  href="/about-us/our-values"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/about-us/our-values' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  قيمتنا
                </Link>
              </div>
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
              ما يميزنا
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'advantages' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'advantages' && (
              <div className="pr-4 mt-2 space-y-2">
                <Link
                  href="/advantages/professional-approach"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/advantages/professional-approach' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  منهجنا المهني
                </Link>
                <Link
                  href="/advantages/accreditations"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/advantages/accreditations' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  الاعتمادات
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/services"
            className={`hover:text-white transition-colors ${pathname === '/services' && 'text-white'}`}
            onClick={onClose}
          >
            خدماتنا
          </Link>

          <Link
            href="/legal-consultations"
            className={`hover:text-white transition-colors ${pathname === '/legal-consultations' && 'text-white'}`}
            onClick={onClose}
          >
            الاستشارات القانونية
          </Link>

          {/* الأخبار والمقالات - قائمة منسدلة */}
          <div>
            <button
              onClick={() => toggleDropdown('news')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full ${
                pathname.startsWith('/articles-and-news') && 'text-white'
              }`}
            >
              الأخبار والمقالات
              <ChevronDownIcon
                className={`w-4 h-4 ${openDropdown === 'news' && 'rotate-180'} transition-all duration-200`}
              />
            </button>
            {openDropdown === 'news' && (
              <div className="pr-4 mt-2 space-y-2">
                <Link
                  href="/articles-and-news/news"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/articles-and-news/news' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  الأخبار و الفعاليات
                </Link>
                <Link
                  href="/articles-and-news/events"
                  className={`block py-1 hover:text-white transition-colors ${
                    pathname === '/articles-and-news/events' && 'text-white'
                  }`}
                  onClick={onClose}
                >
                  المقالات
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/join-us"
            className={`hover:text-white transition-colors ${pathname === '/join-us' && 'text-white'}`}
            onClick={onClose}
          >
            انضم إلى فريقنا
          </Link>

          <Link
            href="/contact-us"
            className={`hover:text-white transition-colors ${pathname === '/contact-us' && 'text-white'}`}
            onClick={onClose}
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </>
  );
}
