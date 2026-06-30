"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { FounderPageContent } from "@/lib/page-content";

export function FounderSpotlight({
  founder,
  image = "https://res.cloudinary.com/ddpjgl0pw/image/upload/v1782797753/brightfuture/media/e6l1fnlj2wpdugvjdura.jpg",
}: {
  founder: FounderPageContent["founder"];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-red-100/40 blur-[140px]" />

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <Image
                src={image}
                alt={founder.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
            </div>

            {/* decorative quote mark */}
            <div className="absolute -bottom-6 -right-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-1.5 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                {founder.eyebrow}
              </span>
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 leading-tight">
              {founder.name}
            </h2>
            <p className="mt-3 text-lg text-slate-500 font-medium">
              {founder.role}
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 md:text-lg">
              {founder.paragraphs.map((paragraph, index) => {
                if (
                  founder.highlight &&
                  paragraph.includes(founder.highlight)
                ) {
                  const [before, after] = paragraph.split(founder.highlight);
                  return (
                    <p key={index}>
                      {before}
                      <strong className="font-bold text-red-600">
                        {founder.highlight}
                      </strong>
                      {after}
                    </p>
                  );
                }

                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            <blockquote className="mt-10 relative rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <div className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>
              <p className="text-lg md:text-xl italic leading-relaxed text-slate-700">
                "{founder.quote}"
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
