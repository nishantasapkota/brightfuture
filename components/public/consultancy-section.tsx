"use client"

import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { Users, BookOpen, FileCheck, ChevronDown, Sparkles, CheckCircle2, ArrowRight, Award, Globe, Clock } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

type ConsultancyContent = HomePageContent["consultancy"]

const statIcons = [Award, Globe, Clock]
const statColors = ["text-red-400", "text-purple-400", "text-emerald-400"]
const statBg = ["bg-red-500/10", "bg-purple-500/10", "bg-emerald-500/10"]

const highlights = [
  {
    text: "Free initial consultation & profile assessment",
  },
  {
    text: "700+ partner universities worldwide",
  },
  {
    text: "End-to-end visa & documentation support",
  },
  {
    text: "IELTS, PTE & Duolingo test preparation",
  },
  {
    text: "Pre-departure & post-arrival assistance",
  },
]

export function ConsultancySection({ content }: { content?: ConsultancyContent }) {
  const section = content ?? homeDefaultContent.consultancy

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/[0.02] blur-[100px]" />
      </div>

      <div className="container relative">
        {/* Top: Centered editorial header */}
        <div className="mx-auto max-w-4xl text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-red-600">
              <Sparkles className="h-4 w-4" />
              <span>{section.eyebrow}</span>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              {section.title}
            </h2>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
              {section.description}
            </p>
          </MotionDiv>
        </div>

        {/* Stats Strip — dark contrast band */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-[#020617] px-8 py-10 shadow-2xl shadow-slate-900/20 md:px-12 md:py-12">
            {/* Inner glow */}
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-red-600/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-rose-500/5 blur-[60px]" />

            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
              {section.stats.map((stat, index) => {
                const Icon = statIcons[index] ?? Users
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-4 text-center"
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${statBg[index]} ${statColors[index]}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-4xl font-extrabold text-white md:text-5xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </MotionDiv>

        {/* Bottom: Highlights + Form in asymmetric two-column */}
        <div className="mt-20 grid items-start gap-16 lg:grid-cols-12">
          {/* Left: Value propositions */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:pt-4"
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Why students trust us
            </h3>

            <div className="mt-8 space-y-5">
              {highlights.map((item, i) => (
                <MotionDiv
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-red-600" />
                  </div>
                  <p className="text-base font-medium text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </MotionDiv>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-600 transition-colors hover:text-red-700"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </MotionDiv>

          {/* Right: Premium form card */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-10">
              {/* Top gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-red-500" />

              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{section.formTitle}</h3>
                </div>
              </div>

              <p className="mt-2 mb-8 font-medium text-slate-500">
                {section.formDescription}
              </p>

              <form className="space-y-4" aria-label="Consultation form">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="consult-name" className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input
                      id="consult-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your Name"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="consult-email" className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input
                      id="consult-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your Email"
                      spellCheck={false}
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="consult-phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input
                      id="consult-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Phone"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="consult-subject" className="text-sm font-semibold text-slate-700">Choose Subject</label>
                    <div className="relative">
                      <select
                        id="consult-subject"
                        name="subject"
                        autoComplete="off"
                        className="w-full appearance-none rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 pr-10 text-sm text-slate-900 outline-none transition-all focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                        style={{ colorScheme: "light" }}
                      >
                        <option value="">Select Subject…</option>
                        <option value="visa">Visa Consultation</option>
                        <option value="admissions">Admissions</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="consult-message" className="text-sm font-semibold text-slate-700">Message</label>
                  <textarea
                    id="consult-message"
                    name="message"
                    rows={4}
                    placeholder="Your Message…"
                    className="w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-200 focus:bg-white focus:ring-2 focus:ring-red-500/10"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 py-6 text-lg font-bold text-white shadow-xl shadow-red-600/15 transition-all hover:shadow-red-600/25"
                >
                  {section.formButtonLabel}
                </Button>
              </form>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
