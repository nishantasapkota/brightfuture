"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content";

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} {...props}>{children}</motion.div>;
};

type CtaJourneyContent = HomePageContent["ctaJourney"];

export function CtaJourney({ content }: { content?: CtaJourneyContent }) {
  const section = content ?? homeDefaultContent.ctaJourney;

  return (
    <section className="relative py-28 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#020617_0%,#0a1033_50%,#111827_100%)]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(135deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] px-5 py-2.5 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Start Your Journey</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-white/40 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {section.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/appointment">
              <Button className="bg-red-600 hover:bg-red-500 text-white px-8 py-6 rounded-xl text-[13px] font-bold shadow-lg shadow-red-600/15 transition-all flex items-center gap-2">
                {section.buttonLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/[0.15] bg-white/[0.05] hover:bg-white/[0.10] text-white px-8 py-6 rounded-xl text-[13px] font-bold transition-all backdrop-blur-sm">
                Free Consultation
              </Button>
            </Link>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
