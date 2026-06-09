"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content";

const MotionDiv = ({ children, className, ...props }: any) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} {...props}>{children}</motion.div>;
}

type MiddleCtaContent = HomePageContent["middleCta"];

export function MiddleCTA({ content }: { content?: MiddleCtaContent }) {
  const section = content ?? homeDefaultContent.middleCta;

  return (
    <section className="py-20 bg-white">
      <div className="container text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            {section.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
            {section.title}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 font-medium">
            {section.description}
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl"
        >
          <Image
            src="/Vector.png"
            alt="City view"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 80vw, 100vw"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/contact" className="inline-flex">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-lg shadow-red-600/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500">
              {section.primaryCtaLabel}
            </Button>
          </Link>
          <Link href="/services" className="inline-flex">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-lg shadow-blue-600/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
              {section.secondaryCtaLabel}
            </Button>
          </Link>
        </MotionDiv>
      </div>
    </section>
  );
}
