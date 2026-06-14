export type HomePageContent = {
  popup: {
    enabled: boolean
  }
  hero: {
    badge: string
    titlePrefix: string
    titleHighlight: string
    titleSuffix: string
    description: string
    ctaLabel: string
    floatingStats: {
      value: string
      labelTop: string
      labelBottom: string
    }[]
  }
  statsBar: {
    items: {
      value: string
      label: string
    }[]
  }
  destinations: {
    eyebrow: string
    title: string
    viewAllLabel: string
    items: {
      name: string
      image: string
    }[]
  }
  consultancy: {
    eyebrow: string
    title: string
    description: string
    stats: {
      value: string
      label: string
    }[]
    formTitle: string
    formDescription: string
    formButtonLabel: string
  }
  middleCta: {
    eyebrow: string
    title: string
    description: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
  }
  features: {
    eyebrow: string
    title: string
    description: string
    items: {
      title: string
      description: string
    }[]
  }
  blog: {
    eyebrow: string
    title: string
    description: string
  }
  partners: {
    titlePrefix: string
    titleHighlight: string
    titleSuffix: string
    description: string
  }
  testimonials: {
    eyebrow: string
    titlePrefix: string
    titleHighlight: string
    description: string
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    submitLabel: string
    mapStatLabel: string
    mapStatValue: string
  }
  ctaJourney: {
    title: string
    description: string
    buttonLabel: string
  }
}

export type AboutPageContent = {
  hero: {
    badge: string
    title: string
    description: string
  }
  whoWeAre: {
    eyebrow: string
    titlePrimary: string
    titleAccent: string
    description: string
    tags: string[]
    promiseTitle: string
    promiseText: string
  }
  story: {
    eyebrow: string
    title: string
    focusLabel: string
    focusText: string
    paragraphs: string[]
  }
  video: {
    eyebrow: string
    title: string
  }
  mission: {
    items: {
      title: string
      description: string
    }[]
  }
  team: {
    eyebrow: string
    title: string
    description: string
  }
}

export type FounderPageContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    badge: string
    title: string
    description: string
  }
  founder: {
    eyebrow: string
    name: string
    role: string
    paragraphs: string[]
    highlight: string
    quote: string
  }
}

export type LegalPageContent = {
  hero: {
    badge: string
    title: string
    highlight: string
    description: string
  }
  body: string
}

export const homeDefaultContent: HomePageContent = {
  popup: {
    enabled: true,
  },
  hero: {
    badge: "Admissions Open 2025",
    titlePrefix: "Your Future",
    titleHighlight: "Begins Abroad",
    titleSuffix: "",
    description:
      "Nepal\u2019s trusted gateway to world-class universities. End-to-end support for admissions, visas, and test prep \u2014 so you focus on what matters.",
    ctaLabel: "Check Your Eligibility",
    floatingStats: [
      {
        value: "700+",
        labelTop: "University",
        labelBottom: "Partners Worldwide",
      },
      {
        value: "6K+",
        labelTop: "Students",
        labelBottom: "Successfully Placed",
      },
    ],
  },
  statsBar: {
    items: [
      {
        value: "700+",
        label: "Global Partners",
      },
      {
        value: "6,000+",
        label: "Students Guided",
      },
      {
        value: "2019",
        label: "Founded",
      },
      {
        value: "15,000+",
        label: "Applications",
      },
    ],
  },
  destinations: {
    eyebrow: "Top Destinations",
    title: "Where Do You Want to Study?",
    viewAllLabel: "Explore All",
    items: [
      { name: "USA", image: "/destinations/usa.png" },
      { name: "Australia", image: "/destinations/australia.png" },
      { name: "Germany", image: "/destinations/germany.png" },
      { name: "Canada", image: "/destinations/canada.png" },
    ],
  },
  consultancy: {
    eyebrow: "About Bright Future Edu",
    title: "We Open Doors to Global Education",
    description:
      "From picking the right course to landing your visa \u2014 Bright Future Edu handles the heavy lifting. Founded by students who\u2019ve walked the same path, we bring honesty, hustle, and results.",
    stats: [
      { value: "98%", label: "Visa Success" },
      { value: "7+", label: "Years Experience" },
      { value: "50+", label: "Team Members" },
    ],
    formTitle: "Book a Free Session",
    formDescription: "Tell us what you\u2019re aiming for and we\u2019ll map out your next steps.",
    formButtonLabel: "Schedule Consultation",
  },
  middleCta: {
    eyebrow: "Ready to Go?",
    title: "Start Your Journey Today",
    description:
      "Our team of experts is dedicated to providing you with the best guidance and support for your international education journey.",
    primaryCtaLabel: "Contact Us",
    secondaryCtaLabel: "Our Services",
  },
  features: {
    eyebrow: "Our Services",
    title: "Everything You Need to Go Global",
    description:
      "Admissions coaching, visa guidance, English test prep, and post-arrival support \u2014 all under one roof.",
    items: [
      {
        title: "University Admissions",
        description: "End-to-end application support for 700+ partner universities across USA, UK, Australia, Canada, and Europe.",
      },
      {
        title: "Visa & Documentation",
        description: "Step-by-step visa filing, document review, and interview prep with a 98% success rate.",
      },
      {
        title: "Test Preparation",
        description: "IELTS, PTE, SAT, and Duolingo coaching designed to get you the scores you need.",
      },
      {
        title: "Pre & Post Departure",
        description: "From travel arrangements to accommodation support \u2014 we make your landing smooth.",
      },
    ],
  },
  blog: {
    eyebrow: "Insights",
    title: "Guides for Global Students",
    description: "Practical advice on admissions, visas, scholarships, and life abroad.",
  },
  partners: {
    titlePrefix: "Trusted",
    titleHighlight: "University",
    titleSuffix: "Partners",
    description:
      "We are official representatives of top-ranked institutions across the globe. Your ambition, their classrooms.",
  },
  testimonials: {
    eyebrow: "Success Stories",
    titlePrefix: "Real Students,",
    titleHighlight: "Real Results",
    description:
      "Hear from students who turned their study-abroad dreams into reality with Bright Future Edu.",
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Let\u2019s Talk About Your Future",
    description: "Reach out for a free consultation. No commitment, just clarity.",
    submitLabel: "Send Message",
    mapStatLabel: "Student Satisfaction",
    mapStatValue: "98%",
  },
  ctaJourney: {
    title: "Not Sure Where to Start?",
    description:
      "Book a free consultation and get a personalized roadmap for your study-abroad journey.",
    buttonLabel: "Book Free Consultation",
  },
}

