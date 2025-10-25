"use client"
import React from 'react'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import { PhoneIcon, MapPinIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Page() {
  const { t: tNavbar } = useT("navbar")
  const { t, i18n } = useT("legalConsultations")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'

  const contactInfo = [
    {
      icon: ClockIcon,  
      value: t("contact.hours"),
    },
    {
      icon: EnvelopeIcon,
      value: t("contact.email"),
      href: "mailto:info@snqsa.com"
    },
    {
      icon: MapPinIcon,
      value: t("contact.location"),
    },
    {
      icon: PhoneIcon,
      value: t("contact.phone"),
      href: "tel:+966570868090"
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroTitle>{tNavbar("legalConsultations.title")}</HeroTitle>

      {/* Main Content */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-11/12 lg:w-4/5 mx-auto">
          
          {/* Contact Information Cards */}
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              const content = (
                <div className="flex flex-col items-center justify-center p-6">
                  <IconComponent className="w-10 h-10 text-gold mb-4" strokeWidth={1.5} />
                  <h3 className="font-medium text-gray-500 whitespace-pre-line text-center" dir={direction}>
                    {info.value}
                  </h3>
                </div>
              )

              return info.href ? (
                <a key={index} href={info.href}>
                  {content}
                </a>
              ) : (
                <div key={index}>
                  {content}
                </div>
              )
            })}
          </div>

          {/* Google Calendar Widget */}
          <div className="">
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1CQaASu2Kemmu8yeqCn_9APRBotGdAnkBBlYZih7w2eB3g-Zrl_YddtIcU621Mpzf-qeSLGoSd?gv=true"
              className="w-full h-[80vh] border-5 border-gold rounded-2xl"
            ></iframe>
          </div>

        </div>
      </section>

      {/* Calendly Script - Add this to load the Calendly widget */}
      <script 
        type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async
      />
    </>
  )
}