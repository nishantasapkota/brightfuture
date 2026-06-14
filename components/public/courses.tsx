"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ArrowRight, Loader2, BookOpen, Clock, Award, GraduationCap, Filter } from "lucide-react"
import type { Course } from "@/lib/db-utils"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface CoursesProps {
  initialCourses?: Course[]
  initialTotal?: number
}

export function Courses({ initialCourses = [], initialTotal = 0 }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses)
  const [page, setPage] = useState(initialCourses.length > 0 ? 1 : 0)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 6))
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [categories, setCategories] = useState<string[]>(["All"])
  const limit = 6

  const hasFetched = useRef(false)

  const fetchCourses = useCallback(async (pageNum: number, append = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/courses?page=${pageNum}&limit=${limit}`)
      const data = await res.json()
      if (data.courses) {
        setCourses((prev) => {
          const newCourses = append ? [...prev, ...data.courses] : data.courses
          // Extract categories
          const cats = Array.from(new Set(newCourses.map((c: Course) => c.category).filter(Boolean)))
          setCategories(["All", ...cats])
          return newCourses
        })
        setTotalPages(data.totalPages)
        setPage(pageNum)
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialCourses.length === 0 && !hasFetched.current) {
      hasFetched.current = true
      fetchCourses(1, false)
    } else if (initialCourses.length > 0) {
      const cats = Array.from(new Set(initialCourses.map((c) => c.category).filter(Boolean)))
      setCategories(["All", ...cats])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredCourses(courses)
    } else {
      setFilteredCourses(courses.filter((c) => c.category === activeCategory))
    }
  }, [activeCategory, courses])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-3 py-1">
                <BookOpen className="h-3.5 w-3.5 text-red-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">Our Expertise</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 max-w-3xl tracking-tight leading-tight">
                Find the course that{" "}
                <span className="text-red-600">matches your future</span>
              </h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">Programs</p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {courses.length} listed
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-slate-500 text-base md:text-lg font-medium">
            Explore curated programs, compare pathways, and get expert support to choose the right academic direction.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-slate-950 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <Loader2 className="h-10 w-10 animate-spin text-red-600" />
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory + page}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <motion.div 
                    key={course._id?.toString() || index} 
                    variants={itemVariants}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-red-100"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {course.icon ? (
                        <Image 
                          src={course.icon} 
                          alt={course.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
                          <span className="text-white font-bold text-xl px-6 text-center">{course.name}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                        {course.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-tight">
                        {course.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
                        {course.shortDescription}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(course.highlights || []).slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                          >
                            <Award className="h-3 w-3 text-red-500" />
                            {item}
                          </span>
                        ))}
                        {(course.highlights || []).length === 0 && (
                          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                            Personalized guidance
                          </span>
                        )}
                      </div>
                      <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100">
                        <Link 
                          href={`/courses/${course.slug}`} 
                          className="inline-flex items-center gap-2 text-sm font-bold text-red-600 group/link transition-colors"
                        >
                          Explore Course
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          <GraduationCap className="h-3.5 w-3.5" />
                          <span>Degree</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full h-80 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <BookOpen className="h-12 w-12 text-slate-300 mb-4" />
                  <p className="text-slate-400 font-medium">No courses found in this category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {page < totalPages && activeCategory === "All" && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => fetchCourses(page + 1, true)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full px-8 h-12 bg-slate-950 text-white text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load more
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
