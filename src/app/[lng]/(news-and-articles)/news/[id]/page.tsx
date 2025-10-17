"use client"
import React from 'react'
import Image from 'next/image'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import NewsCard from '@/components/news-card'
import ContactForm from '@/components/contact-form'
import CardBg from '@/../public/news-card-bg.png'

type NewsItem = {
  id: number
  title: string
  description: string
  date: string
  readMore: string
}

type NewsDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { t, i18n } = useT("news")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  
  // Unwrap params using React.use()
  const { id } = React.use(params)

  // Get all news items and find the current one
  const newsItems = t("newsItems", { returnObjects: true }) as NewsItem[]
  const currentNews = newsItems.find(item => item.id === parseInt(id)) || newsItems[0]
  
  // Get other news items (excluding current)
  const relatedNews = newsItems.filter(item => item.id !== parseInt(id)).slice(0, 3)

  return (
    <>
      {/* Hero Section with Dynamic Breadcrumb */}
      <HeroTitle pageTitle={currentNews.title}>{t("title")}</HeroTitle>

      {/* Main Content */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-5/6 md:w-4/5 lg:w-3/4 mx-auto md:px-4">
          
          {/* Article Banner */}
          <div className="mb-8">
            <div className="relative h-64 md:h-80 lg:h-130 overflow-hidden rounded-2xl bg-[#6B5550]">
              <Image 
                src={CardBg}
                alt={currentNews.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Article Title and Meta */}
          <div className="mb-8" dir={direction}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
              {currentNews.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{t("categories.news")}</span>
              <span>|</span>
              <span>{currentNews.date}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12" dir={direction}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {currentNews.description}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("articleContent.paragraph1")}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("articleContent.paragraph2")}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("articleContent.paragraph3")}
            </p>
          </div>

          {/* Related News Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" dir={direction}>
              {t("relatedNews.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedNews.map((item) => (
                <NewsCard
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

          {/* Contact Form Section */}
          <ContactForm />
        </div>
      </section>
    </>
  )
}
