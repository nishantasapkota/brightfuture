import { DetailLayout } from "@/components/public/detail-layout"
import { getBlogBySlug, getBlogs } from "@/lib/db-utils"
import { absoluteUrl, buildSeoDescription, cleanText, createPageMetadata, getShareImageUrl, siteName } from "@/lib/seo"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Tag, User } from "lucide-react"

export const dynamic = "force-dynamic"

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

  const readTime = Math.max(1, Math.ceil((blog.content || "").split(/\s+/).length / 200))

  return (
    <DetailLayout
      title={blog.title}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: blog.title }]}
      sidebarTitle="Recent Posts"
      sidebarItems={sidebarItems}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Meta bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-400 pb-6 border-b border-slate-100">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-red-500" />
          <span className="font-medium text-slate-600">
            {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </span>
        {blog.author && (
          <>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-red-500" />
              <span className="font-medium text-slate-600">{blog.author}</span>
            </span>
          </>
        )}
        <span className="text-slate-300">|</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-red-500" />
          <span className="font-medium text-slate-600">{readTime} min read</span>
        </span>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-lg mb-10">
          <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-red-500 prose-blockquote:bg-red-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:shadow-md">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="pt-8 mt-8 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tags</span>
            {blog.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Next/Prev navigation */}
      <div className="pt-10 mt-10 border-t border-slate-100">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to all articles
        </Link>
      </div>
    </DetailLayout>
  )
}
