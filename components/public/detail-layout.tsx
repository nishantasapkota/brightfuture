import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  active?: boolean
}

interface DetailLayoutProps {
  title: string
  breadcrumbs: { label: string; href?: string }[]
  children: React.ReactNode
  sidebarTitle?: string
  sidebarItems?: SidebarItem[]
}

export function DetailLayout({
  title,
  breadcrumbs,
  children,
  sidebarTitle = "Related",
  sidebarItems = [],
}: DetailLayoutProps) {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="relative min-h-[320px] bg-[#020617] overflow-hidden pt-28 pb-14 md:min-h-[360px] md:pt-32 md:pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0a1033_50%,#111827_100%)]" />
          <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(135deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-red-600/8 blur-[120px] animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95),rgba(2,6,23,0.7)_60%,transparent)]" />
        </div>

        <div className="container relative z-20">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] font-medium leading-relaxed text-white/35 mb-5">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
          <h1 className="max-w-4xl text-2xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">{title}</h1>
          <div className="mt-5 flex items-center gap-4">
            <div className="h-px w-8 bg-red-500/40" />
            <div className="h-1 w-1 rounded-full bg-red-500/40" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">{children}</div>

            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 mb-5"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">{sidebarTitle}</span>
                </div>
                <div className="flex flex-col rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm"
                >
                  {sidebarItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "p-4 border-b last:border-b-0 hover:bg-slate-50 transition-colors text-slate-600 text-[13px] font-medium inline-flex items-center justify-between group",
                        item.active && "bg-red-50 text-red-700 font-semibold"
                      )}
                    >
                      {item.title}
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-red-600 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
