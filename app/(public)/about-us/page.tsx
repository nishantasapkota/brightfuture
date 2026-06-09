"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Target, Gem, Eye } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"
import { FounderSpotlight } from "@/components/public/founder-spotlight"
import { aboutDefaultContent, founderDefaultContent, mergeAboutContent, mergeFounderContent } from "@/lib/page-content"

export default function AboutUsPage() {
  const [bodMembers, setBodMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState(aboutDefaultContent)
  const [founderContent, setFounderContent] = useState(founderDefaultContent)

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/api/bod")
        .then((res) => res.json())
        .then((data) => {
          if (data.members) setBodMembers(data.members)
        })
        .catch((err) => console.error("Error fetching BOD members:", err))
        .finally(() => setLoading(false))
    }
  }, [])

  useEffect(() => {
    fetch("/api/pages/about")
      .then((res) => res.json())
      .then((data) => {
        if (data?.content) {
          setContent(mergeAboutContent(data.content))
        }
      })
      .catch((err) => console.error("Error fetching about page content:", err))
  }, [])

  useEffect(() => {
    fetch("/api/pages/founder")
      .then((res) => res.json())
      .then((data) => {
        if (data?.content) {
          setFounderContent(mergeFounderContent(data.content))
        }
      })
      .catch((err) => console.error("Error fetching founder page content:", err))
  }, [])

  return (
    <div className="flex flex-col gap-0 bg-white min-h-screen text-slate-900">
      <PageHero
        badge={content.hero.badge}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbItems={[{ label: "About Us" }]}
        heroImage={{
          src: "/page-headers/student-orange.png",
          alt: "Smiling international student",
        }}
      />

      {/* Our Story — editorial dark band */}
      <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32 text-white">
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-red-500 mb-6">
              {content.story.eyebrow}
            </span>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {content.story.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mt-10 inline-flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm sm:flex-row"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              {content.story.focusLabel}
            </span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span className="text-base font-semibold text-white/90">
              {content.story.focusText}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-3xl space-y-8 text-center text-base font-medium leading-relaxed text-white/60 md:text-lg"
          >
            {content.story.paragraphs.map((paragraph: string, index: number) => (
              <p key={`story-p-${index}`}>{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Building Connections Section */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="border-y border-slate-200 py-8 lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:py-10"
            >
              <div>
                <p className="mb-6 w-fit border-l-2 border-red-600 bg-red-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                  {content.whoWeAre.eyebrow}
                </p>
                <h2 className="max-w-xl text-3xl font-bold leading-[1.04] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                  {content.whoWeAre.titlePrimary} <span className="text-red-600">{content.whoWeAre.titleAccent}</span>
                </h2>
              </div>
              <p className="mt-8 max-w-xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
                {content.whoWeAre.description}
              </p>
              <div className="mt-10 grid gap-2 sm:grid-cols-2">
                {content.whoWeAre.tags.map((tag: string, index: number) => (
                  <span
                    key={`${tag}-${index}`}
                    className="border border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative lg:col-span-7"
            >
              <div className="grid min-h-[560px] gap-4 md:grid-cols-[0.72fr_1fr]">
                <div className="flex flex-col gap-4">
                  <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-t-[4rem]">
                    <Image src="/destinations/germany.png" alt="Germany" fill className="object-cover" />
                  </div>
                  <div className="bg-slate-950 p-6 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">{content.whoWeAre.promiseTitle}</p>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-white/90">{content.whoWeAre.promiseText}</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="relative min-h-[340px] overflow-hidden">
                    <Image src="/destinations/australia.png" alt="Australia" fill className="object-cover" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
                    <div className="relative min-h-[180px] overflow-hidden">
                      <Image src="/destinations/canada.png" alt="Canada" fill className="object-cover" />
                    </div>
                    <div className="flex items-end bg-red-600 p-5 text-white">
                      <p className="text-sm font-bold leading-snug">
                        {content.whoWeAre.titlePrimary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video/Image Hero Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container">
          <div className="relative h-[440px] md:h-[520px] w-full overflow-hidden rounded-3xl border border-white/5">
            <Image
              src="/professional-team-meeting.png"
              alt="Team Working"
              fill
              className="object-cover brightness-50 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg px-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">{content.video.eyebrow}</p>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white leading-tight">
                  {content.video.title}
                </h3>
              </div>
            </div>
            <div className="absolute bottom-10 right-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 shadow-xl relative z-10"
              >
                <Play className="w-6 h-6 fill-current" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Values Vision */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.mission.items.map((item: any, idx: number) => {
              const Icon = [Target, Gem, Eye][idx] ?? Target
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <FounderSpotlight founder={founderContent.founder} />

      {/* Our Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">{content.team.eyebrow}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{content.team.title}</h2>
            </div>
            <p className="max-w-md text-base text-slate-500 font-medium">{content.team.description}</p>
          </div>

          <div className="space-y-12">
            {/* Top Director */}
            <div className="flex justify-center">
              {bodMembers
                .filter((m) => m.level === 1)
                .slice(0, 1)
                .map((member) => (
                  <TeamCard key={member._id} member={member} isLarge />
                ))}
              {bodMembers.filter((m) => m.level === 1).length === 0 && loading && (
                <div className="w-72 aspect-[4/5] bg-slate-200/50 rounded-2xl animate-pulse" />
              )}
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {bodMembers
                .filter((m) => m.level > 1 || (m.level === 1 && bodMembers.indexOf(m) > 0))
                .map((member) => (
                  <TeamCard key={member._id} member={member} />
                ))}
              {bodMembers.length === 0 && loading &&
                Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="aspect-[4/5] bg-slate-200/50 rounded-2xl animate-pulse" />
                  ))}
            </div>
          </div>
        </div>
      </section>

      <CtaJourney />
    </div>
  )
}

function TeamCard({ member, isLarge = false }: { member: any; isLarge?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative group ${isLarge ? "w-full max-w-xs" : "w-full"}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <Image
          src={member.image || "/placeholder-user.jpg"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 font-semibold">
            {member.role}
          </span>
          <h3 className="mt-2 text-base font-bold text-white truncate">{member.name}</h3>
        </div>
      </div>
    </motion.div>
  )
}
