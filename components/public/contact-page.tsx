"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  MessageCircle,
  Globe,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  )
}

type ContactContent = HomePageContent["contact"]

export function ContactPageContent({ content }: { content?: ContactContent }) {
  const section = content ?? homeDefaultContent.contact
  const [offices, setOffices] = useState<any[]>([])
  const [submitted, setSubmitted] = useState(false)

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
      } catch {
        setOffices([])
      }
    }
    fetchBusinessDetails()
  }, [])

  const allPhones = offices.flatMap((o: any) => o.phones || [])
  const allEmails = offices.flatMap((o: any) => o.emails || [])
  const uniquePhones = Array.from(new Set(allPhones)).slice(0, 2)
  const uniqueEmails = Array.from(new Set(allEmails)).slice(0, 2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="flex flex-col">
      {/* Contact Info Cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="mb-16 text-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1"
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
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
                Let&apos;s Start Your{" "}
                <span className="text-red-600">Journey</span>
              </h2>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 font-medium leading-relaxed">
                {section.description}
              </p>
            </MotionDiv>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {uniquePhones.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-slate-100 bg-white p-8 text-center hover:border-red-200 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-500"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">
                  Call Us
                </h3>
                <div className="space-y-1.5">
                  {uniquePhones.map((phone: string) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-base font-semibold text-slate-600 hover:text-red-600 transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </MotionDiv>
            )}

            {uniqueEmails.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-slate-100 bg-white p-8 text-center hover:border-red-200 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-500"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">
                  Email Us
                </h3>
                <div className="space-y-1.5">
                  {uniqueEmails.map((email: string) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </MotionDiv>
            )}

            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-slate-100 bg-white p-8 text-center hover:border-red-200 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-500"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">
                Response Time
              </h3>
              <p className="text-base font-semibold text-slate-600">
                Within{" "}
                <span className="text-red-600 font-bold">24 hours</span>
              </p>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                Sun - Fri, 9:00 AM - 6:00 PM
              </p>
            </MotionDiv>
          </div>

          {/* Main Layout: Form + Offices + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Form */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 md:p-10 shadow-xl shadow-slate-900/[0.04]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Send us a message
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  Fill out the form and our team will get back to you shortly.
                </p>

                {submitted ? (
                  <div className="mt-10 flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Message Sent!
                    </h4>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    className="mt-8 space-y-5"
                    aria-label="Contact form"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-name"
                          className="text-[13px] font-semibold text-slate-700"
                        >
                          Full Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your name"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-email"
                          className="text-[13px] font-semibold text-slate-700"
                        >
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          spellCheck={false}
                          required
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-phone"
                        className="text-[13px] font-semibold text-slate-700"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+977 98XXXXXXXX"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-subject"
                        className="text-[13px] font-semibold text-slate-700"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        autoComplete="off"
                        placeholder="I need help with..."
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-message"
                        className="text-[13px] font-semibold text-slate-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your study abroad goals..."
                        required
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[13px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="relative w-full overflow-hidden rounded-xl bg-slate-950 py-6 text-[13px] font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-slate-800 hover:shadow-slate-900/25"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {section.submitLabel}
                        <Send className="h-4 w-4" />
                      </span>
                    </Button>
                  </form>
                )}
              </div>
            </MotionDiv>

            {/* Right Column: Offices + Map + Social */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office Locations */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <h3 className="text-lg font-bold text-slate-900">
                      Our Offices
                    </h3>
                  </div>

                  {offices.length === 0 ? (
                    <div className="text-center py-8">
                      <Globe className="mx-auto h-10 w-10 text-slate-200 mb-3" />
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
                        {section.mapStatLabel}
                      </p>
                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {section.mapStatValue}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {offices.map((office: any, idx: number) => (
                        <div
                          key={`${office.label}-${idx}`}
                          className="group rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
                        >
                          <h4 className="text-sm font-bold text-slate-900 mb-2">
                            {office.label || "Office"}
                          </h4>
                          {office.address && (
                            <p className="text-sm font-medium leading-relaxed text-slate-500 mb-3">
                              {office.address}
                            </p>
                          )}
                          <div className="space-y-2">
                            {office.phones?.length > 0 && (
                              <div className="flex flex-wrap gap-x-3 gap-y-1">
                                {office.phones.map((phone: string) => (
                                  <a
                                    key={phone}
                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
                                  >
                                    <Phone className="h-3 w-3 text-red-500" />
                                    {phone}
                                  </a>
                                ))}
                              </div>
                            )}
                            {office.emails?.length > 0 && (
                              <div className="flex flex-col gap-1">
                                {office.emails.map((email: string) => (
                                  <a
                                    key={email}
                                    href={`mailto:${email}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors break-all"
                                  >
                                    <Mail className="h-3 w-3 shrink-0 text-red-500" />
                                    {email}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </MotionDiv>

              {/* Map Embed */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Globe className="h-5 w-5 text-red-600" />
                    <h3 className="text-lg font-bold text-slate-900">
                      Find Us
                    </h3>
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.234!2d85.324!3d27.717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAxLjIiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1609459200000!5m2!1sen!2snp"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location Map"
                      className="absolute inset-0"
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-400 text-center font-medium">
                    Update this map with your exact location in the code
                  </p>
                </div>
              </MotionDiv>

              {/* Social Links */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border border-slate-100 bg-slate-950 p-6 md:p-8 text-white">
                  <h3 className="text-lg font-bold mb-2">
                    Connect With Us
                  </h3>
                  <p className="text-sm text-white/60 mb-6 font-medium">
                    Follow us for daily tips, success stories, and updates.
                  </p>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Facebook, label: "Facebook" },
                      { icon: Instagram, label: "Instagram" },
                      { icon: Linkedin, label: "LinkedIn" },
                    ].map((social) => (
                      <button
                        key={social.label}
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      >
                        <social.icon className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0a1033_50%,#111827_100%)]" />
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-red-600/8 blur-[120px]" />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Ready to Study{" "}
              <span className="text-red-500">Abroad?</span>
            </h2>
            <p className="text-base md:text-lg text-white/50 font-medium mb-8 max-w-xl mx-auto">
              Book a free consultation and let our experts guide your academic
              journey.
            </p>
            <a
              href="/online-application"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-sm font-bold text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
