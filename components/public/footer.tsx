import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight, ArrowRight, GraduationCap } from "lucide-react";
import { getBusinessDetails } from "@/lib/db-utils";
import Link from "next/link";
import Image from "next/image";
import { normalizeBusinessOffices } from "@/lib/business-contact";
import { RegistrationCertificateDialog } from "@/components/public/registration-certificate-dialog";

export async function Footer() {
  const details = await getBusinessDetails();
  const offices = normalizeBusinessOffices(details);
  const phones = details?.phones?.filter(Boolean) ?? [];

  const businessName = details?.name || "Bright Future Edu";
  const firstName = businessName.split(" ")[0];

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Founder", href: "/founder" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "Destinations", href: "/destinations" },
    { label: "Blogs", href: "/blogs" },
  ];

  const studentLinks = [
    { label: "Online Application", href: "/online-application" },
    { label: "Student Counseling", href: "/student-counseling" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const socials = [
    { icon: Facebook, href: details?.socialLinks?.facebook, label: "Facebook" },
    { icon: Twitter, href: details?.socialLinks?.twitter, label: "Twitter" },
    { icon: Instagram, href: details?.socialLinks?.instagram, label: "Instagram" },
    { icon: Linkedin, href: details?.socialLinks?.linkedin, label: "LinkedIn" },
    { icon: Youtube, href: details?.socialLinks?.youtube, label: "YouTube" },
  ].filter((s): s is typeof s & { href: string } => !!s.href);

  return (
    <footer className="relative overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[160px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="container relative z-10 pt-20 md:pt-28 pb-10">
        {/* Top CTA strip */}
        <div className="mb-16 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400 mb-2">Ready to start?</p>
              <h3 className="text-xl md:text-2xl font-bold text-white">Begin your study abroad journey today.</h3>
            </div>
            <Link
              href="/online-application"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 rounded-xl"
            >
              <Image
                src={details?.logo || "/logo.png"}
                alt={businessName}
                width={180}
                height={52}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-medium max-w-sm">
              {businessName} helps Nepalese students access world-class education through expert counselling, admissions support, and visa guidance.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:col-span-5">
            <div className="space-y-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Explore</h3>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-[13px] font-medium inline-flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Student Services</h3>
              <ul className="space-y-3">
                {studentLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-[13px] font-medium inline-flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-[13px] font-medium inline-flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Contact Us</h3>
            <div className="space-y-4">
              {offices.length > 0 ? (
                offices.map((office) => (
                  <div key={`${office.label}-${office.address}`} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08]">
                      <MapPin className="h-3.5 w-3.5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-semibold">{office.label}</p>
                      <p className="text-white/45 text-[13px] font-medium leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    <MapPin className="h-3.5 w-3.5 text-red-400" />
                  </div>
                  <p className="text-white/45 text-[13px]">Kathmandu, Nepal</p>
                </div>
              )}
              {phones.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    <Phone className="h-3.5 w-3.5 text-red-400" />
                  </div>
                  <p className="text-white/45 text-[13px]">{phones.join(", ")}</p>
                </div>
              )}
              {details?.emails?.map((email, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    <Mail className="h-3.5 w-3.5 text-red-400" />
                  </div>
                  <span className="text-white/45 text-[13px] break-all">{email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/25 text-[11px] font-medium tracking-wide order-2 md:order-1">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <div className="text-white/25 text-[11px] font-medium tracking-wide order-3">
            <RegistrationCertificateDialog />
          </div>
          <p className="text-white/25 text-[11px] font-medium tracking-wide order-1 md:order-3">
            Powered by{" "}
            <span className="text-red-400 font-semibold">Karuna IT</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
