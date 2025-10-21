"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import MobileLogo from "@/../public/mobile-logo.png";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      const currentLang = pathname.match(/^\/(en|ar)/)?.[1] || "ar";
      router.push(`/${currentLang}/sqn-admin`);
    }
  }, [router, pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[70px] bg-primary flex items-center justify-between px-4 z-50" dir="rtl">
        <button
          onClick={() => setOpenSideMenu(true)}
          className="text-lite-primary hover:text-white transition-colors"
        >
          <Bars3Icon className="w-8 h-8" />
        </button>
        <Image src={MobileLogo} alt="Logo" width={42} />
      </div>

      {/* Sidebar */}
      <AdminSidebar isOpen={openSideMenu} onClose={() => setOpenSideMenu(false)} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:mt-0 mt-[70px]">
        {children}
      </main>
    </div>
  );
}
