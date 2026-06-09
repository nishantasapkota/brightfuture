"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Users, BookOpen, Calendar, FileCheck } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return <motion.div className={className} {...props}>{children}</motion.div>
}

type StatsContent = HomePageContent["statsBar"]

const statIcons = [Users, BookOpen, Calendar, FileCheck]

const statGradients = [
  "from-red-500/20 to-rose-600/5",
  "from-purple-500/20 to-purple-600/5",
  "from-emerald-500/20 to-emerald-600/5",
  "from-amber-500/20 to-amber-600/5",
]

const iconColors = [
  "text-red-400",
  "text-purple-400",
  "text-emerald-400",
  "text-amber-400",
]

const bgColors = [
  "bg-red-500/10",
  "bg-purple-500/10",
  "bg-emerald-500/10",
  "bg-amber-500/10",
]

export function StatsBar({ content }: { content?: StatsContent }) {
  const stats = content?.items ?? homeDefaultContent.statsBar.items

  return (
    <div className="container relative z-20 -mt-16 md:-mt-20">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-900/10 md:grid-cols-4 md:gap-4 md:p-10"
      >
        {stats.map((stat, index) => {
          const Icon = statIcons[index] ?? Users
          return (
          <div key={index} className="flex items-center gap-4 md:justify-center md:border-r last:border-0 border-slate-100 last:border-none">
            <div className={`rounded-2xl p-3 ${bgColors[index]} ${iconColors[index]}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 md:text-2xl">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          </div>
        )})}
      </MotionDiv>
    </div>
  )
}
