"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Plane, FileText, MapPin, Bus, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

type FeaturesContent = HomePageContent["features"]

const featureStyles = [
  { icon: Plane, bg: "bg-red-500/10", text: "text-red-400", ring: "ring-red-500/20" },
  { icon: FileText, bg: "bg-purple-500/10", text: "text-purple-400", ring: "ring-purple-500/20" },
  { icon: MapPin, bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20" },
  { icon: Bus, bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20" },
]

export function Features({ content }: { content?: FeaturesContent }) {
  const section = content ?? homeDefaultContent.features
  const services = section.items.map((item, index) => {
    const style = featureStyles[index] ?? featureStyles[0]
    return { ...style, ...item }
  })

  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 md:py-32">
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-600/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-red-400"
          >
            <Sparkles className="h-4 w-4" />
            <span>{section.eyebrow}</span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white md:text-5xl"
          >
            {section.title}
          </MotionDiv>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-400 md:text-lg">
            {section.description}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <MotionDiv
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-start rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
            >
              <div className={`mb-6 rounded-2xl p-4 ${service.bg} ring-1 ${service.ring}`}>
                <service.icon className={`h-8 w-8 ${service.text}`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
              <p className="mb-6 flex-1 leading-relaxed font-medium text-slate-400">
                {service.description}
              </p>
              <Link
                href="/services"
                className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-400 transition-colors group-hover:text-red-300"
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
