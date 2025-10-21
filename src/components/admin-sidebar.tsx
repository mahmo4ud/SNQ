"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useT } from "@/app/i18n/client";
import { 
  DocumentTextIcon, 
  NewspaperIcon, 
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import LanguageButton from "./Language-button";
import Logo from "@/../public/logo-dark.png";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { t, i18n } = useT("adminSidebar");
  const pathname = usePathname();
  const router = useRouter();

  // Extract current language from pathname
  const currentLang = pathname.match(/^\/(en|ar)/)?.[1] || i18n.language || "ar";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push(`/${currentLang}/sqn-admin`);
  };

  const menuItems = [
    {
      name: t("articlesManagement"),
      href: `/${currentLang}/admin/articles`,
      icon: DocumentTextIcon,
      active: pathname.includes('/admin/articles')
    },
    {
      name: t("newsAndEvents"),
      href: `/${currentLang}/admin/news`,
      icon: NewspaperIcon,
      active: pathname.includes('/admin/news')
    }
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar - Always visible on large screens */}
      <aside 
        className={`
          fixed lg:static top-0 ${direction === 'rtl' ? 'right-0 w-64' : 'left-0 w-76'} h-screen bg-white 
          ${direction === 'rtl' ? 'border-s' : 'border-e'} border-gray-200 
          z-[70] transform transition-transform duration-300 ease-in-out 
          flex flex-col shadow-sm
          ${isOpen ? 'translate-x-0' : direction === 'rtl' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        dir={direction}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col">
          <div className="border-b p-4 border-gray-200 flex items-center justify-between lg:justify-center">
            <Image src={Logo} alt="Logo" width={180} className="object-contain" />
            {/* Close Button - Mobile Only */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-600 hover:text-primary transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center justify-between border-b p-4 border-gray-200" dir={direction}>
            <h2 className="text-lg font-bold text-primary">
              {t("headerTitle")}
            </h2>
            <LanguageButton backGroundColor="bg-white" textColor="text-lite-primary" activeColor="text-primary" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto" dir={direction}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                dir={direction}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
            dir={direction}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>{t("logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
