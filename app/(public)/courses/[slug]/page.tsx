import { getCourseBySlug, getCourses } from "@/lib/db-utils"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CheckCircle2, ArrowRight, ArrowUpRight, Clock, BookOpen, Award, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params
  let course = null
  let allCourses: any[] = []

  try { course = await getCourseBySlug(slug) } catch (error) { console.error("Failed to fetch course:", error); notFound() }
  if (!course) notFound()

  try { allCourses = await getCourses(10) } catch (error) { console.error("Failed to fetch courses:", error) }

  const sidebarItems = allCourses.filter((c) => c.slug !== slug).map((c) => ({ title: c.name, href: `/courses/${c.slug}`, category: c.category }))

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end overflow-hidden bg-[#020617] pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0a1033_50%,#111827_100%)]" />
          <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(135deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-600/12 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95),rgba(2,6,23,0.7)_60%,transparent)]" />
        </div>

        <div className="container relative z-20">
          <Link href="/courses" className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-[0.15em] text-[11px] mb-6 hover:text-white transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Explore Courses
          </Link>
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-4">
              {course.category || "Program"}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.05]">{course.name}</h1>
            <p className="text-white/55 text-base md:text-lg font-medium max-w-2xl leading-relaxed">{course.shortDescription}</p>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>Full-time</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                <span>Degree Program</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                <Award className="h-4 w-4" />
                <span>Global Recognition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-20 md:py-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16">
          <div className="space-y-14">
            {course.icon && (
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 group">
                <Image src={course.icon} alt={course.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 60vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            )}

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Course Overview</h2>
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-500 prose-li:text-slate-500 prose-strong:text-slate-900" dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>

            {course.highlights && course.highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Course Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.highlights.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg hover:border-red-100 transition-all group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-700 text-sm leading-relaxed pt-1">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 md:p-12 text-white">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-red-600/10 blur-[80px]" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Interested in this course?</h3>
                  <p className="text-white/50">Book a free consultation and let our experts guide your academic journey.</p>
                </div>
                <Link href="/contact">
                  <Button className="h-14 rounded-xl bg-red-600 px-8 text-sm font-bold text-white hover:bg-red-500 shadow-lg shadow-red-600/15 transition-all whitespace-nowrap">
                    Book Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 sticky top-28">
              <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-red-600 rounded-full" />
                Other Courses
              </h3>
              <div className="space-y-2">
                {sidebarItems.map((item, idx) => (
                  <Link key={idx} href={item.href} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-transparent hover:border-red-100 hover:shadow-sm transition-all group"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-600 text-sm group-hover:text-red-600 transition-colors truncate block">{item.title}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-[#020617] text-white relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-red-600/15 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold">Need Guidance?</h4>
                  <p className="text-sm text-white/45 font-medium">Talk to our counselors for personalized course recommendations.</p>
                  <Link href="/contact">
                    <Button className="w-full bg-red-600 hover:bg-red-500 text-white h-12 rounded-xl text-[13px] font-bold shadow-lg shadow-red-600/15 transition-all">
                      GET IN TOUCH
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
