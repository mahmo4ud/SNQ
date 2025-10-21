"use client";
import { useT } from "@/app/i18n/client";

export default function PrivacyPolicy() {
  const { t, i18n } = useT("policies");
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div dir={direction} className="space-y-6 text-gray-700">
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3">
          {t("privacyPolicy.intro")}
        </h3>
        <p className="leading-relaxed">
          {t("privacyPolicy.paragraph1")}
        </p>
      </section>

      <section>
        <h4 className="text-lg font-semibold text-primary mb-2">
          {t("privacyPolicy.dataUsageTitle")}
        </h4>
        <ul className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>{t("privacyPolicy.dataUsageItems.item1")}</li>
          <li>{t("privacyPolicy.dataUsageItems.item2")}</li>
          <li>{t("privacyPolicy.dataUsageItems.item3")}</li>
          <li>{t("privacyPolicy.dataUsageItems.item4")}</li>
          <li>{t("privacyPolicy.dataUsageItems.item5")}</li>
        </ul>
      </section>

      <section>
        <p className="leading-relaxed">
          {t("privacyPolicy.marketingText")}
        </p>
      </section>

      <section>
        <h4 className="text-lg font-semibold text-primary mb-2">
          {t("privacyPolicy.disclosureTitle")}
        </h4>
        <ul className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>{t("privacyPolicy.disclosureItems.item1")}</li>
          <li>{t("privacyPolicy.disclosureItems.item2")}</li>
          <li>{t("privacyPolicy.disclosureItems.item3")}</li>
        </ul>
      </section>

      <section>
        <p className="leading-relaxed">
          {t("privacyPolicy.noSellText")}
        </p>
      </section>

      <section>
        <p className="leading-relaxed">
          {t("privacyPolicy.retentionText")}
        </p>
      </section>
    </div>
  );
}
