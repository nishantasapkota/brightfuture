"use client";

import Image from "next/image";
import { Breadcrumb } from "@/components/public/breadcrumb";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  description: string;
  breadcrumbItems?: { label: string; href?: string }[];
  heroImage?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
}

export function PageHero({
  badge = "Institutional Grade Excellence",
  title,
  description,
  breadcrumbItems,
  heroImage,
}: PageHeroProps) {
  return (
    <section
      className={`relative isolate flex overflow-hidden bg-[#020617] pt-28 text-white ${
        heroImage ? "min-h-[520px] items-stretch pb-0" : "min-h-[420px] items-center pb-16"
      }`}
    >
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            style={{ objectPosition: heroImage.objectPosition || "center" }}
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0a1033_50%,#111827_100%)] opacity-60" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(135deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] to-transparent opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.60)_0%,rgba(2,6,23,0.35)_45%,rgba(2,6,23,0.20)_100%)]" />
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-red-600/6 blur-[150px]" />
        <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="container relative z-20 w-full">
        <div
          className={`py-10 md:py-14 ${
            heroImage ? "min-h-[420px] flex items-center" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {breadcrumbItems && (
              <Breadcrumb items={breadcrumbItems} theme="dark" className="mb-6" />
            )}

            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-red-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">{badge}</span>
            </div>

            <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white tracking-tight">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base md:text-lg font-medium leading-relaxed text-white/50">
              {description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-red-500/40" />
              <div className="h-1 w-1 rounded-full bg-red-500/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
