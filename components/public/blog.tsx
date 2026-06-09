"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Blog as BlogType } from "@/lib/db-utils"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

interface BlogProps {
  initialBlogs?: BlogType[]
  initialTotal?: number
  content?: HomePageContent["blog"]
}

export function Blog({ initialBlogs = [], initialTotal = 0, content }: BlogProps) {
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 3))
  const [loading, setLoading] = useState(false)
  const limit = 3
  const section = content ?? homeDefaultContent.blog
  const reduce = useReducedMotion()

  const fetchBlogs = useCallback(async (pageNum: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/blogs?page=${pageNum}&limit=${limit}`)
      const data = await res.json()
      if (data.blogs) {
        setBlogs(data.blogs)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (page !== 1 || (initialBlogs.length === 0 && initialTotal > 0)) {
      fetchBlogs(page)
    }
  }, [page, fetchBlogs, initialBlogs.length, initialTotal])

  const handlePrev = () => {
    if (page > 1) setPage(p => p - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage(p => p + 1)
  }

  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-600/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
      </div>

      <div className="container relative">
        <div className="mb-16 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 block text-sm font-bold uppercase tracking-widest text-red-400"
          >
            {section.eyebrow}
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold text-white md:text-5xl"
          >
            {section.title}
          </MotionDiv>
          <p className="mx-auto max-w-2xl font-medium text-slate-400">
            {section.description}
          </p>
        </div>

        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-slate-900/50 backdrop-blur-sm" aria-live="polite" aria-busy="true">
              <Loader2 className="h-10 w-10 animate-spin text-red-500" aria-hidden="true" />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <MotionDiv
                    key={blog._id?.toString() || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="block">
                      <div className="relative mb-6 h-64 overflow-hidden rounded-3xl shadow-lg shadow-black/40">
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 font-bold text-white">
                            OPTIMUS BLOG
                          </div>
                        )}
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-red-400 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="mb-6 text-sm text-slate-400 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-400 transition-all group-hover:gap-3">
                        Read More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </MotionDiv>
                ))
              ) : (
                <div className="col-span-full flex h-80 items-center justify-center rounded-[2rem] border-2 border-dashed border-white/10 text-slate-500 font-medium">
                  No articles found.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:text-white"
              onClick={handlePrev}
              disabled={page <= 1 || loading}
              aria-label="Previous page"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:text-white"
              onClick={handleNext}
              disabled={page >= totalPages || loading}
              aria-label="Next page"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
