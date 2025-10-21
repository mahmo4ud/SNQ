interface OpeningBracketProps {
  className?: string
  width?: number
  height?: number
  fill?: string
}

export default function OpeningBracket({ 
  className = "", 
  width = 46, 
  height = 18,
  fill = "#C1A476" 
}: OpeningBracketProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 46 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M30.5 10.5L45.5 17.6603L45.5 0.339749L30.5 7.5L30.5 10.5ZM0.5 9L0.5 10.5L32 10.5L32 9L32 7.5L0.5 7.5L0.5 9Z" 
        fill={fill}
      />
    </svg>
  )
}
