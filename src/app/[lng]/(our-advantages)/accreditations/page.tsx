"use client"

import Image from "next/image"
import { useT } from "@/app/i18n/client"
import HeroTitle from "../../../../components/hero-title"
import logoOne from "../../../../../public/accreditations/logo-one.svg"
import logoTwo from "../../../../../public/accreditations/logo-two.png"
import logoThree from "../../../../../public/accreditations/logo-three.svg"

export default function Page() {
  const { t } = useT("advantages")
  return (
    <section className="w-full min-h-screen">
      {/* Hero Section with Full Width Image */}
      <HeroTitle>{t("accreditations.title")}</HeroTitle>
      {/* Content Section */}
      <div className="w-11/12 mx-auto flex items-center justify-center py-24 md:py-48">
        <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-15">
          <div className="flex items-center justify-center w-32 h-32 mx-10 md:w-40 md:h-40">
            <Image 
              src={logoThree} 
              alt="Saudi Bar Association" 
              width={160}
              height={160}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex items-center justify-center w-32 h-32 mx-10 md:w-40 md:h-40">
            <Image 
              src={logoTwo} 
              alt="SASL" 
              width={160}
              height={160}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex items-center justify-center w-32 h-32 mx-10 md:w-40 md:h-40">
            <Image 
              src={logoOne} 
              alt="Ministry of Justice" 
              width={160}
              height={160}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}