export const termsDefaultContent: LegalPageContent = {
  hero: {
    badge: "Legal Framework",
    title: "Terms &",
    highlight: "Conditions",
    description: "Clear guidelines that outline how we work together and how to use our services.",
  },
  body: `
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using Bright Future Edu services, you agree to these Terms &amp; Conditions. If you do not agree, please discontinue use of our website and services.</p>
    <h2>2. Services</h2>
    <p>We provide education counseling, admissions support, and related services. Service availability may vary by country, program, or partner institution.</p>
    <h2>3. User Responsibilities</h2>
    <p>You agree to provide accurate, complete information and keep documents current. Any misuse, fraudulent submissions, or misrepresentation may lead to service refusal.</p>
    <h2>4. Third-Party Institutions</h2>
    <p>Admissions decisions are made solely by partner institutions. We facilitate applications but cannot guarantee acceptance, timelines, or outcomes.</p>
    <h2>5. Changes to Terms</h2>
    <p>We may update these terms to reflect service or legal changes. Continued use of the website after changes indicates acceptance of the updated terms.</p>
    <h3>Need clarity?</h3>
    <p>If you have questions about these terms, please reach out through the Contact page and our team will assist you.</p>
  `.trim(),
}

export const privacyDefaultContent: LegalPageContent = {
  hero: {
    badge: "Data Protection",
    title: "Privacy",
    highlight: "Policy",
    description: "How we collect, use, and protect your information across our services.",
  },
  body: `
    <h2>1. Information We Collect</h2>
    <p>We collect information you provide directly, such as contact details, academic history, and documents submitted through forms and applications.</p>
    <h2>2. How We Use Information</h2>
    <p>Your information is used to deliver counseling services, submit applications to partner institutions, and communicate updates relevant to your journey.</p>
    <h2>3. Sharing &amp; Disclosure</h2>
    <p>We share data only with trusted partners and service providers as required to deliver services. We do not sell personal information.</p>
    <h2>4. Data Security</h2>
    <p>We implement administrative and technical safeguards to protect your data. While no system is fully secure, we continuously improve our protections.</p>
    <h2>5. Your Choices</h2>
    <p>You may request updates or deletion of your information subject to applicable laws and institutional requirements.</p>
    <h3>Questions about privacy?</h3>
    <p>Contact us via the Contact page and we will assist you with privacy-related requests.</p>
  `.trim(),
}

