"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LiteLogo from "@/../public/mobile-logo.png";
import Logo from "@/../public/logo.png"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useT } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import PolicyModal from "./components/PolicyModal";
import TradeMarkPolicy from "./components/TradeMarkPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

export default function Footer() {
  const { t, i18n } = useT("footer");
  const pathname = usePathname();
  const [activeModal, setActiveModal] = useState<'trademark' | 'terms' | 'privacy' | null>(null);

  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  
  // Extract current language from pathname
  const currentLang = pathname.match(/^\/(en|ar)/)?.[1] || i18n.language || "ar";
  return (
    <footer dir={direction} className={`${direction === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#293C21] to-[#394C31] text-lite-primary relative overflow-hidden`}>
      <div className="w-11/12 mx-auto py-12 flex flex-col gap-12" dir="rtl">
        {/* Logo */}
        <div>
          <Image src={Logo} alt="Logo" width={300} />
        </div>
        {/* Lite Logo */}
        <div className={`absolute -bottom-10 ${direction === "rtl" ? "-left-10" : "-right-10"}`}>
          <Image src={LiteLogo} alt="SQN Lawyers Logo" width={345} className="opacity-5 blur-[1.5px]" />
        </div>
        {/* Main Footer Content */}
        <div dir={direction} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links - Right Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t("quickLinks.title")}</h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href={`/${currentLang}/news`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("quickLinks.news")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/articles`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("quickLinks.articles")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/join-us`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("quickLinks.joinTeam")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/legal-consultations`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("quickLinks.startConsultations")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/contact-us`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("quickLinks.contactUs")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About - Middle Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t("about.title")}</h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href={`/${currentLang}/services`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("about.services")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/accreditations`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("about.accreditations")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/our-professional-approach`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("about.professionalApproach")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/our-message`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("about.ourMessage")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/our-vision`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("about.ourVision")}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/our-values`} className="hover:text-white transition-colors group">
                  <span className={`inline-block w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>{t("about.ourValues")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Left Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t("contact.title")}</h3>
            <ul className="space-y-3 font-medium">
              <li>
                <Link href="mailto:info@snqsa.com" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className={`flex items-center gap-2 w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>
                    <EnvelopeIcon className="w-5 h-5"/>
                    info@snqsa.com
                  </span>
                </Link>
              </li>
              <li>
                <Link href="tel:+966570680090" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className={`flex items-center gap-2 w-full text-nowrap ${direction === 'rtl' ? 'group-hover:translate-x-[-5px]' : 'group-hover:translate-x-[5px]'} transition-all`}>
                    <PhoneIcon className="w-5 h-5" />
                    <span dir="ltr">(+966) 570680090</span>
                  </span>
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 mt-1"/>
                <span>{t("contact.location")}</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4 relative z-30">
              <Link href="https://wa.me/966570680090" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <svg className="w-6.5 h-6.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/snq-law-firm/about/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="LinkedIn" className="w-6 h-6" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4.01 0 4.75 2.64 4.75 6.07V24h-4v-7.7c0-1.83-.03-4.18-2.55-4.18-2.56 0-2.95 2-2.95 4.05V24h-4V8z"/>
                </svg>
              </Link>
              <Link href="https://www.instagram.com/@snqlawfirm" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/>
                </svg>
              </Link>
              <Link href="https://www.tiktok.com/@snqlawfirm" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5 2h2.5a4.5 4.5 0 0 0 4.5 4.5v2.3a6.8 6.8 0 0 1-3.7-1.1v6.9a6.6 6.6 0 1 1-6.6-6.6c.3 0 .5 0 .8.1v2.7a3.9 3.9 0 1 0 2.8 3.8V2z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-lite-primary/50 w-11/12 mx-auto py-4 relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            {t("bottomBar.copyright")}
          </div>
          <div className="flex gap-3 md:gap-4 items-center justify-center text-center">
            <button
              onClick={() => setActiveModal('trademark')}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {t("bottomBar.tradeMarkPolicy")}
            </button>
            <span>|</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {t("bottomBar.terms")}
            </button>
            <span>|</span>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {t("bottomBar.privacyPolicy")}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PolicyModal
        isOpen={activeModal === 'trademark'}
        onClose={() => setActiveModal(null)}
        title={t("bottomBar.tradeMarkPolicy")}
      >
        <TradeMarkPolicy />
      </PolicyModal>

      <PolicyModal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={t("bottomBar.terms")}
      >
        <TermsAndConditions />
      </PolicyModal>

      <PolicyModal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={t("bottomBar.privacyPolicy")}
      >
        <PrivacyPolicy />
      </PolicyModal>
    </footer>
  )
}
