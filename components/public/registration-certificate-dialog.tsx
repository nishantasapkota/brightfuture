"use client";

import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function RegistrationCertificateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-left text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          Registered consultancy. Registration number: 1234-2079/088
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-[calc(50%+56px)] z-[9999] max-h-[calc(100vh-9rem)] max-w-4xl overflow-y-auto border-white/10 bg-slate-950 p-3 pt-12 text-white sm:p-4 sm:pt-12"
      >
        <DialogClose className="absolute right-3 top-3 z-[10000] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white text-slate-950 shadow-lg transition hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          <X className="h-5 w-5" />
          <span className="sr-only">Close certificate popup</span>
        </DialogClose>
        <DialogHeader className="px-1 pb-2">
          <DialogTitle>Registered Consultancy Certificate</DialogTitle>
          <DialogDescription className="text-white/60">
            Registration number: 1234-2079/088
          </DialogDescription>
        </DialogHeader>
        <div className="relative mx-auto aspect-[1080/1350] w-full max-w-2xl overflow-hidden rounded-md bg-white">
          {/* <Image
            src="/registration-certificate.png"
            alt="Bright Future Edu registered consultancy certificate"
            fill
            sizes="(min-width: 1024px) 672px, calc(100vw - 2rem)"
            className="object-contain"
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
