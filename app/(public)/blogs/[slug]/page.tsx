import { DetailLayout } from "@/components/public/detail-layout"
import { getBlogBySlug, getBlogs } from "@/lib/db-utils"
import { absoluteUrl, buildSeoDescription, cleanText, createPageMetadata, getShareImageUrl, siteName } from "@/lib/seo"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"

export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) {
    return createPageMetadata({ title: "Blog not found", description: "The requested blog post could not be found.", path: `/blogs/${slug}`, noIndex: true })
  }
  const title = cleanText(blog.metaTitle || blog.title)
  const description = cleanText(blog.metaDescription) || buildSeoDescription(blog.excerpt, blog.content)
  const imageUrl = getShareImageUrl(blog.featuredImage) || `/api/og/blogs/${slug}`
  const publishedTime = blog.publishedAt?.toISOString?.() ?? blog.createdAt?.toISOString?.()
  const modifiedTime = blog.updatedAt?.toISOString?.()
  return createPageMetadata({ title, description, path: `/blogs/${slug}`, type: "article", images: [{ url: imageUrl, width: 1200, height: 630, alt: title }], publishedTime, modifiedTime, authors: blog.author ? [blog.author] : [siteName], tags: blog.tags, noIndex: blog.status !== "published" })
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  let blog = null
  let recentBlogs: any[] = []

  try { blog = await getBlogBySlug(slug) } catch (error) { console.error("Failed to fetch blog:", error); notFound() }
  if (!blog) notFound()

  try { recentBlogs = await getBlogs(5) } catch (error) { console.error("Failed to fetch blogs for sidebar:", error) }

  const publishedTime = blog.publishedAt?.toISOString?.() ?? blog.createdAt?.toISOString?.()
  const modifiedTime = blog.updatedAt?.toISOString?.()
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: cleanText(blog.metaTitle || blog.title),
    description: cleanText(blog.metaDescription) || buildSeoDescription(blog.excerpt, blog.content),
    image: absoluteUrl(getShareImageUrl(blog.featuredImage) || `/api/og/blogs/${slug}`),
    datePublished: publishedTime, dateModified: modifiedTime,
    author: { "@type": "Person", name: blog.author || siteName },
    publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: absoluteUrl("/placeholder-logo.png") } },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blogs/${slug}`) },
    keywords: blog.tags?.join(", "),
  }

  const sidebarItems = recentBlogs.filter(b => b.slug !== slug).map(b => ({ title: b.title, href: `/blogs/${b.slug}`, active: false }))

  return (
    <DetailLayout
      title={blog.title}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: blog.title }]}
      sidebarTitle="Recent Posts"
      sidebarItems={sidebarItems}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="space-y-8">
        {blog.featuredImage && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
            <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="space-y-8">
          <div className="flex items-center gap-3 text-sm text-slate-400 pb-6 border-b border-slate-100">
            <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {blog.author && <><span>•</span><span className="font-medium">By {blog.author}</span></>}
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-500 prose-li:text-slate-500 prose-strong:text-slate-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-slate-50 text-slate-500 border border-slate-100 px-3 py-1.5 rounded-full text-xs font-medium">#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DetailLayout>
  )
}
