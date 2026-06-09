"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Pause, Play, Users } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

type PartnersContent = HomePageContent["partners"]

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

export function Partners({ content }: { content?: PartnersContent }) {
  const [partners, setPartners] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const section = content ?? homeDefaultContent.partners
  const reduce = useReducedMotion()

  useEffect(() => {
    fetch("/api/partners")
      .then(res => res.json())
      .then(data => {
        if (data.partners) setPartners(data.partners)
      })
  }, [])

  useEffect(() => {
    if (partners.length === 0 || isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [partners, isPaused])

  const allPartners = [...partners, ...partners, ...partners]

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  if (partners.length === 0) return null

  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-28"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Partner universities"
    >
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/[0.03] blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-600 shadow-sm"
          >
            <Users className="h-4 w-4" />
            <span>Our Partners</span>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            {section.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
              {section.titleHighlight}
            </span>{" "}
            {section.titleSuffix}
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-medium leading-relaxed text-slate-500"
          >
            {section.description}
          </MotionDiv>
        </div>
      </div>

      {/* Controls */}
      <div className="container relative z-20 mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setIsPaused(p => !p)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
          aria-label={isPaused ? "Play partner carousel" : "Pause partner carousel"}
        >
          {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden py-10" role="region" aria-roledescription="carousel" aria-label="Partner university logos">
        <div className="container overflow-visible">
          <motion.div
            className="flex items-center gap-6"
            animate={reduce ? undefined : {
              x: `-${currentIndex * (192 + 24)}px`
            }}
            transition={{
              duration: 0.8,
              ease: [0.32, 0.72, 0, 1]
            }}
          >
            {allPartners.map((partner, index) => (
              <div
                key={index}
                className="relative h-28 w-48 flex-shrink-0 group"
                role="group"
                aria-roledescription="slide"
                aria-label={`${partner.name} logo`}
              >
                <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 opacity-70 shadow-sm transition-all duration-500 hover:border-slate-300 hover:bg-white hover:opacity-100 hover:shadow-lg">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={60}
                    className="max-h-full object-contain transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
