"use client"

import { PageHero } from "@/components/public/page-hero"
import { Courses } from "@/components/public/courses"
import { CtaJourney } from "@/components/public/cta-journey"

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-0 bg-white min-h-screen">
      <PageHero
        title={
          <>
            Academic{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Pathways
            </span>
          </>
        }
        description="Explore academic pathways tailored to your interests, career goals, and global ambitions."
        breadcrumbItems={[{ label: "Courses" }]}
        heroImage={{
          src: "/page-headers/phone-student.png",
          alt: "Student speaking by phone about education courses",
        }}
      />
      <Courses />
      <CtaJourney />
    </div>
  )
}
