"use client"
import HeroTitle from "@/components/hero-title"
import { useT } from "@/app/i18n/client"

export default function Page() {
  const { t, i18n } = useT("navbar")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  
  return (
    <>
      {/* Hero Section with Automatic Breadcrumb */}
      <HeroTitle>{t("legalConsultations.title")}</HeroTitle>
    </>
  )
}