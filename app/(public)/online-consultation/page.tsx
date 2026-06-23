"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"

export default function OnlineConsultationPage() {
  return (
    <div className="flex flex-col gap-0 bg-white">
      <PageHero
        title={
          <>
            Virtual{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Consultation
            </span>
          </>
        }
        description="Connect with our global consultants from anywhere in the world. Expert guidance delivered directly to you."
        breadcrumbItems={[{ label: "Virtual Consultation" }]}
        badge="Global Virtual Connect"
        heroImage={{ src: "/page-headers/hero-contact.jpeg", alt: "Student receiving online consultation" }}
      />

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Consultation Protocol</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-8">
                Why Book a Strategy Session?
              </h2>

              <div className="space-y-5">
                {[
                  "Direct access to University-certified admission experts",
                  "Comprehensive scholarship eligibility evaluation",
                  "High-precision visa documentation strategy",
                  "Tailored academic mapping for global institutions",
                  "Instant clarification on complex admission protocols",
                  "Priority processing for verified participants"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-600"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-slate-500 font-medium text-[15px] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h4 className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-tight mb-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-red-600" />
                    Verified Expertise
                  </h4>
                  <p className="text-slate-500 text-sm font-medium">Bright Future Edu consultations are conducted by certified professionals with a minimum of 8 years in international academic affairs.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[520px] rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5"
            >
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format&fit=crop"
                alt="Online Consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-[11px] uppercase tracking-widest">Bright Future Edu Education</h5>
                    <p className="text-white/60 font-medium text-xs">Real-time Global Connectivity</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm font-medium leading-relaxed italic">"Our goal is to erase the boundaries between you and your global education. Strategic consultation is the first step."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-100"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Get Started</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Secure Your Session</h2>
              <p className="text-slate-500 text-sm font-medium">Fill the brief below and we will get back to you within 24 hours.</p>
            </div>

            <form className="space-y-5 bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Full Legal Name</label>
                  <Input placeholder="e.g. Liam Anderson" className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 focus:bg-white focus:border-red-200 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Email Address</label>
                  <Input type="email" placeholder="e.g. liam@example.com" className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 focus:bg-white focus:border-red-200 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Subject</label>
                <Input placeholder="e.g. University Mapping, Visa Strategy" className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 focus:bg-white focus:border-red-200 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Message</label>
                <Textarea placeholder="Describe your academic background and global targets..." rows={5}
                  className="bg-slate-50 rounded-xl border-slate-100 p-4 text-sm text-slate-900 focus:bg-white focus:border-red-200 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <Button className="w-full bg-red-600 hover:bg-red-500 text-white h-14 rounded-xl text-[13px] font-bold shadow-lg shadow-red-600/15 transition-all flex items-center justify-center gap-2 group"
                >
                  INITIATE CONTACT
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <div className="mt-6 flex items-center justify-center gap-6 border-t border-slate-50 pt-6"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">256-Bit Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Global Priority</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
