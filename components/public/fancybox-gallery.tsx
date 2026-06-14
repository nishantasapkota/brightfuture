"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, Pause } from "lucide-react"

interface GalleryImage {
  _id: string
  title: string
  description?: string
  imageUrl: string
  category?: string
}

interface FancyboxGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  gap?: number
}

export function FancyboxGallery({ images, columns = 3, gap = 16 }: FancyboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const slideshowRef = useRef<NodeJS.Timeout | null>(null)

  const open = useCallback((index: number) => {
    setSelectedIndex(index)
    setIsPlaying(false)
    document.body.style.overflow = "hidden"
  }, [])

  const close = useCallback(() => {
    setSelectedIndex(null)
    setIsPlaying(false)
    if (slideshowRef.current) clearInterval(slideshowRef.current)
    document.body.style.overflow = ""
  }, [])

  const next = useCallback(() => {
    if (selectedIndex === null) return
    setDirection(1)
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length))
  }, [selectedIndex, images.length])

  const prev = useCallback(() => {
    if (selectedIndex === null) return
    setDirection(-1)
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length))
  }, [selectedIndex, images.length])

  const toggleSlideshow = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  useEffect(() => {
    if (isPlaying && selectedIndex !== null) {
      slideshowRef.current = setInterval(() => {
        setDirection(1)
        setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length))
      }, 3000)
    } else {
      if (slideshowRef.current) clearInterval(slideshowRef.current)
    }
    return () => {
      if (slideshowRef.current) clearInterval(slideshowRef.current)
    }
  }, [isPlaying, selectedIndex, images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
      if (e.key === " ") { e.preventDefault(); toggleSlideshow() }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedIndex, close, next, prev, toggleSlideshow])

  if (images.length === 0) return null

  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 4
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3"

  return (
    <>
      {/* Grid */}
      <div className={`grid ${colClass}`} style={{ gap }}>
        {images.map((img, idx) => (
          <motion.div
            key={img._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-slate-100 aspect-square"
            onClick={() => open(idx)}
          >
            <Image
              src={img.imageUrl}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes={`(min-width: 1024px) ${100 / columns}vw, (min-width: 640px) 33vw, 50vw`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-center p-4">
                <ZoomIn className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-sm line-clamp-1">{img.title}</p>
                {img.category && (
                  <span className="text-white/70 text-xs mt-1 inline-block">{img.category}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" />

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Slideshow Play/Pause button */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleSlideshow() }}
                className={`absolute top-4 right-20 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isPlaying ? "bg-red-600 text-white hover:bg-red-700" : "bg-white/10 text-white hover:bg-white/20"}`}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>
            )}

            {/* Counter */}
            <div className="absolute top-4 left-4 z-50 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Slideshow progress bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 z-50 h-1 bg-white/10">
                <motion.div
                  className="h-full bg-red-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  key={selectedIndex}
                />
              </div>
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.85, x: direction * 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: direction * -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 mx-auto max-w-[90vw] max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={images[selectedIndex].imageUrl}
                  alt={images[selectedIndex].title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white">{images[selectedIndex].title}</h3>
                {images[selectedIndex].description && (
                  <p className="mt-1 text-sm text-white/60 max-w-md mx-auto">{images[selectedIndex].description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
