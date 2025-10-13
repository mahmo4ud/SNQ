"use client"

import Image from "next/image"
import { useT } from "@/app/i18n/client"
import OpeningBracket from "@/components/opening-bracket"
import ClosingBracket from "@/components/closing-bracket"

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

const services = [
  { id: 1, icon: Icon1, titleKey: "service1.title", descKey: "service1.description" },
  { id: 2, icon: Icon2, titleKey: "service2.title", descKey: "service2.description" },
  { id: 3, icon: Icon3, titleKey: "service3.title", descKey: "service3.description" },
  { id: 4, icon: Icon4, titleKey: "service4.title", descKey: "service4.description" },
  { id: 5, icon: Icon5, titleKey: "service5.title", descKey: "service5.description" },
  { id: 6, icon: Icon6, titleKey: "service6.title", descKey: "service6.description" },
  { id: 7, icon: Icon7, titleKey: "service7.title", descKey: "service7.description" },
  { id: 8, icon: Icon8, titleKey: "service8.title", descKey: "service8.description" },
  { id: 9, icon: Icon9, titleKey: "service9.title", descKey: "service9.description" },
  { id: 10, icon: Icon10, titleKey: "service10.title", descKey: "service10.description" },
  { id: 11, icon: Icon11, titleKey: "service11.title", descKey: "service11.description" },
  { id: 12, icon: Icon12, titleKey: "service12.title", descKey: "service12.description" },
  { id: 13, icon: Icon13, titleKey: "service13.title", descKey: "service13.description" },
  { id: 14, icon: Icon14, titleKey: "service14.title", descKey: "service14.description" },
  { id: 15, icon: Icon15, titleKey: "service15.title", descKey: "service15.description" },
]

export default function ServicesSection() {
  const { t } = useT("services")

  // Split services into three columns
  const column1 = services.filter((_, index) => index % 3 === 0)
  const column2 = services.filter((_, index) => index % 3 === 1)
  const column3 = services.filter((_, index) => index % 3 === 2)

  const renderServiceCard = (service: typeof services[0]) => {
    return (
      <div
        key={service.id}
        className="h-fit bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl flex flex-col group hover:scale-105 transition-all duration-300"
        
      >
        {/* Icon */}
        <div className="flex justify-start mb-4">
          <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
            <Image 
              src={service.icon} 
              alt={t(service.titleKey)}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-[1.5rem] font-bold text-gold mb-3">
          {t(service.titleKey)}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-[1.125rem]">
          {t(service.descKey)}
        </p>
      </div>
    )
  }

  return (
    <section className="w-full py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <OpeningBracket className="w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t("title")}
            </h2>
            <ClosingBracket className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <p className="text-lite-primary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Services Flex Container with 3 Columns */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Column 1 */}
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column1.map(renderServiceCard)}
          </div>
          
          {/* Column 2 */}
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column2.map(renderServiceCard)}
          </div>
          
          {/* Column 3 */}
          <div className="flex-1 grid grid-cols-1 gap-4 content-start">
            {column3.map(renderServiceCard)}
          </div>
        </div>
      </div>
    </section>
  )
}
