"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, MapPin, Phone, Send, Clock, MessageCircle } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

type ContactContent = HomePageContent["contact"]

export function Contact({ content }: { content?: ContactContent }) {
  const section = content ?? homeDefaultContent.contact
  const [offices, setOffices] = useState<any[]>([])

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        const res = await fetch("/api/business-details")
        const data = await res.json()
        if (data.details?.offices) {
          setOffices(data.details.offices)
        } else if (data.details?.address) {
          setOffices([{ label: "Head Office", address: data.details.address }])
        } else {
          setOffices([])
        }
      } catch { setOffices([]) }
    }
    fetchBusinessDetails()
  }, [])

  const allPhones = offices.flatMap((o: any) => o.phones || [])
  const allEmails = offices.flatMap((o: any) => o.emails || [])
  const uniquePhones = Array.from(new Set(allPhones)).slice(0, 2)
  const uniqueEmails = Array.from(new Set(allEmails)).slice(0, 2)

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-red-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[5%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 blur-[100px]" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5 text-red-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
              {section.eyebrow}
            </span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 md:text-5xl lg:text-6xl"
          >
            {section.title}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-500 md:text-lg"
          >
            {section.description}
          </MotionDiv>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5"
          >
            {uniquePhones.length > 0 && (
              <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-red-200 hover:bg-white hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</p>
                    <div className="mt-2 space-y-1">
                      {uniquePhones.map((phone: string) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block text-lg font-semibold text-slate-700 transition-colors hover:text-red-600"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {uniqueEmails.length > 0 && (
              <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-red-200 hover:bg-white hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</p>
                    <div className="mt-2 space-y-1">
                      {uniqueEmails.map((email: string) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="block text-sm font-semibold text-slate-700 transition-colors break-all hover:text-red-600 sm:text-base"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {offices.length === 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center">
                <MapPin className="mx-auto h-8 w-8 text-red-400" />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
                  {section.mapStatLabel}
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{section.mapStatValue}</p>
              </div>
            ) : (
              offices.map((office: any, idx: number) => (
                <div
                  key={`${office.label}-${idx}`}
                  className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-red-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900">{office.label || "Office"}</h3>
                      {office.address && (
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                          {office.address}
                        </p>
                      )}
                      {office.phones?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                          {office.phones.map((phone: string) => (
                            <a
                              key={phone}
                              href={`tel:${phone.replace(/\s/g, "")}`}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-red-600"
                            >
                              <Phone className="h-3.5 w-3.5 text-red-500" />
                              {phone}
                            </a>
                          ))}
                        </div>
                      )}
                      {office.emails?.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {office.emails.map((email: string) => (
                            <a
                              key={email}
                              href={`mailto:${email}`}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors break-all hover:text-red-600"
                            >
                              <Mail className="h-3.5 w-3.5 shrink-0 text-red-500" />
                              {email}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <Clock className="h-5 w-5 shrink-0 text-emerald-600" />
              <p className="text-sm font-medium text-slate-500">
                We typically respond within <span className="font-bold text-emerald-600">24 hours</span>.
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl shadow-slate-900/[0.06] md:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

              <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                Send us a message
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Fill out the form and our team will get back to you shortly.
              </p>

              <form className="mt-8 space-y-5" aria-label="Contact form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-[13px] font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[13px] font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      spellCheck={false}
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-[13px] font-semibold text-slate-700">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    placeholder="I need help with..."
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-[13px] font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your goals..."
                    className="w-full resize-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                  />
                </div>

                <Button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-500 py-6 text-[13px] font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:shadow-red-600/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {section.submitLabel}
                    <Send className="h-4 w-4" />
                  </span>
                </Button>
              </form>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
