import { PageHero } from "@/components/public/page-hero"
import { getSuccessImages } from "@/lib/db-utils"
import { FancyboxGallery } from "@/components/public/fancybox-gallery"

export const dynamic = "force-dynamic"

export default async function SuccessStoriesPage() {
  let galleryImages: any[] = []

  try {
    galleryImages = await getSuccessImages(50)
    galleryImages = galleryImages.filter((img) => img.status === "active")
  } catch (error) { console.error("Failed to fetch success images:", error) }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHero
        badge="Student Success Stories"
        title={
          <>
            Real journeys.{" "}
            <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">Global outcomes.</span>
          </>
        }
        description="Meet students who turned careful planning, strong applications, and steady guidance into admission and study abroad milestones."
        breadcrumbItems={[{ label: "Success Stories" }]}
        heroImage={{ src: "/page-headers/student-orange.png", alt: "Successful student" }}
      />

      {galleryImages.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Success Gallery</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">Moments that inspire.</h2>
              <p className="mt-4 text-base text-slate-500 font-medium">
                Click any image to explore our students' achievements and destinations.
              </p>
            </div>
            <FancyboxGallery images={galleryImages.map(img => ({ _id: img._id?.toString() ?? '', title: img.title, description: img.description, imageUrl: img.imageUrl, category: img.category }))} columns={3} gap={16} />
          </div>
        </section>
      )}
    </div>
  )
}