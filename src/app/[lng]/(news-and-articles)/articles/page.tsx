"use client"
import React from 'react'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import ArticleCard from '@/app/[lng]/(news-and-articles)/articles/components/article-card'
import { PageLoader } from '@/components/spinner'
import { getAllBlogs, type BlogListItem } from '@/query/blog/get-all-blogs'

export default function Page() {
  const { t, i18n } = useT("articles")
  const [blogs, setBlogs] = React.useState<BlogListItem[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await getAllBlogs()
        if (mounted && res.success) setBlogs(res.data)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const formatDate = (iso: string) => {
    try {
      const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'
      return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return iso
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <>
      {/* Hero Section */}
      <HeroTitle>{t("title")}</HeroTitle>
      
      {/* Articles Grid Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-5/6 mx-auto">
          {blogs.length === 0 ? (
            <div className="py-20 text-center text-gold text-lg font-medium">
              {t('empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <ArticleCard
                  key={blog.id}
                  id={blog.id}
                  title={i18n.language === 'ar' ? blog.titleAr : blog.titleEn}
                  description={i18n.language === 'ar' ? blog.contentAr : blog.contentEn}
                  date={formatDate(blog.createdAt)}
                  readMore={t('readMore')}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}