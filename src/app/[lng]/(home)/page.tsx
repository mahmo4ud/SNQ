"use client"
import Image from "next/image"
import HeroCarousel from "./hero-carousel"
import ServicesSection from "./services-section"
import { useT } from "@/app/i18n/client"
import { motion } from "framer-motion"

// Mobile Logo
import MobileLogo from "@/../public/mobile-logo.png"

// Partner Logos
import MyTrustLogo from "@/../public/partners/my-trust.svg"
import GulfITLogo from "@/../public/partners/gulf-it.svg"
import GreenCircleLogo from "@/../public/partners/green-circle.svg"
import AntCeilingLogo from "@/../public/partners/ant-ceiling.svg"

// Accreditation Logos
import AccreditationOne from "@/../public/accreditations/logo-one.svg"
import AccreditationTwo from "@/../public/accreditations/logo-two.svg"
import AccreditationThree from "@/../public/accreditations/logo-three.svg"
import SubTitle from "@/components/sub-title"

export default function Page() {
  const { t, i18n } = useT("home")
  const direction = i18n.language === "ar" ? "rtl" : "ltr"

  return (
    <>
      <HeroCarousel />

      {/* Mission Section */}
      <section className="w-full h-screen flex justify-center items-center py-16 md:py-24 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-16">
          <SubTitle fontSize="text-3xl md:text-3xl lg:text-4xl">{t("mission.title")}</SubTitle>
          <p className="w-full text-paragraph text-lg md:text-[1.5rem] leading-relaxed text-center">
            {t("mission.description")}
          </p>
        </article>
      </section>

      {/* Services Section */}
      <ServicesSection id="services" subTitle={true} image={MobileLogo} bgColor="bg-primary" />
      
      {/* Commitment Section */}
      <section id="commitment-to-clients" className="w-full h-screen flex justify-center items-center py-16 md:py-24 bg-transparent scroll-mt-[70px]">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-16">
          <SubTitle fontSize="text-3xl md:text-3xl lg:text-4xl">{t("commitment.title")}</SubTitle>
          <p className="w-full text-paragraph text-lg md:text-[1.5rem] leading-relaxed text-center">
            {t("commitment.description")}
          </p>
        </article>
      </section>
      
      {/* Partners Section */}
      <section className="w-full flex justify-center items-center py-16 md:py-32 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-6">
          <SubTitle fontSize="text-3xl md:text-3xl lg:text-4xl">{t("partners.title")}</SubTitle>
          <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-42 h-42 mx-10 md:mx-0 md:w-50 md:h-50"
            >
              <Image 
                src={AntCeilingLogo} 
                alt="Ant Ceiling" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-42 h-42 mx-10 md:mx-0 md:w-50 md:h-50"
            >
              <Image 
                src={GreenCircleLogo} 
                alt="Green Circle" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-52 h-52 mx-10 md:mx-0 md:w-60 md:h-60"
            >
              <Image 
                src={GulfITLogo} 
                alt="Gulf IT" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-40 h-40 mx-10 md:mx-0 md:w-30 md:h-30"
            >
              <Image 
                src={MyTrustLogo} 
                alt="My Trust" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </div>
        </article>
      </section>
      
      {/* Accreditations Section */}
      <section className="w-full flex justify-center items-center py-16 md:py-32 bg-transparent">
        <article className="w-5/6 flex flex-col items-center gap-16 mx-auto px-4 md:px-8 lg:px-25">
          <SubTitle fontSize="text-3xl md:text-3xl lg:text-4xl">{t("accreditations.title")}</SubTitle>
          <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-60 h-60 mx-10 md:w-70 md:h-70"
            >
              <Image 
                src={AccreditationThree} 
                alt="Accreditation Three" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-60 h-60 mx-10 md:w-50 md:h-50"
            >
              <Image 
                src={AccreditationTwo} 
                alt="Accreditation Two" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ amount: 1, once: true }}
              className="flex items-center justify-center w-40 h-40 mx-10 md:w-40 md:h-40"
            >
              <Image 
                src={AccreditationOne} 
                alt="Accreditation One" 
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </div>
        </article>
      </section>
      
    </>
  )
}
