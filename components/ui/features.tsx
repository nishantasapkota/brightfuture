"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface MissionFeature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}

interface FeaturesProps {
  features: MissionFeature[];
  eyebrow?: string;
  heading?: string;
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function Features({
  features,
  eyebrow,
  heading,
  primaryColor = "red-600",
  progressGradientLight = "bg-gradient-to-r from-red-500 to-red-600",
  progressGradientDark = "bg-gradient-to-r from-red-400 to-red-500",
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress, features.length]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(eyebrow || heading) && (
          <div className="text-center mb-12 md:mb-16">
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                  {eyebrow}
                </span>
              </span>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 mt-4">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">
          {/* Left Side - Features with Progress Lines */}
          <div
            ref={containerRef}
            className="lg:space-y-6 md:space-x-6 lg:space-x-0 overflow-x-auto overflow-y-hidden no-scrollbar lg:overflow-visible flex lg:flex-col flex-row order-2 lg:order-1 pb-4 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer flex-shrink-0 w-[85vw] md:w-auto"
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Feature Content */}
                  <div
                    className={`
                      flex lg:flex-row flex-col items-start gap-4 p-4 lg:max-w-2xl transition-all duration-300
                      ${
                        isActive
                          ? "bg-white shadow-xl rounded-2xl border border-slate-100"
                          : ""
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        p-3 rounded-xl transition-all duration-300 shrink-0
                        ${
                          isActive
                            ? "bg-red-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`
                          text-lg font-semibold mb-2 transition-colors duration-300
                          ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-700"
                          }
                        `}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`
                          transition-colors duration-300 text-sm leading-relaxed
                          ${
                            isActive
                              ? "text-slate-600"
                              : "text-slate-500"
                          }
                        `}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-4 bg-slate-100 rounded-full h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className={`h-full ${progressGradientLight}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Image Display */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 shadow-lg"
            >
              <Image
                className="object-cover"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
