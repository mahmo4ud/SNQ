"use client"
import React from 'react'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'

export default function TermsAndConditionsPage() {
  const { t, i18n } = useT("policies")
  const direction = i18n.language === "ar" ? "rtl" : "ltr"

  return (
    <>
      <HeroTitle>{t("termsAndConditions.pageTitle")}</HeroTitle>

      <section className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto py-12 md:py-16 bg-white">
        <div dir={direction} className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              {t("termsAndConditions.welcome")}
            </h3>
            <p className="leading-relaxed">
              {t("termsAndConditions.intro")}
            </p>
          </section>

          <section>
            <p className="leading-relaxed">
              {t("termsAndConditions.purpose")}
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("termsAndConditions.usageTermsTitle")}
            </h4>
            <ul className="list-decimal list-inside space-y-3 leading-relaxed">
              <li>{t("termsAndConditions.usageTerms.term1")}</li>
              <li>{t("termsAndConditions.usageTerms.term2")}</li>
              <li>{t("termsAndConditions.usageTerms.term3")}</li>
              <li>{t("termsAndConditions.usageTerms.term4")}</li>
              <li>{t("termsAndConditions.usageTerms.term5")}</li>
            </ul>
          </section>

          <section>
            <p className="leading-relaxed">
              {t("termsAndConditions.commitment")}
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("termsAndConditions.intellectualPropertyTitle")}
            </h4>
            <p className="leading-relaxed mb-3">
              {t("termsAndConditions.intellectualProperty")}
            </p>
            <p className="leading-relaxed">
              {t("termsAndConditions.intellectualPropertyUsage")}
            </p>
          </section>

          <section>
            <p className="leading-relaxed font-medium">
              {t("termsAndConditions.acceptance")}
            </p>
          </section>
        </div>
      </section>
    </>
  )
}
