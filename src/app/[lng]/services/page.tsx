"use client"
import ServicesSection from "../../../components/services-section"
import HeroTitle from "../../../components/hero-title"
import { useT } from "@/app/i18n/client"

export default function Page() {
  const { t } = useT("services")
  
  return (
    <>
      <HeroTitle>{t("title")}</HeroTitle>
      <ServicesSection subTitle={false} bgColor="bg-[#F6F7F6]" />
    </>
  )
}