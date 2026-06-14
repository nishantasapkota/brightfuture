import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
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
    { label: "Global Events", href: "/event" },
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

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-32 right-[-5%] h-96 w-96 rounded-full bg-blue-600/8 blur-[150px]" />
        <div className="absolute -bottom-32 left-[-5%] h-96 w-96 rounded-full bg-red-600/8 blur-[150px]" />
      </div>

      <div className="container relative z-10 pt-24 pb-10">
        <div className="grid gap-16 lg:gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-8 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 rounded-xl"
            >
              {details?.logo ? (
                <Image
                  src={details.logo}
                  alt={businessName}
                  width={180}
                  height={52}
                  className="object-contain brightness-0 invert"
                />
              ) : (
                <div className="h-11 w-11 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-red-600/10 ring-1 ring-white/10">
                  {firstName[0]}
                </div>
              )}
            </Link>
            <p className="text-white/45 text-sm leading-relaxed font-medium max-w-sm">
              {businessName} is the global architecture for educational success, bridging the gap between local potential and international excellence.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Facebook, href: details?.socialLinks?.facebook, label: "Facebook" },
                { icon: Twitter, href: details?.socialLinks?.twitter, label: "Twitter" },
                { icon: Instagram, href: details?.socialLinks?.instagram, label: "Instagram" },
                { icon: Linkedin, href: details?.socialLinks?.linkedin, label: "LinkedIn" },
                { icon: Youtube, href: details?.socialLinks?.youtube, label: "YouTube" },
              ].filter(s => !!s.href).map((social, i) => (
                <Link
                  key={i}
                  href={social.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  <social.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:col-span-7">
            <div className="space-y-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Explore</h3>
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
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Student Services</h3>
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
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Contact</h3>
              <div className="space-y-4">
                {offices.length > 0 ? (
                  offices.map((office) => (
                    <div key={`${office.label}-${office.address}`} className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-white/45 text-[13px] font-medium leading-relaxed">{office.address}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-white/45 text-[13px]">Kathmandu, Nepal</p>
                  </div>
                )}
                {phones.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-white/45 text-[13px]">{phones.join(", ")}</p>
                  </div>
                )}
                {details?.emails?.map((email, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-white/45 text-[13px] break-all">{email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/25 text-[11px] font-medium tracking-wide order-2 md:order-1">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <div className="flex gap-6 flex-wrap justify-center order-1 md:order-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/30 hover:text-white/60 text-[11px] font-medium tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-white/25 text-[11px] font-medium tracking-wide order-3">
            <RegistrationCertificateDialog />
          </div>
        </div>
      </div>
    </footer>
  );
}
