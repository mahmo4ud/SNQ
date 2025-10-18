"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useT } from "@/app/i18n/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function ContactForm() {
  const { t, i18n } = useT("contactUs")
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  
  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: direction === 'rtl' ? "الاسم يجب أن يكون على الأقل 2 أحرف. *" : "Name must be at least 2 characters. *",
    }),
    phone: z.string().min(10, {
      message: direction === 'rtl' ? "رقم الهاتف يجب أن يكون على الأقل 10 أحرف. *" : "Phone number must be at least 10 characters. *",
    }),
    email: z.string().email({
      message: direction === 'rtl' ? "البريد الالكتروني يجب أن يكون صحيح. *" : "Please enter a valid email address. *",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    alert(t("form.successMessage") || "Message sent successfully!")
    form.reset()
  }

  return (
    <div className="xl:w-1/2 lg:w-2/3 md:w-3/4 w-full mx-auto rounded-2xl p-6 md:p-8 border border-gray-200" style={{ backgroundColor: '#FCFCFC' }}>
      <h2 className="text-xl md:text-2xl font-bold text-gold mb-6 text-center" dir={direction}>
        {t("subtitle")}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir={direction}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder={t("form.namePlaceholder")} 
                    {...field}
                    className={`${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
          
          <button
            type="submit"
            className="w-full cursor-pointer bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            {t("form.submit")}
          </button>
        </form>
      </Form>
    </div>
  )
}
