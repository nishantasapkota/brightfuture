import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "About Bright Future Edu | Study Abroad Education Consultancy",
  description:
    "Learn about Bright Future Edu, our student-first counselling approach, and how we support study abroad applications, visas, and admissions planning.",
  path: "/about-us",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "About Bright Future Edu education consultancy",
    },
  ],
})

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
