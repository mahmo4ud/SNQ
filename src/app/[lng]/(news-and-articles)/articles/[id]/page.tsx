"use client"
import React from 'react'
import Image from 'next/image'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import ArticleCard from '@/components/article-card'
import ContactForm from '@/components/contact-form'
import CardBg from '@/../public/news-card-bg.png'

type ArticleDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { t, i18n } = useT("articles")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  
  // Unwrap params using React.use()
  const { id } = React.use(params)

  // Get all article items and find the current one
  const articleItems = t("articleItems", { returnObjects: true }) as any[]
  const currentArticle = articleItems.find(item => item.id === parseInt(id)) || articleItems[0]
  
  // Get other article items (excluding current)
  const relatedArticles = articleItems.filter(item => item.id !== parseInt(id)).slice(0, 3)

  return (
    <>
      {/* Hero Section with Dynamic Breadcrumb */}
      <HeroTitle pageTitle={currentArticle.title}>{t("title")}</HeroTitle>

      {/* Main Content */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-5/6 md:w-4/5 lg:w-3/4 mx-auto md:px-4">
        
          {/* Article Title and Meta */}
          <div className="mb-8" dir={direction}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
              {currentArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{t("categories.article")}</span>
              <span>|</span>
              <span>{currentArticle.date}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12" dir={direction}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {currentArticle.description}
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

          {/* Related Articles Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8" dir={direction}>
              {t("relatedArticles.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((item) => (
                <ArticleCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  readMore={item.readMore}
                  image={item.image}
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
