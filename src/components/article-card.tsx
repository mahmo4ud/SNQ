import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CardBg from '@/../public/news-card-bg.png'
import { useT } from '@/app/i18n/client'

type Props = {
  id: number
  title: string
  description: string
  date: string
  readMore: string
  image: string
}

export default function ArticleCard({ id, title, description, date, readMore, image }: Props) {
  const { i18n } = useT()
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  const lng = i18n.language

  return (
    <article className="flex flex-col rounded-xl overflow-hidden bg-[#F3F6F2]">
      {/* Content Section */}
      <div className="flex flex-col gap-3 p-4" dir={direction}>
        <div>
          {/* Date */}
          <span className="text-gray-400 text-xs md:text-sm">{date}</span>
          
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-primary leading-relaxed">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        {/* Read More Link */}
        <Link 
          href={`/${lng}/articles/${id}`}
          className="w-fit text-primary text-sm font-medium mt-2 inline-block"
        >
          {readMore} {'>>'}
        </Link>
      </div>
    </article>
  )
}
