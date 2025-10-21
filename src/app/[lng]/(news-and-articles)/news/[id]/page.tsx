"use client"
import React from 'react'
import Image from 'next/image'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import NewsCard from '@/app/[lng]/(news-and-articles)/news/components/news-card'
// import ContactForm from '@/components/contact-form'
import CardBg from '@/../public/news-card-bg.png'
import { getOneNew, type NewsDetail } from '@/query/new/get-one-new'
import { getAllNews, type NewsListItem } from '@/query/new/get-all-new'

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

  const [news, setNews] = React.useState<NewsDetail | null>(null)
  const [related, setRelated] = React.useState<NewsListItem[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [oneRes, allRes] = await Promise.all([getOneNew(id), getAllNews()])
        if (mounted) {
          if (oneRes.success) setNews(oneRes.data)
          if (allRes.success) setRelated(allRes.data.filter(n => n.id !== id).slice(0, 3))
        }
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id])

  const formatDate = (iso: string) => {
    try {
      const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'
      return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return iso
    }
  }

  return (
    <>
      {/* Hero Section with Dynamic Breadcrumb */}
      <HeroTitle pageTitle={news ? (i18n.language === 'ar' ? news.titleAr : news.titleEn) : ''}>{t("title")}</HeroTitle>

      {/* Main Content */}
      <section className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto flex flex-col lg:flex-row gap-6 py-12 md:py-16 bg-white">
        <div className="w-full md:w-4/5 mx-auto md:px-4">
          
          {/* News Banner */}
          <div className="mb-8">
            <div className="relative h-64 md:h-80 lg:h-130 overflow-hidden rounded-2xl bg-gray-50">
              {news?.imageUrl && (
                <Image
                  src={`${news.imageUrl}`}
                  alt={i18n.language === 'ar' ? news.titleAr : news.titleEn}
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>
          </div>

          {/* News Title and Meta */}
          <div className="mb-8" dir={direction}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
              {news ? (i18n.language === 'ar' ? news.titleAr : news.titleEn) : ''}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{t("categories.news")}</span>
              <span>|</span>
              <span>{news ? formatDate(news.createdAt) : ''}</span>
            </div>
          </div>

          {/* News Content */}
          <div className="prose prose-lg w-full mb-12" dir={direction}>
            <p className="text-gray-700 text-xl leading-relaxed mb-4 break-words">
              {news ? (i18n.language === 'ar' ? news.contentAr : news.contentEn) : ''}
            </p>
          </div>
        </div>
        
        {/* Related News Section */}
        <div className="mb-12 w-full lg:w-1/3">
          <h2 className="text-2xl font-bold text-gold mb-8" dir={direction}>
            {t("relatedNews.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {related.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={i18n.language === 'ar' ? item.titleAr : item.titleEn}
                description={i18n.language === 'ar' ? item.contentAr : item.contentEn}
                date={formatDate(item.createdAt)}
                readMore={t('readMore')}
                hideImage
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
