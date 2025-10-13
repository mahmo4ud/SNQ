import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import { getT } from "../i18n";

export default async function Layout({ children }: { children: ReactNode }){
  const { i18n } = await getT();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <Navbar />
      <main dir={direction}>
        {children}
      </main>
      <Footer />
    </>
  )
}