"use client"

import Image from "next/image"
import HeroCarousel from "./hero-carousel"
import ServicesSection from "./services-section"
import ClosingBracket from "@/components/closing-bracket"
import OpeningBracket from "@/components/opening-bracket"
import { useT } from "@/app/i18n/client"

// Partner Logos
import MyTrustLogo from "@/../public/partners/my-trust.png"
import GulfITLogo from "@/../public/partners/gulf-it.png"
import GreenCircleLogo from "@/../public/partners/green-circle.png"
import HatnLogo from "@/../public/partners/hatn.png"
import AntCeilingLogo from "@/../public/partners/ant-ceiling.png"

// Accreditation Logos
import AccreditationOne from "@/../public/accreditations/logo-one.svg"
import AccreditationTwo from "@/../public/accreditations/logo-two.png"
import AccreditationThree from "@/../public/accreditations/logo-three.svg"


export default function Page() {
  const { t } = useT("home")
  return (
    <>
      <HeroCarousel />
      <section className="w-full h-screen flex justify-center items-center py-16 md:py-24 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <OpeningBracket className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-3xl md:text-4xl lg:text-3xl font-bold text-primary">{t("mission.title")}</h1>
            <ClosingBracket className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <p className="w-full text-paragraph text-lg md:text-[1.5rem] leading-relaxed text-center">
            {t("mission.description")}
          </p>
        </article>
      </section>
      <ServicesSection />
      
      {/* Commitment Section */}
      <section className="w-full h-screen flex justify-center items-center py-16 md:py-24 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <OpeningBracket className="w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold text-primary">{t("commitment.title")}</h2>
            <ClosingBracket className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <p className="w-full text-paragraph text-lg md:text-[1.5rem] leading-relaxed text-center">
            {t("commitment.description")}
          </p>
        </article>
      </section>
      
      {/* Partners Section */}
      <section className="w-full flex justify-center items-center py-16 md:py-32 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <OpeningBracket className="w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold text-primary">{t("partners.title")}</h2>
            <ClosingBracket className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          
          <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-15">
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:mx-0 md:w-40 md:h-40">
              <Image 
                src={MyTrustLogo} 
                alt="My Trust" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:mx-0 md:w-40 md:h-40">
              <Image 
                src={GulfITLogo} 
                alt="Gulf IT" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:mx-0 md:w-40 md:h-40">
              <Image 
                src={GreenCircleLogo} 
                alt="Green Circle" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:mx-0 md:w-40 md:h-40">
              <Image 
                src={HatnLogo} 
                alt="Hatn" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:mx-0 md:w-40 md:h-40">
              <Image 
                src={AntCeilingLogo} 
                alt="Ant Ceiling" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </article>
      </section>
      
      {/* Accreditations Section */}
      <section className="w-full flex justify-center items-center py-16 md:py-32 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-25">
          <div className="flex items-center justify-center gap-4 mb-6">
            <OpeningBracket className="w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold text-primary">{t("accreditations.title")}</h2>
            <ClosingBracket className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          
          <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-15">
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:w-40 md:h-40">
              <Image 
                src={AccreditationOne} 
                alt="Accreditation One" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:w-40 md:h-40">
              <Image 
                src={AccreditationTwo} 
                alt="Accreditation Two" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-32 mx-10 md:w-40 md:h-40">
              <Image 
                src={AccreditationThree} 
                alt="Accreditation Three" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </article>
      </section>
      
    </>
  )
}
