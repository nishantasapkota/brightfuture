import { PageHero } from "@/components/public/page-hero"
import { getPageContent } from "@/lib/db-utils"
import { mergePrivacyContent } from "@/lib/page-content"

export const dynamic = "force-dynamic"

export default async function PrivacyPage() {
  let content = mergePrivacyContent()
  try {
    const pageContent = await getPageContent("privacy-policy")
    content = mergePrivacyContent(pageContent?.content)
  } catch (error) { console.error("Failed to fetch privacy page content:", error) }

  return (
    <div className="flex flex-col">
      <PageHero
        title={
          <>
            {content.hero.title}{" "}
            <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
              {content.hero.highlight}
            </span>
          </>
        }
        description={content.hero.description}
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        badge={content.hero.badge}
        heroImage={{ src: "/page-headers/global-advisor.png", alt: "Optimus Global advisor for privacy" }}
      />
      <section className="py-20 md:py-24 bg-white">
        <div
          className="container max-w-4xl prose prose-lg max-w-none prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:font-bold prose-h3:rounded-2xl prose-h3:border prose-h3:border-slate-100 prose-h3:bg-slate-50 prose-h3:p-6 prose-h3:text-base prose-p:text-slate-500 prose-p:leading-relaxed prose-a:text-red-600"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </section>
    </div>
  )
}
