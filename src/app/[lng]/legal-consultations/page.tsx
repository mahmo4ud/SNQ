"use client"
import HeroTitle from "@/components/hero-title"
import { useT } from "@/app/i18n/client"

export default function Page() {
  const { t } = useT("navbar")
  
  return (
    <>
      <HeroTitle>{t("legalConsultations.title")}</HeroTitle>
    </>
  )
}