"use client"
import React from 'react'
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'

export default function TrademarkPolicyPage() {
  const { t, i18n } = useT("policies")
  const direction = i18n.language === "ar" ? "rtl" : "ltr"

  return (
    <>
      <HeroTitle>{t("trademarkPolicy.pageTitle")}</HeroTitle>

      <section className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto py-12 md:py-16 bg-white">
        <div dir={direction} className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              {t("trademarkPolicy.firmName")}
            </h3>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("trademarkPolicy.introTitle")}
            </h4>
            <p className="leading-relaxed">
              {t("trademarkPolicy.intro")}
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("trademarkPolicy.ownershipTitle")}
            </h4>
            <p className="leading-relaxed">
              {t("trademarkPolicy.ownership")}
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("trademarkPolicy.includesTitle")}
            </h4>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>{t("trademarkPolicy.includes.tradeName")}</li>
              <li>{t("trademarkPolicy.includes.officialSlogan")}</li>
              <li>{t("trademarkPolicy.includes.abbreviation")}</li>
              <li>{t("trademarkPolicy.includes.otherDesigns")}</li>
            </ul>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("trademarkPolicy.usageTermsTitle")}
            </h4>
            <p className="leading-relaxed mb-3">
              {t("trademarkPolicy.usageTermsIntro")}
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>{t("trademarkPolicy.usageTerms.term1")}</li>
              <li>{t("trademarkPolicy.usageTerms.term2")}</li>
              <li>{t("trademarkPolicy.usageTerms.term3")}</li>
              <li>{t("trademarkPolicy.usageTerms.term4")}</li>
              <li>{t("trademarkPolicy.usageTerms.term5")}</li>
              <li>{t("trademarkPolicy.usageTerms.term6")}</li>
              <li>{t("trademarkPolicy.usageTerms.term7")}</li>
            </ul>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("trademarkPolicy.legalCommitmentTitle")}
            </h4>
            <p className="leading-relaxed">
              {t("trademarkPolicy.legalCommitment")}
            </p>
          </section>

          <section>
            <h4 className="text-lg font-semibold text-primary mb-2">
              {t("trademarkPolicy.contactPointTitle")}
            </h4>
            <p className="leading-relaxed">
              {t("trademarkPolicy.contactPoint")}
              <a href={`mailto:${t("trademarkPolicy.email")}`} className="text-primary hover:underline font-semibold ml-1">
                {t("trademarkPolicy.email")}
              </a>
            </p>
          </section>
        </div>
      </section>
    </>
  )
}
