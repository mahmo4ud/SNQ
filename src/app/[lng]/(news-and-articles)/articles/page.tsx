"use client"
import React from 'react'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import ArticleCard from '@/components/article-card'

type ArticleItem = {
  id: number
  title: string
  description: string
  date: string
  readMore: string
}

export default function Page() {
  const { t } = useT("articles")
  const articleItems = t("articleItems", { returnObjects: true }) as ArticleItem[]

  return (
    <>
      {/* Hero Section */}
      <HeroTitle>{t("title")}</HeroTitle>
      
      {/* Articles Grid Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-5/6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articleItems.map((item) => (
              <ArticleCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
                readMore={item.readMore}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}