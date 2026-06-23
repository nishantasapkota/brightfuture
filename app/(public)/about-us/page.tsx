"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Target, Gem, Eye } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"
import { FounderSpotlight } from "@/components/public/founder-spotlight"
import { Features } from "@/components/ui/features"
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
          src: "/page-headers/hero-about.jpeg",
          alt: "Smiling international student exploring education opportunities",
        }}
      />

      {/* Building Connections Section — demo inspired */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        {/* decorative blob */}
        <div className="absolute -left-20 top-10 -z-10 h-[400px] w-[400px] rounded-full bg-red-100/40 blur-[100px]" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-1.5 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                {content.whoWeAre.eyebrow}
              </span>
            </span>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {content.whoWeAre.titlePrimary} <span className="text-red-600">{content.whoWeAre.titleAccent}</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              {content.whoWeAre.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image src="https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Bright Future Edu team collaboration" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-1 space-y-6"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Graduates celebrating academic success" fill className="object-cover hover:-translate-y-0.5 transition duration-300" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  {content.whoWeAre.promiseTitle}
                </p>
                <p className="mt-2 text-xl font-medium text-slate-800 leading-snug">
                  {content.whoWeAre.promiseText}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {content.whoWeAre.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story — centered light editorial */}
      <section className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 mb-6"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                  {content.story.eyebrow}
                </span>
              </motion.span>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
                {content.story.title}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mx-auto mt-8 h-1.5 rounded-full bg-red-600"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="mx-auto mt-10 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                {content.story.focusLabel}
              </p>
              <p className="mt-3 text-lg font-bold leading-snug text-slate-900 md:text-xl">
                {content.story.focusText}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
              className="mt-12 space-y-6 text-base font-medium leading-relaxed text-slate-500"
            >
              {content.story.paragraphs.map((paragraph: string, index: number) => (
                <motion.p 
                  key={`story-p-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" }
                    },
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section - dark split card */}
      <section className="py-24 bg-slate-950">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-lg lg:grid-cols-2"
          >
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-400">
                  {content.video.eyebrow}
                </span>
              </span>
              <h3 className="max-w-md text-2xl font-bold leading-tight text-white md:text-3xl">
                {content.video.title}
              </h3>
              <div className="mt-8 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg"
                >
                  <Play className="h-5 w-5 fill-current" />
                </motion.button>
                <span className="text-sm font-semibold text-white/60">
                  Watch our story
                </span>
              </div>
            </div>
            <div className="relative min-h-[280px] lg:min-h-[380px]">
              <Image
                src="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Bright Future Edu team guiding students"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Values Vision — interactive features */}
      <Features
        eyebrow="Our Foundation"
        heading="Mission, Values & Vision"
        features={content.mission.items.map((item: any, idx: number) => {
          const Icon = [Target, Gem, Eye][idx] ?? Target
          return {
            id: idx + 1,
            icon: Icon,
            title: item.title,
            description: item.description,
            image: ["/destinations/australia.png", "/destinations/canada.png", "/destinations/germany.png"][idx] ?? "/destinations/australia.png",
          }
        })}
        progressGradientLight="bg-gradient-to-r from-red-500 to-red-600"
      />

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
