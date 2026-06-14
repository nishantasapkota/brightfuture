import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles, ArrowUpRight, Layers, Zap, Globe, Shield } from "lucide-react"
import { CtaJourney } from "@/components/public/cta-journey"
import { PageHero } from "@/components/public/page-hero"
import { getServices } from "@/lib/db-utils"

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  let services = []
  let categories: string[] = []

  try {
    const fetchedServices = await getServices(200)
    services = fetchedServices.filter((service) => service.status === "active")
    categories = Array.from(new Set(services.map((s) => s.category).filter(Boolean)))
  } catch (error) {
    console.error("Failed to fetch services:", error)
  }

  return (
    <div className="flex min-h-screen flex-col gap-0 bg-white">
      <PageHero
        title={
          <>
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Services
            </span>
          </>
        }
        description="Comprehensive support across admissions, visa planning, academic guidance, and test preparation."
        breadcrumbItems={[{ label: "Services" }]}
        heroImage={{
          src: "/page-headers/counseling-session.png",
          alt: "Student consulting with an education counselor",
        }}
      />

      {/* Stats strip */}
      <section className="border-b border-slate-100 bg-slate-50/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: "700+", label: "Partner Universities", icon: Globe },
              { value: "98%", label: "Visa Success Rate", icon: Shield },
              { value: "7+", label: "Years Experience", icon: Zap },
              { value: "6K+", label: "Students Guided", icon: Sparkles },
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

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-5">
                <Layers className="h-3.5 w-3.5 text-red-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">What We Offer</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
                Everything you need to{" "}
                <span className="text-red-600">go global</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                Explore our full range of services designed to take you from application to arrival.
              </p>
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white cursor-pointer">
                  All
                </span>
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:border-red-200 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {services.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center">
              <h2 className="text-xl font-bold text-slate-900">No active services published yet.</h2>
              <p className="mt-3 text-sm text-slate-500">
                Create or activate services in the admin CMS to show them on this page.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-red-100"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.icon || "/placeholder.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                        {service.category || "Service"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.features?.slice(0, 3).map((item: string) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                        >
                          <CheckCircle2 className="h-3 w-3 text-red-500" />
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100">
                      <span className="text-sm font-bold text-red-600">
                        View Details
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all group-hover:bg-red-600 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-3 py-1 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Our Process</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 leading-tight">
              Four steps to your{" "}
              <span className="text-red-600">dream university</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Free one-on-one session to understand your goals, budget, and preferences.",
              },
              {
                step: "02",
                title: "Application",
                desc: "We prepare and submit your applications to the best-fit universities.",
              },
              {
                step: "03",
                title: "Visa & Docs",
                desc: "End-to-end visa filing, interview prep, and documentation review.",
              },
              {
                step: "04",
                title: "Departure",
                desc: "Pre-departure briefing, accommodation support, and airport guidance.",
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative">
                {idx !== 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-300 to-transparent" />
                )}
                <div className="relative z-10">
                  <span className="text-5xl font-extrabold text-slate-200">{item.step}</span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 md:p-16">
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-red-600/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <h3 className="text-2xl md:text-4xl font-bold text-white max-w-2xl">
                Ready to start your journey?
              </h3>
              <p className="text-slate-400 max-w-lg">
                Book a free consultation and let our experts guide you through every step of the process.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-sm font-bold text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-600/15"
              >
                Book A Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaJourney />
    </div>
  )
}
