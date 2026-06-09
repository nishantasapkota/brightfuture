"use client"

import { useEffect, useState } from "react"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { motion, useReducedMotion } from "framer-motion"
import { Quote } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

interface TestimonialData {
  _id: string
  name: string
  designation: string
  description: string
  image: string
}

export function Testimonials({ content }: { content?: HomePageContent["testimonials"] }) {
  return <TestimonialsContent content={content} />
}

function TestimonialsContent({ content }: { content?: HomePageContent["testimonials"] }) {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)
  const section = content ?? homeDefaultContent.testimonials

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#020617] py-24 md:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="mx-auto mb-4 h-4 w-32 animate-pulse rounded-full bg-slate-800"></div>
            <div className="mx-auto h-10 w-64 animate-pulse rounded-xl bg-slate-800"></div>
          </div>
          <div className="mx-auto h-[500px] max-w-5xl animate-pulse rounded-[3rem] bg-slate-900"></div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  const formattedTestimonials = testimonials.map((t) => ({
    quote: t.description,
    name: t.name,
    designation: t.designation,
    src: t.image,
  }))

  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 md:py-32">
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/5 blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-red-400"
          >
            <Quote className="h-4 w-4" />
            <span>{section.eyebrow}</span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            {section.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              {section.titleHighlight}
            </span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg font-medium leading-relaxed text-slate-400"
          >
            {section.description}
          </MotionDiv>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
        </div>
      </div>
    </section>
  )
}
