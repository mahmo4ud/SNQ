import Image from "next/image";
import Link from "next/link";
import LiteLogo from "@/../public/lite-logo.png";
import Logo from "@/../public/logo.png"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-linear-to-bl from-primary to-[#394C31] text-nav-text relative overflow-hidden">
      <div className="w-11/12 mx-auto py-12 flex flex-col gap-12" dir="rtl">
        {/* Logo */}
        <div>
          <Image src={Logo} alt="Logo" width={300} />
        </div>
        {/* Lite Logo */}
        <div className="absolute -bottom-10 -left-10">
          <Image src={LiteLogo} alt="SQN Lawyers Logo" width={345} className="opacity-5 blur-[1.5px]" />
        </div>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links - Right Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/advantages" className="hover:text-white transition-colors">
                  لماذا نحن مختلفون
                </Link>
              </li>
              <li>
                <Link href="/articles-and-news" className="hover:text-white transition-colors">
                  المقالات و الأخبار
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-white transition-colors">
                  انضم الى فريقنا
                </Link>
              </li>
              <li>
                <Link href="/legal-consultations" className="hover:text-white transition-colors">
                  ابدأ استشاراتك القانونية
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* About - Middle Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">عن سعيد بن ناصر بن فراد</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="/advantages/accreditations" className="hover:text-white transition-colors">
                  الاعتمادات
                </Link>
              </li>
              <li>
                <Link href="/advantages/professional-approach" className="hover:text-white transition-colors">
                  منهجنا المهني
                </Link>
              </li>
              <li>
                <Link href="/about-us/our-message" className="hover:text-white transition-colors">
                  رسالتنا
                </Link>
              </li>
              <li>
                <Link href="/about-us/our-vision" className="hover:text-white transition-colors">
                  رؤيتنا
                </Link>
              </li>
              <li>
                <Link href="/about-us/our-values" className="hover:text-white transition-colors">
                  قيمنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Left Column */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@snqsa.com" className="hover:text-white transition-colors flex items-center gap-2">
                  <EnvelopeIcon className="w-5 h-5" />
                  info@snqsa.com
                </a>
              </li>
              <li>
                <a href="tel:+9665706600930" className="hover:text-white transition-colors flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  (+966) 5706600930
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 mt-1" />
                <span>المملكة العربية السعودية الرياض</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              <a href="https://wa.me/9665706600930" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-nav-text/30">
        <div className="w-11/12 mx-auto py-4" dir="rtl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <span>|</span>
              <Link href="/refund-policy" className="hover:text-white transition-colors">
                سياسة القابلة للاسترداد
              </Link>
            </div>
            <div>
              2025 سعيد بن فراد. جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
