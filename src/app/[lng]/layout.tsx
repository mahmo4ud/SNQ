import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import { getT } from "../i18n";
import { headers } from "next/headers";
import FloatingContacts from "@/components/floating-contacts";

export default async function Layout({ children }: { children: ReactNode }){
  const { i18n } = await getT();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.includes("/snq-admin") || pathname.includes("/admin/");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main dir={direction}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingContacts />}
    </>
  )
}