"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from "@/../public/vertical-logo.png"
import PageBg from "@/../public/white-bg.png"
import { useT } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'
import { login } from '@/query/auth/login'


export default function ManagementLoginPage() {
  const { t, i18n } = useT("managementLogin")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        // Redirect to articles management page
        router.push(`/${i18n.language}/admin/articles`)
      } else {
        setError(i18n.language === 'ar' ? result.messageAr : result.messageEn)
      }
    } catch (_err) {
      setError(i18n.language === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="h-screen relative flex flex-col items-center justify-center py-12 px-4" dir={direction}>
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" dir={direction}>
              {error}
            </div>
          )}

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
              disabled={loading}
              className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (i18n.language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...') : t("submitButton")}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
