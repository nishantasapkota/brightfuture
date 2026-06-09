import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CtaJourney } from "@/components/public/cta-journey"
import { PageHero } from "@/components/public/page-hero"
import { Button } from "@/components/ui/button"
import { getServices } from "@/lib/db-utils"

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  let services = []

  try {
    const fetchedServices = await getServices(200)
    services = fetchedServices.filter((service) => service.status === "active")
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

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">What We Offer</span>
          </div>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
            Explore all active service pages managed from the CMS. Add, remove, or update
            any service from the admin panel and it will flow through here automatically.
          </p>
        </div>
      </section>

      <section className="pb-24 space-y-32">
        {services.length === 0 ? (
          <div className="container">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center">
              <h2 className="text-xl font-bold text-slate-900">No active services published yet.</h2>
              <p className="mt-3 text-sm text-slate-500">
                Create or activate services in the admin CMS to show them on this page.
              </p>
            </div>
          </div>
        ) : (
          services.map((service, index) => (
            <div key={service.slug} className="container">
              <div
                className={`flex flex-col ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 lg:gap-16`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative h-[320px] md:h-[420px] overflow-hidden rounded-2xl shadow-xl shadow-slate-900/[0.04] group">
                    <Image
                      src={service.icon || "/placeholder.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">{service.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {service.name}
                  </h2>
                  <p className="text-base text-slate-500 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <div className="space-y-3">
                    {service.features?.slice(0, 5).map((item: string) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="rounded-md bg-red-50 p-1.5 text-red-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
                  >
                    View service page
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="container pb-24">
        <div className="rounded-2xl bg-slate-900 p-10 md:p-16 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
          <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10">Ready to get started?</h3>
          <p className="text-slate-400 max-w-lg relative z-10">
            Book a free consultation and let our experts guide you through the process.
          </p>
          <Link href="/online-consultation">
            <Button className="h-12 rounded-xl bg-red-600 px-8 text-[13px] font-bold text-white hover:bg-red-500 shadow-lg shadow-red-600/15 relative z-10">
              Book A Consultation
            </Button>
          </Link>
        </div>
      </div>

      <CtaJourney />
    </div>
  )
}
