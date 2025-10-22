import React from 'react'
import Image from 'next/image'
import MobileLogo from '@/../public/mobile-logo.png'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullScreen?: boolean
  className?: string
}

export default function Spinner({ 
  size = 'md', 
  fullScreen = false,
  className = '' 
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const spinner = (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bigBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}} />
      <div
        className={`flex flex-col items-center gap-3 ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div className={sizeClasses[size]}>
          <Image 
            src={MobileLogo} 
            alt="Loading" 
            className="w-full h-full object-contain opacity-70"
            priority
          />
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-primary rounded-full" style={{ animation: 'bigBounce 1s ease-in-out infinite', animationDelay: '-0.45s' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full" style={{ animation: 'bigBounce 1s ease-in-out infinite', animationDelay: '-0.3s' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full" style={{ animation: 'bigBounce 1s ease-in-out infinite', animationDelay: '-0.15s' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full" style={{ animation: 'bigBounce 1s ease-in-out infinite', animationDelay: '0s' }}></span>
        </div>
      </div>
    </>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

// Loading overlay component for wrapping content
export function LoadingOverlay({ 
  isLoading, 
  children,
  size = 'md'
}: { 
  isLoading: boolean
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <Spinner size={size} />
        </div>
      )}
    </div>
  )
}

// Page loader component
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" />
      </div>
    </div>
  )
}
