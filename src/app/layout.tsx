import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "../style/globals.css";

import { getT } from "./i18n";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "شركة SNQ سعيد بن ناصر بن قراد للمحاماة والاستشارات القانونية", 
    template: "SQN | %s",
  },
  description: "سَعيــد بن ناصــر بن قــراد للمحاماة والاستشارات القانونية، انطلق من رؤية واضحة ترتكز على تمكين العملاء من حماية حقوقهم عبر الجودة والكفاءة والشفافية والوضوح في تقديم الخدمات. نسعى دوماً إلى تحقيق مصالح عملائنا من خلال خبرات مؤسِّسينا وفريق العمل الاحترافي، وتسخير المعرفة القانونية المتراكمة لحماية مراكزهم القانونية وتعزيز الثقة والموثوقية في التعامل. تتنوع خدمات الشركة لتشمل مختلف المجالات القانونية والممارسات المتخصصة، بما يواكب احتياجات الأفراد والجهات التجارية والمؤسسات",
  keywords:"SNQ, سعيد بن ناصر بن قراد, شركة SNQ, مكتب محاماة, محامي, محامين, استشارات قانونية, محامي تجاري, محامي شركات, محامي قضايا, محامي عقارات, محامي أحوال شخصية, خدمات قانونية, محاماة الرياض, محامي سعودي, صياغة عقود, قضايا تجارية, نظام الشركات, تحكيم, تمثيل قانوني, استشارات نظامية, تأسيس الشركات, تسجيل العلامات التجارية, مكتب محاماة SNQ",
};



export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const { i18n } = await getT();
  
  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <body className={`${ibmPlexSansArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
