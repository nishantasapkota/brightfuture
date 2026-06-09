import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, Globe2, MapPin } from "lucide-react"
import { notFound } from "next/navigation"
import { CtaJourney } from "@/components/public/cta-journey"
import { PageHero } from "@/components/public/page-hero"
import { Button } from "@/components/ui/button"
import { getDestinationBySlug, getDestinations } from "@/lib/db-utils"
import { createPageMetadata } from "@/lib/seo"
import { buildBreadcrumbJsonLd } from "@/lib/structured-data"

interface DestinationPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination) {
    return createPageMetadata({ title: "Destination not found", description: "The requested study destination page could not be found.", path: `/destinations/${slug}`, noIndex: true })
  }
  return createPageMetadata({
    title: destination.metaTitle || `Study in ${destination.name}`,
    description: destination.metaDescription || destination.shortDescription,
    path: `/destinations/${destination.slug}`,
    noIndex: destination.status !== "active",
    images: destination.image ? [{ url: destination.image, width: 1200, height: 630, alt: `Study in ${destination.name}` }] : undefined,
  })
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination || destination.status !== "active") notFound()

  let allDestinations: any[] = []
  try { allDestinations = (await getDestinations(100)).filter((item) => item.status === "active") } catch (error) { console.error("Failed to fetch destinations:", error) }

  const relatedDestinations = allDestinations.filter((item) => item.slug !== slug).slice(0, 6).map((item) => ({ title: item.name, href: `/destinations/${item.slug}` }))
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name: `Study in ${destination.name}`, path: `/destinations/${destination.slug}` }])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <PageHero
        badge={`Study in ${destination.name}`}
        title={<>
          Study in{" "}
          <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">{destination.name}</span>
        </>
        }
        description={destination.metaDescription || destination.shortDescription}
        breadcrumbItems={[{ label: "Destinations", href: "/destinations" }, { label: destination.name }]}
        heroImage={{ src: destination.image || "/page-headers/destination-cards.png", alt: `Study in ${destination.name}` }}
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-slate-500">{destination.shortDescription}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {destination.highlights?.map((item: string) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <span className="text-sm font-medium leading-relaxed text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/online-consultation">
                <Button className="h-11 rounded-xl bg-red-600 px-6 text-[13px] font-bold text-white hover:bg-red-500 shadow-lg shadow-red-600/10">Book Consultation</Button>
              </Link>
              <Link href="/contact" className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors group">
                Talk to a Counsellor <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-xl">
            <Image src={destination.image || "/placeholder.jpg"} alt={`Study in ${destination.name}`} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Globe2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Why study in {destination.name}</h2>
            <div className="mt-5 prose prose-sm max-w-none prose-p:text-slate-500 prose-li:text-slate-500 prose-headings:text-slate-900"
              dangerouslySetInnerHTML={{ __html: destination.description }}
            />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Popular program directions</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {destination.popularPrograms?.map((program: string) => (
                <div key={program} className="rounded-xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 border border-slate-100">{program}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedDestinations.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Other destinations</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedDestinations.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><MapPin className="h-4 w-4" /></div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <span className="inline-flex items-center text-[13px] font-bold text-red-600 group-hover:text-red-700">
                    View page <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaJourney />
    </div>
  )
}
