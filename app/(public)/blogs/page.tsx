import type { Metadata } from "next";
import { BlogsPageClient } from "@/components/public/blogs-page-client";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Study Abroad Insights & Education Blog | Bright Future Edu",
  description:
    "Read expert study abroad guides, university updates, visa tips, scholarship advice, and international education insights from Bright Future Edu.",
  path: "/blogs",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Bright Future Edu education insights blog",
    },
  ],
});

export default function BlogsPage() {
  return <BlogsPageClient />;
}
