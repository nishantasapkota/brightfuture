"use client"

import { PageHero } from "@/components/public/page-hero"
import { Courses } from "@/components/public/courses"
import { CtaJourney } from "@/components/public/cta-journey"
import { motion } from "framer-motion"
import { BookOpen, Clock, Award, Globe } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-0 bg-white min-h-screen">
      <PageHero
        title={
          <>
            Academic{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Pathways
            </span>
          </>
        }
        description="Explore academic pathways tailored to your interests, career goals, and global ambitions."
        breadcrumbItems={[{ label: "Courses" }]}
        heroImage={{
          src: "/page-headers/hero-main.jpeg",
          alt: "Student exploring academic pathways on a laptop",
        }}
      />

      {/* Stats strip */}
      <section className="border-b border-slate-100 bg-slate-50/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: "200+", label: "Programs Listed", icon: BookOpen },
              { value: "50+", label: "Partner Universities", icon: Globe },
              { value: "98%", label: "Admission Rate", icon: Award },
              { value: "4yr", label: "Avg. Duration", icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 py-8 md:py-10">
                <stat.icon className="h-5 w-5 text-red-500" />
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Courses />

      {/* Why choose us */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-3 py-1 mb-5"
            >
              <Award className="h-3.5 w-3.5 text-red-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Why Study With Us</span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-slate-950 leading-tight"
            >
              We help you{" "}
              <span className="text-red-600">choose right</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Course Matching",
                desc: "We analyze your profile, goals, and budget to recommend the perfect course and university.",
              },
              {
                title: "Application Support",
                desc: "End-to-end help with documents, essays, interviews, and offer negotiations.",
              },
              {
                title: "Visa & Settlement",
                desc: "From visa filing to accommodation booking — we support you until you land.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <span className="text-4xl font-extrabold text-slate-200">0{idx + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaJourney />
    </div>
  )
}
