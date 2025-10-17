"use client"

import { useT } from "@/app/i18n/client"
import HeroTitle from "../../../../components/hero-title"

export default function Page() {
  const { t } = useT("about-us")
  
  // Split content into individual principles
  const principles = t("ourValues.content").split('\n\n').filter(p => p.trim())
  
  return (
    <section className="w-full min-h-screen">
      {/* Hero Section with Full Width Image */}
      <HeroTitle>{t("ourValues.title")}</HeroTitle>
      {/* Content Section */}
      <div className="w-11/12 mx-auto flex items-center justify-center py-24 md:py-48">
        <div className="flex flex-col gap-6 text-lg md:text-[1.3rem] leading-relaxed px-6 md:px-0">
          {principles.map((principle, index) => {
            const [title, ...descParts] = principle.split(':')
            const description = descParts.join(':').trim()
            return (
              <p key={index} className="text-paragraph  md:text-[1.5rem]">
                <span className="text-gold font-semibold">{title}:</span> {description}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}