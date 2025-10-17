"use client"
import React from 'react'
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

export default function Page() {
  const { t, i18n } = useT("contactUs")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  
  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: direction === 'rtl' ? 'الاسم يجب أن يحتوي على 2 أحرف على الأقل *' : 'Name must be at least 2 characters.',
    }),
    phone: z.string().min(10, {
      message: direction === 'rtl' ? 'رقم الهاتف يجب أن يحتوي على 10 أحرف على الأقل *' : 'Phone number must be at least 10 characters.',
    }),
    email: z.string().email({
      message: direction === 'rtl' ? 'البريد الإلكتروني يجب أن يكون صحيحًا *' : 'Please enter a valid email address.',
    }),
    message: z.string().min(10, {
      message: direction === 'rtl' ? 'الرسالة يجب أن تحتوي على 10 أحرف على الأقل *' : 'Message must be at least 10 characters.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    alert(t("form.successMessage") || "Message sent successfully!")
    form.reset()
  }

  return (
    <>
      {/* Hero Section with Automatic Breadcrumb */}
      <HeroTitle>{t("title")}</HeroTitle>

      {/* Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="xl:w-1/2 lg:w-2/3 md:w-3/4 w-11/12 mx-auto">
          

          {/* Form */}
          <div className="rounded-2xl p-6 md:p-8 border border-gray-200" style={{ backgroundColor: '#FCFCFC' }}>
            {/* Section Title */}
            <div className="text-center mb-8" dir={direction}>
              <h2 className="text-2xl md:text-3xl font-bold text-gold mb-2">
                {t("sectionTitle")}
              </h2>
              <p className="text-gray-500 font-medium">
                {t("sectionSubtitle")}
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={direction}>
                
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
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

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
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

                {/* Row 2: Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
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

                {/* Row 3: Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder={t("form.messagePlaceholder")}
                          className={`flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-base"
                >
                  {t("form.submit")}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}