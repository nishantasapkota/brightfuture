import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, MapPin } from "lucide-react";
import { CtaJourney } from "@/components/public/cta-journey";
import { PageHero } from "@/components/public/page-hero";
import { Button } from "@/components/ui/button";
import { getDestinations } from "@/lib/db-utils";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  let destinations = [];

  try {
    const fetchedDestinations = await getDestinations(200);
    destinations = fetchedDestinations.filter(
      (destinations) => destinations.status === "active",
    );
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <PageHero
        badge="Study Abroad Destinations"
        title={
          <>
            Where will your{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              journey begin?
            </span>
          </>
        }
        description="Explore active study destination pages managed from the CMS and guide students into country-specific landing pages."
        breadcrumbItems={[{ label: "Destinations" }]}
        heroImage={{
          src: "/page-headers/destination-cards.png",
          alt: "Graduate choosing study destinations",
        }}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
                  Destination Pages
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                Popular Destinations for International Students
              </h2>
            </div>
            <Link href="/online-consultation">
              <Button className="h-11 rounded-xl bg-slate-900 px-6 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-slate-800">
                Talk To Counsellor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {destinations.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center">
              <h3 className="text-xl font-bold text-slate-900">No active destinations published yet.</h3>
              <p className="mt-3 text-sm text-slate-500">
                Create destination pages in the admin CMS to show them here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <article
                  key={destination.slug}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-[220px] bg-slate-100 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.jpg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
                      <MapPin className="h-4 w-4" />
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Study in {destination.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {destination.shortDescription}
                    </p>
                    <div className="mt-5 space-y-2.5">
                      {destination.highlights?.slice(0, 3).map((detail: string) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="mt-6 inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
                    >
                      View destination page
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaJourney />
    </div>
  );
}
