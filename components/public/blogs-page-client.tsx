"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Search, BookOpen, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { PageHero } from "@/components/public/page-hero"
import { cn } from "@/lib/utils"

export function BlogsPageClient() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 9

  useEffect(() => {
    setLoading(true)
    fetch(`/api/blogs?page=${page}&limit=${limit}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs) {
          setBlogs(data.blogs)
          setTotalPages(data.totalPages)
          setTotal(data.total)
        }
      })
      .finally(() => setLoading(false))
  }, [page, search])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleClearSearch = () => {
    setSearchInput("")
    setSearch("")
    setPage(1)
  }

  const featured = blogs[0]
  const rest = blogs.slice(1)

  return (
    <div className="flex min-h-screen flex-col gap-0 bg-white">
      <PageHero
        title={
          <>
            Insights for{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Global Success.
            </span>
          </>
        }
        description="Stay ahead with the latest trends, university updates, and scholarship opportunities curated by our experts."
        breadcrumbItems={[{ label: "Knowledge Hub" }]}
        badge="Global Knowledge Hub"
        heroImage={{
          src: "/page-headers/hero-gallery.jpeg",
          alt: "Student using digital channels for Bright Future Edu updates",
        }}
      />

      {/* Stats strip */}
      <section className="border-b border-slate-100 bg-slate-50/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-slate-100">
            {[
              { value: total.toString(), label: "Total Articles", icon: BookOpen },
              { value: "Weekly", label: "Fresh Updates", icon: Clock },
              { value: "Expert", label: "Curated Content", icon: Tag },
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

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container">
          {/* Header & Search */}
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-5">
                <BookOpen className="h-3.5 w-3.5 text-red-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Expert Resources</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
                Latest from{" "}
                <span className="text-red-600">Bright Future Insights</span>
              </h2>
              <p className="mt-4 text-base text-slate-500 font-medium leading-relaxed">
                Practical guides, visa tips, and study abroad news from our education experts.
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search articles..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100 md:w-64"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="h-11 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800"
              >
                Search
              </Button>
              {search && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {loading ? (
            <div className="space-y-12">
              {/* Featured skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
                <div className="aspect-[16/10] rounded-2xl bg-slate-100" />
                <div className="space-y-4 py-4">
                  <div className="h-4 w-24 bg-slate-100 rounded-full" />
                  <div className="h-10 w-full bg-slate-100 rounded-xl" />
                  <div className="h-10 w-3/4 bg-slate-100 rounded-xl" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
                </div>
              </div>
              {/* Grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4 animate-pulse">
                    <div className="aspect-[4/3] rounded-2xl bg-slate-100" />
                    <div className="h-4 w-24 bg-slate-100 rounded-full" />
                    <div className="h-6 w-full bg-slate-100 rounded-lg" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featured && !search && page === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  <Link href={`/blogs/${featured.slug}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
                        {featured.featuredImage ? (
                          <Image
                            src={featured.featuredImage}
                            alt={featured.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                          />
                        ) : (
                          <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/10" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                            <Calendar className="h-3 w-3 text-red-500" />
                            {new Date(featured.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600">
                            Featured
                          </span>
                          {featured.tags?.[0] && (
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                              {featured.tags[0]}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-950 leading-tight group-hover:text-red-600 transition-colors duration-300">
                          {featured.title}
                        </h3>
                        <p className="text-base text-slate-500 font-medium leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-red-600 text-sm font-bold group-hover:gap-4 transition-all duration-300">
                          Read Article <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Blog Grid */}
              {rest.length > 0 || (search || page > 1) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(search || page > 1 ? blogs : rest).map((blog, idx) => (
                    <motion.div
                      key={blog._id || idx}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                    >
                      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                        <div className="flex flex-col h-full rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-lg hover:shadow-slate-900/5 hover:border-slate-200 transition-all duration-500">
                          {/* Image */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                            {blog.featuredImage ? (
                              <Image
                                src={blog.featuredImage}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-white/10" />
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                                <Calendar className="h-3 w-3 text-red-500" />
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6 space-y-4">
                            {blog.tags && blog.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {blog.tags.slice(0, 2).map((tag: string, tidx: number) => (
                                  <span
                                    key={tidx}
                                    className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-100"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <h3 className="text-lg font-bold text-slate-950 group-hover:text-red-600 transition-colors duration-300 leading-snug line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                              Read <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : null}

              {/* Pagination */}
              {!loading && blogs.length > 0 && totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={cn(
                          "h-10 w-10 rounded-xl text-xs font-bold transition-all",
                          page === i + 1
                            ? "bg-slate-950 text-white shadow-md"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && blogs.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-16 text-center">
                  <BookOpen className="w-14 h-14 text-slate-300 mx-auto mb-5" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {search ? "No matches found" : "No Insights Yet"}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
                    {search
                      ? `Searching for "${search}" didn't return any results.`
                      : "We're currently drafting new strategic updates for you. Stay tuned!"}
                  </p>
                  {search && (
                    <Button
                      onClick={handleClearSearch}
                      variant="outline"
                      className="mt-6 rounded-xl px-6 h-11 text-xs font-bold"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
