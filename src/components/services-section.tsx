"use client"

import Image, { StaticImageData } from "next/image"
import { useState } from "react"
import { useT } from "@/app/i18n/client"

// Import service card icons
import Icon1 from "@/../public/services-card-icons/1.png"
import Icon2 from "@/../public/services-card-icons/2.png"
import Icon3 from "@/../public/services-card-icons/3.png"
import Icon4 from "@/../public/services-card-icons/4.png"
import Icon5 from "@/../public/services-card-icons/5.png"
import Icon6 from "@/../public/services-card-icons/6.png"
import Icon7 from "@/../public/services-card-icons/7.png"
import Icon8 from "@/../public/services-card-icons/8.png"
import Icon9 from "@/../public/services-card-icons/9.png"
import Icon10 from "@/../public/services-card-icons/10.png"
import Icon11 from "@/../public/services-card-icons/11.png"
import Icon12 from "@/../public/services-card-icons/12.png"
import Icon13 from "@/../public/services-card-icons/13.png"
import Icon14 from "@/../public/services-card-icons/14.png"
import Icon15 from "@/../public/services-card-icons/15.png"
import SubTitle from "@/components/sub-title"

const services = [
  { id: 1, icon: Icon1, titleKey: "service1.title", descKey: "service1.description", itemsKey: "service1.items" },
  { id: 2, icon: Icon2, titleKey: "service2.title", descKey: "service2.description", itemsKey: "service2.items" },
  { id: 3, icon: Icon3, titleKey: "service3.title", descKey: "service3.description", itemsKey: "service3.items" },
  { id: 4, icon: Icon4, titleKey: "service4.title", descKey: "service4.description", itemsKey: "service4.items" },
  { id: 5, icon: Icon5, titleKey: "service5.title", descKey: "service5.description", itemsKey: "service5.items" },
  { id: 6, icon: Icon6, titleKey: "service6.title", descKey: "service6.description", itemsKey: "service6.items" },
  { id: 7, icon: Icon7, titleKey: "service7.title", descKey: "service7.description", itemsKey: "service7.items" },
  { id: 8, icon: Icon8, titleKey: "service8.title", descKey: "service8.description", itemsKey: "service8.items" },
  { id: 9, icon: Icon9, titleKey: "service9.title", descKey: "service9.description", itemsKey: "service9.items" },
  { id: 10, icon: Icon10, titleKey: "service10.title", descKey: "service10.description", itemsKey: "service10.items" },
  { id: 11, icon: Icon11, titleKey: "service11.title", descKey: "service11.description", itemsKey: "service11.items" },
  { id: 12, icon: Icon12, titleKey: "service12.title", descKey: "service12.description", itemsKey: "service12.items" },
  { id: 13, icon: Icon13, titleKey: "service13.title", descKey: "service13.description", itemsKey: "service13.items" },
  { id: 14, icon: Icon14, titleKey: "service14.title", descKey: "service14.description", itemsKey: "service14.items" },
  { id: 15, icon: Icon15, titleKey: "service15.title", descKey: "service15.description", itemsKey: "service15.items" },
]

interface ServicesSectionProps {
  image?: string | StaticImageData,
  bgColor?: string,
  subTitle?: boolean,
}

export default function ServicesSection({ image, bgColor = "bg-primary", subTitle = false }: ServicesSectionProps) {
  const { t, i18n } = useT("services")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const direction = i18n.language === "ar" ? "rtl" : "ltr"

  // Split services into two columns (for md screens)
  const column1_md = services.filter((_, index) => index % 2 === 0)
  const column2_md = services.filter((_, index) => index % 2 === 1)
  
  // Split services into three columns (for lg screens)
  const column1_lg = services.filter((_, index) => index % 3 === 0)
  const column2_lg = services.filter((_, index) => index % 3 === 1)
  const column3_lg = services.filter((_, index) => index % 3 === 2)

  const renderServiceCard = (service: typeof services[0]) => {
    const isHovered = hoveredCard === service.id
    const items = t(service.itemsKey, { returnObjects: true }) as string[]
    const hasItems = Array.isArray(items) && items.length > 0

    return (
      <div
        key={service.id}
        className="h-fit bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl flex flex-col group relative overflow-hidden"
        onMouseEnter={() => hasItems && setHoveredCard(service.id)}
        onMouseLeave={() => hasItems && setHoveredCard(null)}
      >
        {/* Default Content */}
        <div className={`transition-opacity duration-300`}>
          {/* Icon */}
          <div className="flex justify-start mb-4">
            <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
              <Image 
                src={service.icon} 
                alt={t(service.titleKey)}
                width={40}
                height={40}
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
              />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg xl:text-[1.5rem] font-bold text-gold mb-3">
            {t(service.titleKey)}
          </h3>
          
          {/* Description */}
          <p className={`text-gray-600 font-medium leading-relaxed text-base xl:text-[1.125rem] transition-all duration-500`}>
            {t(service.descKey)}
          </p>

          
          <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${isHovered ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="font-medium list-disc list-inside space-y-2 text-gray-400 text-sm md:text-base leading-relaxed pt-2">
              {Array.isArray(items) && items.map((item, index) => (
                <li key={index} style={{ direction: direction }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`relative w-full py-16 md:py-24 ${bgColor}`}>
      {image && (
        <Image src={image} alt="Mobile Logo" className="w-[35rem] absolute top-20 left-1/2 -translate-x-1/2 z-1 opacity-5" />
      )}
      <div className="relative container mx-auto px-4 xl:px-16 z-10">
        {subTitle && (
          <div className="text-center mb-12 md:mb-16">
            <SubTitle fontSize="text-3xl md:text-3xl lg:text-4xl" textColor="white">{t("subTitle")}</SubTitle>
            <p className="text-lite-primary text-lg md:text-[1.38rem] max-w-3xl mx-auto leading-relaxed">
              {t("paragraph")}
            </p>
          </div>
        )}

        {/* Services Grid - 2 columns for md (768px-1023px), 3 columns for lg (1024px+) */}
        
        {/* Two Columns Layout (visible on md only) */}
        <div className="hidden md:flex lg:hidden flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column1_md.map(renderServiceCard)}
          </div>
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column2_md.map(renderServiceCard)}
          </div>
        </div>

        {/* Three Columns Layout (visible on lg and above) */}
        <div className="hidden lg:flex flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column1_lg.map(renderServiceCard)}
          </div>
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column2_lg.map(renderServiceCard)}
          </div>
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column3_lg.map(renderServiceCard)}
          </div>
        </div>

        {/* Single Column Layout (visible on mobile only) */}
        <div className="flex md:hidden flex-col gap-4">
          {services.map(renderServiceCard)}
        </div>
      </div>
    </section>
  )
}
