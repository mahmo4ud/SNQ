import React from 'react'
import Image from 'next/image'
import SubTitle from './sub-title'
import { useT } from '@/app/i18n/client'
import SubTitleBg from '@/../public/sub-title-bg.png'
import mobileLogo from '@/../public/mobile-logo.png'

export default function HeroTitle({ children }: { children: string }) {
    const { t } = useT("about-us")
    return (
      <div className="w-screen h-[65vh] flex items-center justify-center relative overflow-hidden">
        <Image src={SubTitleBg} alt="SubTitleBg" className="absolute top-0 left-0 w-full h-full object-cover"/>
        <div className="relative w-full">
          <Image src={mobileLogo} alt="mobileLogo" className="absolute top-6 md:top-30 opacity-10 blur-[2px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 md:w-130 object-cover"/>
          <SubTitle className="z-2 relative text-[2rem] md:text-[2.5rem] lg:text-[3rem]">{children}</SubTitle>
        </div>
      </div>
    )
}