export const aboutDefaultContent: AboutPageContent = {
  hero: {
    badge: "Institutional Grade Excellence",
    title: "About Us",
    description: "Empowering students to achieve their global academic dreams through expert guidance and support.",
  },
  whoWeAre: {
    eyebrow: "Who we are",
    titlePrimary: "Building Connections,",
    titleAccent: "Creating Impact",
    description:
      "Bright Future Edu offers accommodation services. 100% FREE Education Counselling and Application Processing. We bridge the gap between your aspirations and world-class educational opportunities.",
    tags: ["100% Free Counselling", "Accommodation Support", "Application Processing"],
    promiseTitle: "Our Promise",
    promiseText: "We bridge the gap between your aspirations and world-class educational opportunities.",
  },
  story: {
    eyebrow: "Our Story",
    title: "About us",
    focusLabel: "Our Focus",
    focusText: "Guidance that keeps pace with a fast moving world.",
    paragraphs: [
      "In today's fast moving world it is not at all possible or prudent to do all personal investments on your own. Only today's fast moving world it is not at all possible or prudent to do all personal investments on your own. One can't keep pace with the quick moving markets and data stream on an everyday promise can I keep pace with the quick moving markets and data stream on an everyday promise.",
      "In today's fast moving world it is not at all possible or prudent to do all personal investments on your own. One can't keep pace with the quick moving markets and data stream on an everyday promise.",
    ],
  },
  video: {
    eyebrow: "Inside Bright Future Edu",
    title: "A closer look at how we guide students.",
  },
  mission: {
    items: [
      {
        title: "Mission",
        description:
          "Our mission is to empower students through personalized guidance and seamless application processing.",
      },
      {
        title: "Values",
        description: "We prioritize integrity, excellence, and student-centric support in every step of our journey.",
      },
      {
        title: "Vision",
        description:
          "To be the most trusted portal for global education, creating a worldwide network of successful scholars.",
      },
    ],
  },
  team: {
    eyebrow: "Leadership",
    title: "Our Team",
    description: "Dedicated to guiding students at every step of their global education journey.",
  },
}

export const founderDefaultContent: FounderPageContent = {
  seo: {
    title: "Rajan Thapa | Founder of Bright Future Edu",
    description:
      "Learn about Rajan Thapa, Founder and Director of Bright Future Edu Education Consultancy, and his mission to empower Nepalese students globally.",
  },
  hero: {
    badge: "Founder Story",
    title: "The vision behind Bright Future Edu.",
    description:
      "What started as a personal dream to study abroad grew into a mission to help every Nepalese student access global education with confidence and clarity.",
  },
  founder: {
    eyebrow: "Meet the Founder",
    name: "Rajan Thapa",
    role: "Founder & Director - Bright Future Edu Education Consultancy",
    paragraphs: [
      "Rajan Thapa founded Bright Future Edu after experiencing the challenges of studying abroad firsthand. Having navigated complex application processes, visa requirements, and scholarship searches, he realized how many talented Nepalese students miss out due to lack of proper guidance.",
      "With over 5 years of experience in international education consulting, Rajan has helped 200+ students secure admissions to top universities across the UK, Australia, Canada, and the USA. His approach combines personalized mentorship with hands-on support throughout the entire journey.",
    ],
    highlight: "5+ years of expertise",
    quote: "Every student deserves a fair chance to compete globally — we're here to make that chance real.",
  },
}

function mergeDeep<T>(base: T, incoming: Partial<T> | undefined): T {
  if (incoming === undefined) {
    return base
  }

  if (Array.isArray(base)) {
    return (Array.isArray(incoming) ? (incoming as T) : base)
  }

  if (typeof base === "object" && base !== null) {
    const result: Record<string, any> = Array.isArray(base) ? [] : { ...base }
    const incomingRecord = (incoming ?? {}) as Record<string, any>

    Object.keys(base as Record<string, any>).forEach((key) => {
      result[key] = mergeDeep((base as Record<string, any>)[key], incomingRecord[key])
    })

    Object.keys(incomingRecord).forEach((key) => {
      if (!(key in result)) {
        result[key] = incomingRecord[key]
      }
    })

    return result as T
  }

  return (incoming ?? base) as T
}

export function mergeHomeContent(incoming?: Partial<HomePageContent>) {
  return mergeDeep(homeDefaultContent, incoming)
}

export function mergeAboutContent(incoming?: Partial<AboutPageContent>) {
  return mergeDeep(aboutDefaultContent, incoming)
}

export function mergeFounderContent(incoming?: Partial<FounderPageContent>) {
  return mergeDeep(founderDefaultContent, incoming)
}

export function mergeTermsContent(incoming?: Partial<LegalPageContent>) {
  return mergeDeep(termsDefaultContent, incoming)
}

export function mergePrivacyContent(incoming?: Partial<LegalPageContent>) {
  return mergeDeep(privacyDefaultContent, incoming)
}
