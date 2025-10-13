interface ClosingBracketProps {
  className?: string
  width?: number
  height?: number
  fill?: string
}

export default function ClosingBracket({ 
  className = "", 
  width = 46, 
  height = 18,
  fill = "#C1A476" 
}: ClosingBracketProps) {
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
        d="M15.5 10.5L0.500001 17.6603L0.499999 0.339749L15.5 7.5L15.5 10.5ZM45.5 9L45.5 10.5L14 10.5L14 9L14 7.5L45.5 7.5L45.5 9Z" 
        fill={fill}
      />
    </svg>
  )
}
