"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useT } from "@/app/i18n/client"
import HeroTitle from "../../../../components/hero-title"
import logoOne from "../../../../../public/accreditations/logo-one.svg"
import logoTwo from "../../../../../public/accreditations/logo-two.svg"
import logoThree from "../../../../../public/accreditations/logo-three.svg"

export default function Page() {
  const { t, i18n } = useT("advantages")
  const direction = i18n.language === "ar" ? "rtl" : "ltr"

  return (
    <section className="w-full min-h-screen">
      {/* Hero Section with Full Width Image */}
      <HeroTitle>{t("accreditations.title")}</HeroTitle>
      {/* Content Section */}
      <div className="w-11/12 mx-auto flex items-center justify-center py-24 md:py-48">
        <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-15">
          <motion.div
            initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 1, once: true }}
            className="flex items-center justify-center w-60 h-60 mx-10 md:w-70 md:h-70"
          >
            <Image 
              src={logoThree} 
              alt="Saudi Bar Association" 
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
              src={logoTwo} 
              alt="SASL" 
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
              src={logoOne} 
              alt="Ministry of Justice" 
              width={160}
              height={160}
              className="object-contain w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}