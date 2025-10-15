"use client"

import Image from "next/image"
import mobileLogo from "../../../../../public/mobile-logo.png"
import { useT } from "@/app/i18n/client"
import HeroTitle from "../../../../components/hero-title"

export default function Page() {
  const { t } = useT("about-us")
  return (
    <section className="w-full min-h-screen">
      {/* Hero Section with Full Width Image */}
      <HeroTitle>{t("ourMessage.title")}</HeroTitle>
      {/* Content Section */}
      <div className="w-11/12 mx-auto flex items-center justify-center py-24 md:py-48">
        <div className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-0">
          <div className="w-20 md:min-w-30 md:max-w-30">
            <Image src={mobileLogo} alt="mobileLogo" className="w-full h-full object-cover"/>
          </div>
          <p className="text-paragraph text-lg md:text-[1.3rem] leading-relaxed">{t("ourMessage.content")}</p>
        </div>
      </div>
    </section>
  )
}