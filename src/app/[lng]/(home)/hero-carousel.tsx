"use client"

import { Carousel, CarouselPrevious, CarouselNext, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel"
import SlideOneBg from "../../../../public/slide-1-bg.png"
import SlideTwoBg from "../../../../public/slide-2-bg.png"
import HeroImage from "../../../../public/hero-image.png"
import MobileLogo from "../../../../public/mobile-logo.png"
import Image, { StaticImageData } from "next/image"
import { useT } from "@/app/i18n/client"

interface Slide {
  id: number
  type: "light" | "dark"
  image?: boolean
  bgImage: StaticImageData
}

export default function HeroCarousel() {
  const { i18n, t } = useT("home");
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  // Define slides configuration
  const slides: Slide[] = [
    {
      id: 1,
      type: "light",
      image: true,
      bgImage: SlideOneBg,
    },
    {
      id: 2,
      type: "dark",
      bgImage: SlideTwoBg,
    },
  ]

  return (
    <section className="w-full">
      <Carousel opts={{ align: "start", loop: true, direction: direction }} className="w-full h-full">
        <CarouselContent className="h-[calc(100vh-70px)] relative z-2 ml-0">
          {slides.map((slide) => (
            <CarouselItem 
              key={slide.id} 
              className={`h-full pl-0 relative ${slide.type === "dark" ? "bg-primary" : "transparent"}`}
            >
              {/* Background Image */}
              <Image 
                src={slide.bgImage} 
                alt="Background" 
                fill
                priority
              />
              <div className={`w-full h-full flex items-center justify-center relative z-10`}>
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                  {slide.type === "light" ? (
                    // Light slide
                    <div className={`flex flex-col md:flex-row items-center justify-between gap-8 w-fit mx-auto relative`}>                      
                      {slide.image && (
                        <div className="relative w-64 h-64 md:w-80 md:h-80 z-10">
                          <Image 
                            src={HeroImage} 
                            alt="Lawyer" 
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 text-center md:text-right z-10 bg-transparent">
                        <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold md:mb-4 text-primary`}>
                          {t(`carousel.slide${slide.id}.title`)}
                        </h1>
                        <p className="text-lg md:text-md text-gold">
                          {t(`carousel.slide${slide.id}.description`)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Dark slide
                    <div className="max-w-4xl mx-auto text-center relative">
                      <Image src={MobileLogo} alt="Logo" width={250} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5" />
                      <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl lg:text-[2rem] font-bold mb-6 text-white">
                          {t(`carousel.slide${slide.id}.title`)}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-[1.25rem] px-16 md:px-10 leading-relaxed text-lite-primary">
                          {t(`carousel.slide${slide.id}.description`)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Buttons */}
        <CarouselPrevious 
          className="w-12 h-12 left-4 text-lite-primary md:left-8 bg-[#181818]/5 hover:bg-white border-none shadow-lg z-2"
        />
        <CarouselNext 
          className="w-12 h-12 right-4 text-lite-primary md:right-8 bg-[#181818]/5 hover:bg-white border-none shadow-lg z-2"
        />
        
        {/* Pagination Dots */}
        <CarouselDots />
      </Carousel>
    </section>
  )
}
