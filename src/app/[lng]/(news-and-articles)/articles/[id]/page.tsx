"use client"
import React from 'react'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import ArticleCard from '@/app/[lng]/(news-and-articles)/articles/components/article-card'
import { getOneBlog, type BlogDetail } from '@/query/blog/get-one-blog'
import { getAllBlogs, type BlogListItem } from '@/query/blog/get-all-blogs'
// import ContactForm from '@/components/contact-form'

type ArticleItem = {
  id: number
  title: string
  description: string
  date: string
  readMore: string
}

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

  const [blog, setBlog] = React.useState<BlogDetail | null>(null)
  const [relatedBlogs, setRelatedBlogs] = React.useState<BlogListItem[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [oneRes, allRes] = await Promise.all([getOneBlog(id), getAllBlogs()])
        if (mounted) {
          if (oneRes.success) setBlog(oneRes.data)
          if (allRes.success) setRelatedBlogs(allRes.data.filter(b => b.id !== id).slice(0, 3))
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
      <HeroTitle pageTitle={blog ? (i18n.language === 'ar' ? blog.titleAr : blog.titleEn) : ''}>{t("title")}</HeroTitle>

      {/* Main Content */}
      <section className="w-11/12 mx-auto flex flex-col lg:flex-row gap-6 py-12 md:py-16 bg-white">
        <div className="md:w-6/8 md:px-4">
        
          {/* Article Title and Meta */}
          <div className="mb-8" dir={direction}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
              {blog ? (i18n.language === 'ar' ? blog.titleAr : blog.titleEn) : ''}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{t("categories.article")}</span>
              <span>|</span>
              <span>{blog ? formatDate(blog.createdAt) : ''}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12" dir={direction}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {blog ? (i18n.language === 'ar' ? blog.contentAr : blog.contentEn) : ''}
            </p>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="mb-12 w-full lg:w-2/8">
          <h2 className="text-2xl font-bold text-gold mb-8" dir={direction}>
            {t("relatedArticles.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {relatedBlogs.map((item) => (
              <ArticleCard
                key={item.id}
                id={item.id}
                title={i18n.language === 'ar' ? item.titleAr : item.titleEn}
                description={i18n.language === 'ar' ? item.contentAr : item.contentEn}
                date={formatDate(item.createdAt)}
                readMore={t('readMore')}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
