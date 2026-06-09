"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, MapPin, Compass } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

type DestinationsContent = HomePageContent["destinations"]

export function Destinations({
  content,
  items,
}: {
  content?: DestinationsContent
  items?: DestinationsContent["items"]
}) {
  const destinations = items?.length ? items : content?.items ?? homeDefaultContent.destinations.items
  const eyebrow = content?.eyebrow ?? homeDefaultContent.destinations.eyebrow
  const title = content?.title ?? homeDefaultContent.destinations.title
  const viewAllLabel = content?.viewAllLabel ?? homeDefaultContent.destinations.viewAllLabel
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: destinations.length > 3 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    updateCarouselState()
    emblaApi.on("select", updateCarouselState)
    emblaApi.on("reInit", updateCarouselState)
    return () => {
      emblaApi.off("select", updateCarouselState)
      emblaApi.off("reInit", updateCarouselState)
    }
  }, [emblaApi, updateCarouselState])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/[0.03] blur-[100px]" />
      </div>

      <div className="container relative">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-red-600"
            >
              <Compass className="h-4 w-4" />
              <span>{eyebrow}</span>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl"
            >
              {title}
            </MotionDiv>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Show previous destinations"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Show next destinations"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-5 flex">
            {destinations.map((destination, index) => (
              <div key={destination.name} className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_48%] lg:flex-[0_0_32%]">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group relative h-[420px] overflow-hidden rounded-3xl shadow-xl"
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 88vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                  {/* Glass info card */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2 text-white/70">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Study Destination</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  </div>
                </MotionDiv>
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Show destination slide ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  selectedIndex === index ? "w-10 bg-slate-900" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 transition-colors hover:text-red-600"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
