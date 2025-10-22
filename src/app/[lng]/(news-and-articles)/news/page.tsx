"use client";
import React from "react";
import { useT } from "@/app/i18n/client";
import HeroTitle from "@/components/hero-title";
import NewsCard from "@/app/[lng]/(news-and-articles)/news/components/news-card";
import { PageLoader } from "@/components/spinner";
import { getAllNews, type NewsListItem } from "@/query/new/get-all-new";

export default function Page() {
  const { t, i18n } = useT("news");
  const [news, setNews] = React.useState<NewsListItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getAllNews();
        if (mounted && res.success) setNews(res.data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (iso: string) => {
    try {
      const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
      return new Date(iso).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* Hero Section */}
      <HeroTitle>{t("title")}</HeroTitle>

      {/* News Grid Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-5/6 mx-auto">
          {news.length === 0 ? (
            <div className="py-20 text-center text-gold text-lg font-medium">
              {t('empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  title={i18n.language === "ar" ? item.titleAr : item.titleEn}
                  description={
                    i18n.language === "ar" ? item.contentAr : item.contentEn
                  }
                  date={formatDate(item.createdAt)}
                  readMore={t("readMore")}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
