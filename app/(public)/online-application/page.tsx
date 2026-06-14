"use client"

import { useMemo, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Globe,
  GraduationCap,
  Loader2,
  MapPin,
  ShieldCheck,
  Upload,
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Calendar,
  School,
  Flag,
} from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { PageHero } from "@/components/public/page-hero"

interface UploadedFile {
  name: string
  url: string
}

type FormState = {
  fullName: string
  contact: string
  email: string
  address: string
  interestedCountry: string
  university: string
  intake: string
  interestedCourse: string
  lastAcademicQualification: string
  academicScores: string
  englishTest: string
  englishScores: string
  passedYear: string
  yearIntake: string
}

type DocumentState = Record<string, UploadedFile | null>

const steps = [
  { id: 0, label: "Personal", icon: User, description: "Basic profile and contact details" },
  { id: 1, label: "Academic", icon: GraduationCap, description: "Qualification and test records" },
  { id: 2, label: "Targets", icon: Globe, description: "Study plan and destination choices" },
  { id: 3, label: "Documents", icon: ShieldCheck, description: "Upload and submit application" },
]

const documentLabels: Record<string, string> = {
  masterDegree: "Master Degree Certificate",
  bachelorsDegree: "Bachelors Degree Certificate",
  diploma: "Diploma",
  grade12: "Grade 12 Certificate",
  cv: "CV",
  passport: "Passport",
  ielts: "IELTS",
  oxfordELLT: "Oxford (ELLT) English",
  others: "Others",
}

const countries = [
  "United Kingdom", "Australia", "Canada", "USA", "Germany", "Japan", "South Korea", "New Zealand", "Ireland", "Other",
]

const intakes = ["January 2026", "February 2026", "March 2026", "May 2026", "June 2026", "July 2026", "September 2026", "October 2026", "January 2027"]

const qualifications = [
  "SEE / SLC", "Intermediate / +2", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other",
]

const englishTests = ["IELTS", "PTE", "Duolingo", "TOEFL", "Cambridge English", "Oxford ELLT", "None / Not yet taken"]

const intakeYears = ["2025", "2026", "2027", "2028"]

const passedYears = Array.from({ length: 15 }, (_, i) => (2026 - i).toString())

const initialFormData: FormState = {
  fullName: "",
  contact: "",
  email: "",
  address: "",
  interestedCountry: "",
  university: "",
  intake: "",
  interestedCourse: "",
  lastAcademicQualification: "",
  academicScores: "",
  englishTest: "",
  englishScores: "",
  passedYear: "",
  yearIntake: "",
}

const initialDocuments: DocumentState = {
  masterDegree: null,
  bachelorsDegree: null,
  diploma: null,
  grade12: null,
  cv: null,
  passport: null,
  ielts: null,
  oxfordELLT: null,
  others: null,
}

