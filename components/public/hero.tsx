"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, GraduationCap } from "lucide-react";
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content";

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} {...props}>{children}</motion.div>;
};

export function Hero({ content }: { content?: HomePageContent["hero"] }) {
  const hero = content ?? homeDefaultContent.hero;
  const leftStat = hero.floatingStats?.[0];
  const rightStat = hero.floatingStats?.[1];

  return (
    <section className="relative min-h-[700px] lg:min-h-[820px] flex items-center overflow-hidden bg-[#020617]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0a1033_50%,#111827_100%)]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(135deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/12 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-red-600/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center px-4 md:px-6 py-24 lg:py-20">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7 pt-8"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] border border-white/[0.08] px-5 py-2.5">
            <GraduationCap className="w-4 h-4 text-red-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.02] tracking-tight">
            <span className="text-white">{hero.titlePrefix}</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-rose-400 bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>{" "}
            <span className="text-white/85">{hero.titleSuffix}</span>
          </h1>

          <p className="max-w-lg text-base md:text-lg text-white/45 leading-relaxed font-medium">
            {hero.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/online-consultation">
              <Button className="bg-red-600 hover:bg-red-500 text-white px-7 py-6 rounded-xl text-[13px] font-bold tracking-wide shadow-lg shadow-red-600/10 group transition-all duration-300">
                {hero.ctaLabel}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/about-us">
              <Button variant="outline" className="border-white/[0.15] bg-white/[0.06] hover:bg-white/[0.10] text-white px-7 py-6 rounded-xl text-[13px] font-bold transition-all duration-300 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center h-[560px]"
        >
          <div className="relative w-full max-w-[460px] aspect-square">
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-6 rounded-full border border-white/[0.03]" />
            <div className="absolute inset-12 rounded-full border border-white/[0.02]" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500/30" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/[0.15]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/[0.15]" />

            <div className="absolute top-3 left-3 h-10 w-10 border-l border-t border-red-500/20 rounded-tl-lg" />
            <div className="absolute bottom-3 right-3 h-10 w-10 border-b border-r border-blue-500/20 rounded-br-lg" />

            <div className="absolute inset-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] overflow-hidden flex items-center justify-center">
              <Image
                src="/main1.png"
                alt="Student with flags"
                fill
                className="object-contain p-6"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            {leftStat && (
              <MotionDiv
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-2 bottom-[28%] bg-white/[0.06] border border-white/[0.06] p-4 rounded-xl flex items-center gap-3 z-20 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{leftStat.value}</p>
                  <p className="text-[10px] text-white/35 font-medium uppercase tracking-wider">{leftStat.labelBottom}</p>
                </div>
              </MotionDiv>
            )}

            {rightStat && (
              <MotionDiv
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -right-2 top-[18%] bg-white/[0.06] border border-white/[0.06] p-4 rounded-xl flex items-center gap-3 z-20 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/15 flex items-center justify-center text-red-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{rightStat.value}</p>
                  <p className="text-[10px] text-white/35 font-medium uppercase tracking-wider">{rightStat.labelBottom}</p>
                </div>
              </MotionDiv>
            )}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
