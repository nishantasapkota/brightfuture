"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Sparkles, Users, GraduationCap, Globe, ArrowRight, Info, MapPin } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"

const MapPinIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export default function StudentCounselingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    howDidYouKnow: "", referredBy: "", fullName: "", contact: "", email: "", address: "",
    interestedCountry: "", university: "", intake: "", interestedCourse: "",
    lastAcademicQualification: "", academicScores: "", englishTest: "", englishScores: "", passedYear: "", yearIntake: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/student-counseling", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed")
      toast.success("Your counseling request has been submitted successfully.")
      setFormData({ howDidYouKnow: "", referredBy: "", fullName: "", contact: "", email: "", address: "", interestedCountry: "", university: "", intake: "", interestedCourse: "", lastAcademicQualification: "", academicScores: "", englishTest: "", englishScores: "", passedYear: "", yearIntake: "" })
    } catch (error) { console.error(error); toast.error("Failed to submit form. Please try again.") }
    finally { setIsSubmitting(false) }
  }

  return (
    <div className="flex flex-col gap-0 bg-white">
      <PageHero
        title={
          <>
            One-on-One{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Expert Guidance.
            </span>
          </>
        }
        description="Unlock your potential with personalized strategic counseling tailored to your global academic goals."
        breadcrumbItems={[{ label: "Student Counseling" }]}
        badge="Strategic Mentorship"
        heroImage={{ src: "/page-headers/counseling-session.png", alt: "Student counseling session" }}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <aside className="lg:w-72 h-fit shrink-0 space-y-6 lg:sticky lg:top-28 self-start"
            >
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight"
                >Start Your{" "}
                  <span className="text-red-600 underline decoration-red-200">Strategic Path</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Fill out the brief below. Our senior mentors will analyze your profile before our initial session.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: "Profile Analysis", icon: Users },
                  { title: "University Mapping", icon: MapPinIcon },
                  { title: "Visa Eligibility", icon: MapPinIcon }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100"
                  >
                    <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all"
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-[10px] text-slate-700">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10"
                ><Sparkles className="w-10 h-10 text-red-600" /></div>
                <p className="text-red-600 font-bold text-xs mb-2 uppercase tracking-wider">Fast Track</p>
                <p className="text-slate-900 font-bold text-lg mb-1">Priority Response</p>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Our mentors respond within 24 business hours to all counseling requests.</p>
                <div className="w-10 h-1 bg-red-600/20 rounded-full mt-4" />
              </div>
            </aside>

            <form onSubmit={handleSubmit} className="flex-1 space-y-10 bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm shadow-slate-900/[0.03]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">How did you hear about us?</label>
                  <Input name="howDidYouKnow" value={formData.howDidYouKnow} onChange={handleChange} placeholder="Social Media, Friend, Event"
                    className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-200 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Referred By (Optional)</label>
                  <Input name="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="Name or Organization"
                    className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-200 transition-all" />
                </div>
              </div>

              <div className="space-y-5 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-red-600" />
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {[
                    { name: "fullName", label: "Full Legal Name", placeholder: "Your full name", required: true },
                    { name: "contact", label: "Primary Phone", placeholder: "+977 9800000000", required: true },
                    { name: "email", label: "Professional Email", placeholder: "you@example.com", type: "email", required: true },
                    { name: "address", label: "Current Location", placeholder: "Kathmandu, Nepal" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2"
                    >
                      <label className="text-[13px] font-semibold text-slate-700">{field.label}{field.required && <span className="text-red-600">*</span>}</label>
                      <Input name={field.name} type={field.type || "text"} value={formData[field.name as keyof typeof formData]} onChange={handleChange} placeholder={field.placeholder} required={field.required}
                        className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-200 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-red-600" />
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Background & Targets</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {[
                    { name: "lastAcademicQualification", label: "Last Qualification", placeholder: "e.g. Bachelor in CS" },
                    { name: "academicScores", label: "Scores (GPA/%)", placeholder: "e.g. 3.6 / 82%" },
                    { name: "interestedCountry", label: "Target Country", placeholder: "e.g. United Kingdom" },
                    { name: "interestedCourse", label: "Preferred Major", placeholder: "e.g. MSc Data Science" },
                    { name: "englishTest", label: "English Test", placeholder: "e.g. IELTS / PTE" },
                    { name: "englishScores", label: "English Score", placeholder: "e.g. IELTS 7.0" },
                    { name: "passedYear", label: "Passed Year", placeholder: "e.g. 2024" },
                    { name: "yearIntake", label: "Planned Intake Year", placeholder: "e.g. 2026" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2"
                    >
                      <label className="text-[13px] font-semibold text-slate-700">{field.label}</label>
                      <Input name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange} placeholder={field.placeholder}
                        className="bg-slate-50 h-12 rounded-xl border-slate-100 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-200 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-500 text-white h-14 rounded-xl text-[13px] font-bold shadow-lg shadow-red-600/15 transition-all flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? "Processing..." : "Secure My Consultation"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                </Button>
                <p className="mt-4 text-[11px] text-center font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-2"
                >
                  <Info className="w-3 h-3" />
                  A mentor will contact you within 24 business hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
