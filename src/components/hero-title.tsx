import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SubTitle from './sub-title'
import { useT } from '@/app/i18n/client'
import SubTitleBg from '@/../public/sub-title-bg.png'
import mobileLogo from '@/../public/mobile-logo.png'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { generateBreadcrumbs } from '@/lib/breadcrumb-helper'

type HeroTitleProps = {
  children: string
  pageTitle?: string // Optional title for dynamic pages (e.g., news article title)
}

export default function HeroTitle({ children, pageTitle }: HeroTitleProps) {
    const { t, i18n } = useT("navbar")
    const lng = i18n.language
    const pathname = usePathname()
    
    // Generate breadcrumbs automatically from pathname
    const breadcrumbItems = generateBreadcrumbs(pathname, t, pageTitle)
    
    return (
      <>
        <div className="w-full h-[50vh] flex flex-col items-center justify-center relative overflow-hidden">
          <Image src={SubTitleBg} alt="SubTitleBg" className="absolute top-0 left-0 w-full h-full object-cover"/>
          <div className="relative w-full">
            <Image src={mobileLogo} alt="mobileLogo" className="absolute top-6 md:top-30 opacity-10 blur-[2px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 md:w-100 object-cover"/>
            <SubTitle className="z-2 relative text-[2rem] md:text-[2.5rem] lg:text-[3rem]">{children}</SubTitle>
          </div>
          {/* Breadcrumb Section */}
          {breadcrumbItems.length > 1 && (
            <div className="w-full z-10 relative">
              <Breadcrumb>
                <BreadcrumbList className="justify-center text-gray-500 text-sm">
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {item.href ? (
                          <BreadcrumbLink asChild className="text-gray-500 hover:text-gray-700">
                            <Link href={`/${lng}${item.href}`}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-gray-600">{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator className="text-gray-400" />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>
        
      </>
    )
}
