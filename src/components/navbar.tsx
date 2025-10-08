"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.png"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/outline";
import SideMenu from "./side-menu";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const pathname = usePathname();

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <nav className="bg-primary h-[70px] sticky top-0 z-50">
        <div className="flex justify-between items-center w-11/12 h-full mx-auto" dir="rtl">
          <div>
            <Image src={Logo} alt="Logo" width={200} />
          </div>
          
          {/* Hamburger Menu Button - Visible on small screens */}
          <button
            onClick={() => setOpenSideMenu(true)}
            className="lg:hidden text-nav-text hover:text-white transition-colors"
          >
            <Bars3Icon className="w-8 h-8" />
          </button>

          {/* Desktop Menu - Hidden on small screens */}
          <div className="hidden lg:flex gap-5 xl:gap-8 text-sm xl:text-base text-nav-text font-medium">
            <Link href="/" className={`hover:text-white transition-colors ${pathname === '/' && 'text-white'}`}>الرئيسية</Link>
            {/* من نحن - قائمة منسدلة */}
            <div 
              className="relative"
              onClick={() => toggleDropdown('about')}
            >
              <button className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${pathname.startsWith('/about-us') && 'text-white'}`}>
                من نحن
                <ChevronDownIcon className={`w-4 h-4 ${openDropdown === 'about' && 'rotate-180'} transition-all duration-200`} />
              </button>
              {openDropdown === 'about' && (
                <div className="absolute top-full right-0 mt-2 bg-primary/95 border border-nav-text rounded-md shadow-lg py-2 min-w-[120px] z-50">
                  <Link href="/about-us/our-message" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/about-us/our-message' && 'text-white'}`}>
                    رسالتنا
                  </Link>
                  <Link href="/about-us/our-vision" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/about-us/our-vision' && 'text-white'}`}>
                    رؤيتنا
                  </Link>
                  <Link href="/about-us/our-values" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/about-us/our-values' && 'text-white'}`}>
                    قيمتنا
                  </Link>
                </div>
              )}
            </div>
            {/* ما يميزنا - قائمة منسدلة */}
            <div 
              className="relative"
              onClick={() => toggleDropdown('advantages')}
            >
              <button className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${pathname.startsWith('/advantages') && 'text-white'}`}>
                ما يميزنا
                <ChevronDownIcon className={`w-4 h-4 ${openDropdown === 'advantages' && 'rotate-180'} transition-all duration-200`} />
              </button>
              {openDropdown === 'advantages' && (
                <div className="absolute top-full right-0 mt-2 bg-primary border border-nav-text rounded-md shadow-lg py-2 min-w-[120px] z-50">
                  <Link href="/advantages/professional-approach" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/advantages/professional-approach' && 'text-white'}`}>
                    منهجنا المهني
                  </Link>
                  <Link href="/advantages/accreditations" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/advantages/accreditations' && 'text-white'}`}>
                    الاعتمادات
                  </Link>
                </div>
              )}
            </div>
            <Link href="/services" className={`hover:text-white transition-colors ${pathname === '/services' && 'text-white'}`}>خدماتنا</Link>
            <Link href="/legal-consultations" className={`hover:text-white transition-colors ${pathname === '/legal-consultations' && 'text-white'}`}>الاستشارات القانونية</Link>
            {/* الأخبار والفعاليات - قائمة منسدلة */}
            <div 
              className="relative"
              onClick={() => toggleDropdown('news')}
            >
              <button className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${pathname.startsWith('/articles-and-news') && 'text-white'}`}>
                الأخبار والمقالات
                <ChevronDownIcon className={`w-4 h-4 ${openDropdown === 'news' && 'rotate-180'} transition-all duration-200`} />
              </button>
              {openDropdown === 'news' && (
                <div className="absolute top-full right-0 mt-2 bg-primary border border-nav-text rounded-md shadow-lg py-2 min-w-[150px] z-50">
                  <Link href="/articles-and-news/news" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/articles-and-news/news' && 'text-white'}`}>
                    الأخبار و الفعاليات
                  </Link>
                  <Link href="/articles-and-news/events" className={`block px-4 py-2 hover:bg-nav-text hover:text-primary transition-colors ${pathname === '/articles-and-news/events' && 'text-white'}`}>
                    المقالات
                  </Link>
                </div>
              )}
            </div>
            <Link href="/join-us" className={`hover:text-white transition-colors ${pathname === '/join-us' && 'text-white'}`}>انضم إلى فريقنا</Link>
            <Link href="/contact-us" className={`hover:text-white transition-colors ${pathname === '/contact-us' && 'text-white'}`}>اتصل بنا</Link>
          </div>
        </div>
      </nav>

      {/* Side Menu Component */}
      <SideMenu isOpen={openSideMenu} onClose={() => setOpenSideMenu(false)} />
    </>
  )
}