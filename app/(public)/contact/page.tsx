import { ContactPageContent } from "@/components/public/contact-page"
import { PageHero } from "@/components/public/page-hero"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        title={
          <>
            Get in{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Touch
            </span>
            <span className="text-slate-300">.</span>
          </>
        }
        description="Have questions about studying abroad? Our expert consultants are here to guide you every step of the way. Reach out to us today!"
        breadcrumbItems={[{ label: "Contact Us" }]}
        badge="Global Support Network"
        heroImage={{
          src: "/page-headers/uk-student-contact.png",
          alt: "Student in front of the United Kingdom study abroad contact channels",
        }}
      />

      <ContactPageContent />
    </div>
  )
}