export default function OnlineApplicationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState<FormState>(initialFormData)
  const [documents, setDocuments] = useState<DocumentState>(initialDocuments)

  const uploadedCount = useMemo(
    () => Object.values(documents).filter(Boolean).length,
    [documents],
  )

  const progress = ((activeStep + 1) / steps.length) * 100

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelect = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (docType: string, file: File) => {
    setUploadingFiles((prev) => ({ ...prev, [docType]: true }))
    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      const response = await fetch("/api/upload", { method: "POST", body: uploadData })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }
      const data = await response.json()
      setDocuments((prev) => ({
        ...prev,
        [docType]: { name: data.filename, url: data.url },
      }))
      toast.success(`${file.name} uploaded successfully`)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to upload file"
      toast.error(message)
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [docType]: false }))
    }
  }

  const handleFileDrop = (docType: string, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(docType, file)
  }

  const handleFileSelect = (docType: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(docType, file)
  }

  const removeFile = (docType: string) => {
    setDocuments((prev) => ({ ...prev, [docType]: null }))
  }

  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      return formData.fullName.trim() && formData.contact.trim() && formData.email.trim()
    }
    return true
  }

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      toast.error("Please complete Full Name, Contact Number, and Email to continue.")
      return
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeStep < steps.length - 1) {
      handleNext()
      return
    }
    setIsSubmitting(true)
    try {
      const documentUrls: Record<string, string> = {}
      Object.entries(documents).forEach(([key, value]) => {
        if (value) documentUrls[key] = value.url
      })
      const response = await fetch("/api/online-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, documents: documentUrls }),
      })
      if (!response.ok) throw new Error("Failed to submit application")
      toast.success("Your application has been submitted successfully.")
      setFormData(initialFormData)
      setDocuments(initialDocuments)
      setActiveStep(0)
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100"

  const selectTriggerClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100 data-[placeholder]:text-slate-400"

  const labelClass = "text-[13px] font-semibold text-slate-700"

  return (
    <div className="flex flex-col gap-0 bg-gradient-to-b from-slate-50 to-white">
      <PageHero
        title={
          <>
            Online{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">Application</span>
          </>
        }
        description="Complete your profile step-by-step and submit a verified application package to our counseling team."
        breadcrumbItems={[{ label: "Online Application" }]}
        badge="Guided Application Wizard"
        heroImage={{
          src: "/page-headers/global-advisor.png",
          alt: "Global advisor supporting an online application for study destinations",
        }}
      />

      <section className="relative -mt-8 pb-24">
        <div className="container max-w-5xl">
          {/* Step indicator chips */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeStep === step.id
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                    : activeStep > step.id
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                }`}
              >
                {activeStep > step.id ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <step.icon className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
              {/* Main form area */}
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Step header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Step {activeStep + 1} of {steps.length}
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-slate-900">{steps[activeStep].description}</h2>
                    </div>
                    {activeStep === 3 && (
                      <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 ring-1 ring-red-100">
                        {uploadedCount} / {Object.keys(documentLabels).length} files
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <AnimatePresence mode="wait">
                    {activeStep === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <User className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" required className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Phone className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Contact Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="e.g. +977 9800000000" required className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Mail className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. name@example.com" required className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <MapPin className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Address
                            </label>
                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="address" value={formData.address} onChange={handleChange} placeholder="e.g. Kathmandu, Nepal" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Award className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Last Academic Qualification
                            </label>
                            <Select
                              value={formData.lastAcademicQualification}
                              onValueChange={(v) => handleSelect("lastAcademicQualification", v)}
                            >
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select qualification" />
                              </SelectTrigger>
                              <SelectContent>
                                {qualifications.map((q) => (
                                  <SelectItem key={q} value={q}>{q}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <BookOpen className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Academic Score
                            </label>
                            <div className="relative">
                              <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="academicScores" value={formData.academicScores} onChange={handleChange} placeholder="e.g. 3.6 / 82%" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Globe className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              English Test
                            </label>
                            <Select
                              value={formData.englishTest}
                              onValueChange={(v) => handleSelect("englishTest", v)}
                            >
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select test" />
                              </SelectTrigger>
                              <SelectContent>
                                {englishTests.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Award className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              English Score
                            </label>
                            <div className="relative">
                              <Award className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="englishScores" value={formData.englishScores} onChange={handleChange} placeholder="e.g. 7.0" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Calendar className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Passed Year
                            </label>
                            <Select
                              value={formData.passedYear}
                              onValueChange={(v) => handleSelect("passedYear", v)}
                            >
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                {passedYears.map((y) => (
                                  <SelectItem key={y} value={y}>{y}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Calendar className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Planned Intake Year
                            </label>
                            <Select
                              value={formData.yearIntake}
                              onValueChange={(v) => handleSelect("yearIntake", v)}
                            >
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                {intakeYears.map((y) => (
                                  <SelectItem key={y} value={y}>{y}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Flag className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Interested Country
                            </label>
                            <Select
                              value={formData.interestedCountry}
                              onValueChange={(v) => handleSelect("interestedCountry", v)}
                            >
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map((c) => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <School className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Preferred University
                            </label>
                            <div className="relative">
                              <School className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="university" value={formData.university} onChange={handleChange} placeholder="e.g. University of Manchester" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <Calendar className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Target Intake
                            </label>
                            <Select
                              value={formData.intake}
                              onValueChange={(v) => handleSelect("intake", v)}
                            >
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select intake" />
                              </SelectTrigger>
                              <SelectContent>
                                {intakes.map((i) => (
                                  <SelectItem key={i} value={i}>{i}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>
                              <BookOpen className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
                              Interested Course
                            </label>
                            <div className="relative">
                              <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <input name="interestedCourse" value={formData.interestedCourse} onChange={handleChange} placeholder="e.g. MSc Data Science" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-300 focus:ring-2 focus:ring-red-100" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm font-medium text-blue-700">
                          <FileText className="mr-2 inline h-4 w-4" />
                          Upload relevant academic and identity documents. You can submit the form even if some files are pending.
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {Object.entries(documentLabels).map(([docType, label]) => {
                            const uploaded = documents[docType]
                            const uploading = uploadingFiles[docType]
                            return (
                              <div key={docType} className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm">
                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                                {uploaded ? (
                                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                    <div className="flex items-start gap-3">
                                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-emerald-800">{uploaded.name}</p>
                                        <p className="mt-0.5 text-xs text-emerald-600">Uploaded successfully</p>
                                      </div>
                                    </div>
                                    <button type="button" onClick={() => removeFile(docType)}
                                      className="mt-3 rounded-lg border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ) : (
                                  <div
                                    onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleFileUpload(docType, file) }}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="relative cursor-pointer rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition-all hover:border-red-300 hover:bg-red-50/50"
                                  >
                                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.png"
                                      onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(docType, file) }}
                                      className="absolute inset-0 cursor-pointer opacity-0" disabled={uploading}
                                    />
                                    {uploading ? (
                                      <Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" />
                                    ) : (
                                      <Upload className="mx-auto h-6 w-6 text-slate-400" />
                                    )}
                                    <p className="mt-2 text-sm font-semibold text-slate-600">
                                      {uploading ? "Uploading..." : "Drop or click to upload"}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-400">PDF, DOC up to 25MB</p>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <button type="button" onClick={handleBack} disabled={activeStep === 0 || isSubmitting}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                    {activeStep < steps.length - 1 ? (
                      <button type="button" onClick={handleNext} disabled={isSubmitting}
                        className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-red-600 hover:shadow-red-600/20"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting}
                        className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-6 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:from-red-700 hover:to-rose-600"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <CheckCircle2 className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Sidebar */}
              <aside className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div className="space-y-6">
                  {/* Quick info */}
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 shadow-sm">
                      <Bell className="h-3 w-3" />
                      Quick Notes
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm font-medium text-slate-500">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        Keep your contact details accurate for follow-up.
                      </li>
                      <li className="flex items-start gap-3 text-sm font-medium text-slate-500">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        Upload documents in clear and readable format.
                      </li>
                      <li className="flex items-start gap-3 text-sm font-medium text-slate-500">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        After submission, our team will review and contact you within 24 hours.
                      </li>
                    </ul>
                  </div>

                  {/* Help card */}
                  <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">?</span>
                      <p className="text-xs font-bold uppercase tracking-wider text-red-600">Need help?</p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      If you are unsure about course or destination, submit anyway and our counselor will guide your next steps.
                    </p>
                  </div>

                  {/* Progress summary */}
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Your Progress</p>
                    <div className="space-y-3">
                      {steps.map((step) => {
                        const Icon = step.icon
                        const isDone = activeStep > step.id
                        const isCurrent = activeStep === step.id
                        return (
                          <div key={step.id} className="flex items-center gap-3">
                            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isDone ? "bg-emerald-100 text-emerald-600" : isCurrent ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                            }`}>
                              {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                            </div>
                            <span className={`text-xs font-semibold ${isDone || isCurrent ? "text-slate-900" : "text-slate-400"}`}>
                              {step.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}