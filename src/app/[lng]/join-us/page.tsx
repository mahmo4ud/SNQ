"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useT } from '@/app/i18n/client'
import HeroTitle from '@/components/hero-title'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Page() {
  const { t, i18n } = useT("joinUs")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState<string>("")
  
  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: direction === 'rtl' ? 'الاسم يجب أن يحتوي على 2 أحرف على الأقل *' : 'Name must be at least 2 characters. *',
    }),
    email: z.string().email({
      message: direction === 'rtl' ? 'البريد الإلكتروني يجب أن يكون صحيحًا *' : 'Email must be a valid email address. *',
    }),
    phone: z.string().min(10, {
      message: direction === 'rtl' ? 'رقم الهاتف يجب أن يحتوي على 10 أحرف على الأقل *' : 'Phone number must be at least 10 characters. *',
    }),
    jobTitle: z.string().min(2, {
      message: direction === 'rtl' ? 'المسمى الوظيفي يجب أن يحتوي على 2 أحرف على الأقل *' : 'Job title must be at least 2 characters. *',
    }),
    message: z.string().min(10, {
      message: direction === 'rtl' ? 'الرسالة يجب أن تحتوي على 10 أحرف على الأقل *' : 'Message must be at least 10 characters. *',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      message: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setSelectedFile(file)
        setCvError("") // Clear error when valid file is selected
      } else {
        alert(t("form.pdfOnly") || "Please upload PDF files only")
      }
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate CV file upload
    if (!selectedFile) {
      setCvError(direction === 'rtl' ? 'الرجاء تحميل السيرة الذاتية (PDF) *' : 'Please upload your CV (PDF) *')
      return
    }

    console.log(values)
    console.log('CV File:', selectedFile)
    alert(t("form.successMessage") || "Application submitted successfully!")
    form.reset()
    setSelectedFile(null)
    setCvError("")
  }

  return (
    <>
      {/* Hero Section */}
      <HeroTitle>{t("title")}</HeroTitle>

      {/* Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="xl:w-1/2 lg:w-2/3 md:w-3/4 w-11/12 mx-auto">
          <div className="rounded-2xl p-6 md:p-8 border border-gray-200" style={{ backgroundColor: '#FCFCFC' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={direction}>
                
                {/* Row 1: Name and Job Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label className={`font-medium text-gray-500 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {t("form.nameLabel")}<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input 
                            placeholder={t("form.namePlaceholder")} 
                            {...field}
                            className={direction === 'rtl' ? 'text-right' : 'text-left'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Job Title Field */}
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <Label className={`font-medium text-gray-500 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {t("form.jobTitleLabel")}
                        </Label>
                        <FormControl>
                          <Input 
                            placeholder={t("form.jobTitlePlaceholder")} 
                            {...field}
                            className={direction === 'rtl' ? 'text-right' : 'text-left'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 2: Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label className={`font-medium text-gray-500 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {t("form.emailLabel")}<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder={t("form.emailPlaceholder")} 
                            {...field}
                            className={direction === 'rtl' ? 'text-right' : 'text-left'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <Label className={`font-medium text-gray-500 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {t("form.phoneLabel")}<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder={t("form.phonePlaceholder")} 
                            {...field}
                            className={direction === 'rtl' ? 'text-right' : 'text-left'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 4: CV Upload */}
                <div>
                  <Label className={`font-medium text-gray-500 mb-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {t("form.cvLabel")}<span className="text-red-500">*</span>
                  </Label>
                  <div className="space-y-2">
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="cv-upload"
                      className={`flex h-12 w-full cursor-pointer items-center rounded-lg border ${
                        cvError ? 'border-red-500' : 'border-gray-300'
                      } bg-white px-4 py-3 text-sm text-gray-400 hover:border-primary hover:border-3 hover:bg-gray-50 transition-colors justify-center`}
                    >
                      {selectedFile ? selectedFile.name : t("form.uploadPlaceholder")}
                    </Label>
                    {cvError && (
                      <p className={`text-sm font-medium text-destructive ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {cvError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-base h-12"
                >
                  {t("form.submit")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}