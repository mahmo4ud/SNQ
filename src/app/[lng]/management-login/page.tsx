"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from "@/../public/vertical-logo.png"
import PageBg from "@/../public/white-bg.png"
import { useT } from '@/app/i18n/client'


export default function ManagementLoginPage() {
  const { t, i18n } = useT("managementLogin")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt with:', { email, password })
    // Add your login logic here
  }

  return (
    <section className="h-[calc(100vh-70px)] relative flex flex-col gap-10 items-center justify-center py-12 px-4" dir={direction}>
      <h1 className='relative z-15 text-xl text-red-500'>* مازال تحت التطوير *</h1>
      <Image src={PageBg} alt="Background" fill priority/>
      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
              <Image 
                src={Logo} 
                alt="SNQ Lawyers & Legal Consultants" 
                width={220}
                className="object-contain"
              />
          </div>

          {/* Login Title */}
          <h2 className="text-2xl font-bold text-center text-primary mb-8">
            {t("title")}
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                dir={direction}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                dir={direction}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              {t("submitButton")}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
