import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, GraduationCap, MapPin, Quote, Star, Trophy } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"
import { Button } from "@/components/ui/button"
import { getTestimonials, type Testimonial } from "@/lib/db-utils"

export const dynamic = "force-dynamic"

type Story = { _id: string; name: string; designation: string; description: string; image: string }

const fallbackStories: Story[] = [
  { _id: "f1", name: "Aarav Sharma", designation: "Master's student, Australia", description: "Optimus Global helped me shortlist universities, prepare documents, and walk into my interview with confidence. The process felt clear from the first counselling session.", image: "/placeholder-user.jpg" },
  { _id: "f2", name: "Sneha Gurung", designation: "Bachelor's student, Canada", description: "The team guided my SOP, scholarship planning, and visa file step by step. I always knew what was pending and what to prepare next.", image: "/placeholder-user.jpg" },
  { _id: "f3", name: "Bikash Thapa", designation: "IELTS and admissions success", description: "From test preparation to final offer letter, their support made a complicated journey manageable. I recommend them to students who want honest guidance.", image: "/placeholder-user.jpg" },
]

const highlights = [
  { label: "Student-first counselling", value: "1:1", icon: GraduationCap },
  { label: "Destination guidance", value: "4+", icon: MapPin },
  { label: "Application support", value: "End-to-end", icon: CheckCircle2 },
  { label: "Trusted outcomes", value: "Proven", icon: Trophy },
]

const journeySteps = [
  "Profile assessment and destination matching",
  "University, course, and scholarship shortlisting",
  "SOP, documentation, and application review",
  "Interview, visa, and pre-departure preparation",
]

function serializeStory(story: Testimonial): Story {
  return { _id: story._id?.toString() ?? story.name, name: story.name, designation: story.designation, description: story.description, image: story.image || "/placeholder-user.jpg" }
}

export default async function SuccessStoriesPage() {
  let stories = fallbackStories
  try {
    const testimonials = await getTestimonials()
    if (testimonials.length > 0) stories = testimonials.map(serializeStory)
  } catch (error) { console.error("Failed to fetch success stories:", error) }

  const featuredStory = stories[0]
  const storyGrid = stories.slice(0, 9)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHero
        badge="Student Success Stories"
        title={
          <>
            Real journeys.{" "}
            <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">Global outcomes.</span>
          </>
        }
        description="Meet students who turned careful planning, strong applications, and steady guidance into admission and study abroad milestones."
        breadcrumbItems={[{ label: "Success Stories" }]}
        heroImage={{ src: "/page-headers/student-orange.png", alt: "Successful student" }}
      />

      {/* Why It Matters */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Why It Matters</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Every result starts with a student, a plan, and the right support.
              </h2>
              <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                These stories reflect the counselling, documentation, test preparation, and visa support
                that help students move from uncertainty to a clear international education pathway.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Admissions", "Visa guidance", "Scholarships", "Pre-departure"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">{item}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Featured Story</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">Confidence built step by step.</h2>
            </div>
            <Link href="/online-consultation">
              <Button className="h-11 rounded-xl bg-slate-900 px-6 text-[13px] font-bold text-white hover:bg-slate-800">
                Start Counselling <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/[0.04]">
            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="bg-[#020617] p-6 text-white relative">
                <div className="relative mx-auto aspect-[4/5] max-h-[320px] overflow-hidden rounded-xl bg-white/5"
                >
                  <Image src={featuredStory.image} alt={featuredStory.name} fill className="object-cover" sizes="(min-width: 1024px) 280px, 80vw" />
                </div>
                <div className="pt-5">
                  <p className="text-lg font-bold">{featuredStory.name}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">{featuredStory.designation}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <Quote className="h-8 w-8 text-red-600" />
                <p className="mt-5 max-w-3xl text-lg md:text-xl font-semibold leading-relaxed text-slate-800">
                  {featuredStory.description}
                </p>
                <div className="mt-6 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Student Voices</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">More paths, more possibilities.</h2>
            <p className="mt-4 text-base text-slate-500 font-medium">
              Browse the experiences of students who trusted Optimus Global.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {storyGrid.map((story) => (
              <article key={story._id} className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image src={story.image} alt={story.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{story.name}</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{story.designation}</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-sm font-medium leading-relaxed text-slate-500">{story.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Optimus Method */}
      <section className="bg-[#020617] py-16 md:py-24 text-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-300">The Optimus Method</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">A clearer journey from profile to departure.</h2>
              <p className="mt-5 text-base text-white/45 font-medium leading-relaxed">
                Success stories are built through practical milestones, transparent communication, and careful review at every stage.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {journeySteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-[11px] font-bold shadow-lg shadow-red-600/10"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 text-sm font-semibold leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaJourney />
    </div>
  )
}
