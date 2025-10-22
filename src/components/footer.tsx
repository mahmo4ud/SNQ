"use client";
import Image from "next/image";
import Link from "next/link";
import LiteLogo from "@/../public/mobile-logo.png";
import Logo from "@/../public/logo.png"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useT } from "@/app/i18n/client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { t, i18n } = useT("footer");
  const pathname = usePathname();

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
                <Image className="w-6 h-6" src="/whatsapp-logo.svg" alt="WhatsApp" width={24} height={24} />
              </Link>
              <Link href="https://x.com/snqlawfirm" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <Image className="w-6 h-6" src="/x-logo.svg" alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/@snqlawfirm" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <Image className="w-6 h-6" src="/insta-logo.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="https://www.tiktok.com/@snqlawfirm" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <Image className="w-6 h-6" src="/tiktok-logo.svg" alt="Tiktok" width={24} height={24} />
              </Link>
              <Link href="https://www.linkedin.com/company/snq-law-firm/about/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-115 transition-all">
                <Image className="w-6 h-6" src="/linkedin-logo.svg" alt="LinkedIn" width={24} height={24} />
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
            <Link
              href={`/${currentLang}/trademark-policy`}
              className="hover:text-white hover:underline transition-colors"
            >
              {t("bottomBar.tradeMarkPolicy")}
            </Link>
            <span>|</span>
            <Link
              href={`/${currentLang}/terms-and-conditions`}
              className="hover:text-white hover:underline transition-colors"
            >
              {t("bottomBar.terms")}
            </Link>
            <span>|</span>
            <Link
              href={`/${currentLang}/privacy-policy`}
              className="hover:text-white hover:underline transition-colors"
            >
              {t("bottomBar.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
