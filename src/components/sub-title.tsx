import OpeningBracket from '../../public/opening-bracket';
import ClosingBracket from '../../public/closing-bracket';

type Props = {
  children: string;
  textColor?: string;
  className?: string;
  fontSize?: string;
}

export default function SubTitle({children, textColor, className, fontSize}: Props) {
  return (
    <div className={`${className} flex items-center justify-center text-center gap-4 mb-4`} dir="rtl">
      <OpeningBracket className="w-6 h-6 md:w-8 md:h-8"/>
      <h1 className={`${fontSize} font-bold text-${textColor || "primary"}`}>{children}</h1>
      <ClosingBracket className="w-6 h-6 md:w-8 md:h-8"/>
    </div>
  )
}