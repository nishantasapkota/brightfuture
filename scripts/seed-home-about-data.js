// MongoDB seed script for Home and About page data
// Run this with: node scripts/seed-home-about-data.js

const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "brightfuture"

async function seedData() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // 1. Seed page_contents for home, about, founder
    console.log("\n=== Seeding page_contents ===")
    await db.collection("page_contents").deleteMany({
      slug: { $in: ["home", "about", "founder"] }
    })

    const homeContent = {
      slug: "home",
      content: {
        popup: { enabled: true },
        hero: {
          badge: "Admissions Open 2025",
          titlePrefix: "Your Future",
          titleHighlight: "Begins Abroad",
          titleSuffix: "",
          description: "Nepal's trusted gateway to world-class universities. End-to-end support for admissions, visas, and test prep — so you focus on what matters.",
          ctaLabel: "Check Your Eligibility",
          floatingStats: [
            { value: "700+", labelTop: "University", labelBottom: "Partners Worldwide" },
            { value: "6K+", labelTop: "Students", labelBottom: "Successfully Placed" },
          ],
        },
        statsBar: {
          items: [
            { value: "700+", label: "Global Partners" },
            { value: "6,000+", label: "Students Guided" },
            { value: "2019", label: "Founded" },
            { value: "15,000+", label: "Applications" },
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
          description: "From picking the right course to landing your visa — Bright Future Edu handles the heavy lifting. Founded by students who've walked the same path, we bring honesty, hustle, and results.",
          stats: [
            { value: "98%", label: "Visa Success" },
            { value: "7+", label: "Years Experience" },
            { value: "50+", label: "Team Members" },
          ],
          formTitle: "Book a Free Session",
          formDescription: "Tell us what you're aiming for and we'll map out your next steps.",
          formButtonLabel: "Schedule Consultation",
        },
        middleCta: {
          eyebrow: "Ready to Go?",
          title: "Start Your Journey Today",
          description: "Our team of experts is dedicated to providing you with the best guidance and support for your international education journey.",
          primaryCtaLabel: "Contact Us",
          secondaryCtaLabel: "Our Services",
        },
        features: {
          eyebrow: "Our Services",
          title: "Everything You Need to Go Global",
          description: "Admissions coaching, visa guidance, English test prep, and post-arrival support — all under one roof.",
          items: [
            { title: "University Admissions", description: "End-to-end application support for 700+ partner universities across USA, UK, Australia, Canada, and Europe." },
            { title: "Visa & Documentation", description: "Step-by-step visa filing, document review, and interview prep with a 98% success rate." },
            { title: "Test Preparation", description: "IELTS, PTE, SAT, and Duolingo coaching designed to get you the scores you need." },
            { title: "Pre & Post Departure", description: "From travel arrangements to accommodation support — we make your landing smooth." },
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
          description: "We are official representatives of top-ranked institutions across the globe. Your ambition, their classrooms.",
        },
        testimonials: {
          eyebrow: "Success Stories",
          titlePrefix: "Real Students,",
          titleHighlight: "Real Results",
          description: "Hear from students who turned their study-abroad dreams into reality with Bright Future Edu.",
        },
        contact: {
          eyebrow: "Get in Touch",
          title: "Let's Talk About Your Future",
          description: "Reach out for a free consultation. No commitment, just clarity.",
          submitLabel: "Send Message",
          mapStatLabel: "Student Satisfaction",
          mapStatValue: "98%",
        },
        ctaJourney: {
          title: "Not Sure Where to Start?",
          description: "Book a free consultation and get a personalized roadmap for your study-abroad journey.",
          buttonLabel: "Book Free Consultation",
        },
      },
      updatedAt: new Date(),
    }

    const aboutContent = {
      slug: "about",
      content: {
        hero: {
          badge: "Institutional Grade Excellence",
          title: "About Us",
          description: "Empowering students to achieve their global academic dreams through expert guidance and support.",
        },
        whoWeAre: {
          eyebrow: "Who we are",
          titlePrimary: "Building Connections,",
          titleAccent: "Creating Impact",
          description: "Bright Future Edu offers accommodation services. 100% FREE Education Counselling and Application Processing. We bridge the gap between your aspirations and world-class educational opportunities.",
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
            { title: "Mission", description: "Our mission is to empower students through personalized guidance and seamless application processing." },
            { title: "Values", description: "We prioritize integrity, excellence, and student-centric support in every step of our journey." },
            { title: "Vision", description: "To be the most trusted portal for global education, creating a worldwide network of successful scholars." },
          ],
        },
        team: {
          eyebrow: "Leadership",
          title: "Our Team",
          description: "Dedicated to guiding students at every step of their global education journey.",
        },
      },
      updatedAt: new Date(),
    }

    const founderContent = {
      slug: "founder",
      content: {
        seo: {
          title: "Rajan Thapa | Founder of Bright Future Edu",
          description: "Learn about Rajan Thapa, Founder and Director of Bright Future Edu Education Consultancy, and his mission to empower Nepalese students globally.",
        },
        hero: {
          badge: "Founder Story",
          title: "The vision behind Bright Future Edu.",
          description: "What started as a personal dream to study abroad grew into a mission to help every Nepalese student access global education with confidence and clarity.",
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
      },
      updatedAt: new Date(),
    }

    await db.collection("page_contents").insertMany([homeContent, aboutContent, founderContent])
    console.log("✓ Inserted home, about, founder page contents")

    // 2. Seed bod_members (team)
    console.log("\n=== Seeding bod_members ===")
    await db.collection("bod_members").deleteMany({})

    const bodMembers = [
      {
        name: "Rajan Thapa",
        role: "Founder & Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
        level: 1,
        socials: { mail: "rajan@brightfutureedu.com.np", linkedin: "https://linkedin.com" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ramesh Adhikari",
        role: "Managing Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        level: 1,
        socials: { mail: "ramesh@brightfutureedu.com.np", linkedin: "https://linkedin.com" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sita Gurung",
        role: "Head of Admissions",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
        level: 2,
        socials: { mail: "sita@brightfutureedu.com.np" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Prakash Thapa",
        role: "Visa Consultant",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
        level: 2,
        socials: { mail: "prakash@brightfutureedu.com.np", linkedin: "https://linkedin.com" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anita Sharma",
        role: "Student Counselor",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
        level: 2,
        socials: { mail: "anita@brightfutureedu.com.np" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Binod Karki",
        role: "Test Prep Coordinator",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        level: 2,
        socials: { mail: "binod@brightfutureedu.com.np" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maya Tamang",
        role: "Operations Manager",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
        level: 2,
        socials: { mail: "maya@brightfutureedu.com.np" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sunil Basnet",
        role: "Marketing Lead",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
        level: 2,
        socials: { mail: "sunil@brightfutureedu.com.np", linkedin: "https://linkedin.com" },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("bod_members").insertMany(bodMembers)
    console.log(`✓ Inserted ${bodMembers.length} BOD members`)

    // 3. Seed testimonials
    console.log("\n=== Seeding testimonials ===")
    await db.collection("testimonials").deleteMany({})

    const testimonials = [
      {
        name: "Manu Arora",
        designation: "Product Manager at TechFlow",
        description: "The attention to detail and innovative solutions provided by this team are truly world-class. Highly recommended for anyone looking to scale their business.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sarah Chen",
        designation: "CTO at LogiK",
        description: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "James Kim",
        designation: "Engineering Lead at DataScale",
        description: "The support team is amazing. They helped us through every step of the integration process.",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("testimonials").insertMany(testimonials)
    console.log(`✓ Inserted ${testimonials.length} testimonials`)

    // 4. Seed destinations
    console.log("\n=== Seeding destinations ===")
    await db.collection("destinations").deleteMany({})

    const destinations = [
      {
        name: "United States",
        slug: "usa",
        description: "The United States offers world-renowned universities, diverse cultural experiences, and cutting-edge research opportunities. From Ivy League institutions to state universities, there's a perfect fit for every student.",
        shortDescription: "World-class universities and diverse cultural experiences",
        metaTitle: "Study in USA | Bright Future Edu",
        metaDescription: "Explore top US universities with Bright Future Edu. Expert guidance for admissions, visas, and scholarships.",
        status: "active",
        highlights: ["Ivy League Opportunities", "STEM Programs", "Scholarship Options", "Post-Study Work Visa"],
        popularPrograms: ["Computer Science", "Business Administration", "Engineering", "Data Science"],
        image: "/destinations/usa.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Australia",
        slug: "australia",
        description: "Australia is known for its high-quality education system, relaxed lifestyle, and stunning natural landscapes. Australian universities consistently rank among the best in the world.",
        shortDescription: "High-quality education with a relaxed lifestyle",
        metaTitle: "Study in Australia | Bright Future Edu",
        metaDescription: "Discover Australian universities with Bright Future Edu. Your pathway to world-class education Down Under.",
        status: "active",
        highlights: ["QS Top Ranked Universities", "Post-Study Work Rights", "Multicultural Environment", "Research Excellence"],
        popularPrograms: ["Nursing", "Information Technology", "Accounting", "Hospitality Management"],
        image: "/destinations/australia.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Germany",
        slug: "germany",
        description: "Germany offers tuition-free education at public universities, strong industry connections, and a central European location perfect for travel and career opportunities.",
        shortDescription: "Tuition-free education with strong industry links",
        metaTitle: "Study in Germany | Bright Future Edu",
        metaDescription: "Study in Germany tuition-free with Bright Future Edu. Expert support for admissions and visa processing.",
        status: "active",
        highlights: ["Tuition-Free Public Universities", "Strong Industry Links", "Central European Location", "English-Taught Programs"],
        popularPrograms: ["Mechanical Engineering", "Automotive Engineering", "Business Management", "Computer Science"],
        image: "/destinations/germany.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Canada",
        slug: "canada",
        description: "Canada is celebrated for its welcoming environment, excellent quality of life, and top-tier universities. It's a top destination for students seeking permanent residency after graduation.",
        shortDescription: "Welcoming environment with pathway to permanent residency",
        metaTitle: "Study in Canada | Bright Future Edu",
        metaDescription: "Start your Canadian education journey with Bright Future Edu. Admissions, visas, and settlement support.",
        status: "active",
        highlights: ["Pathway to PR", "Affordable Tuition", "Safe & Welcoming", "Work While Studying"],
        popularPrograms: ["Business Analytics", "Health Sciences", "Engineering", "Environmental Science"],
        image: "/destinations/canada.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("destinations").insertMany(destinations)
    console.log(`✓ Inserted ${destinations.length} destinations`)

    // 5. Seed partners
    console.log("\n=== Seeding partners ===")
    await db.collection("partners").deleteMany({})

    const partners = [
      { name: "Harvard University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png", website: "https://harvard.edu", order: 1, createdAt: new Date() },
      { name: "Stanford University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Stanford_Logo.svg/1200px-Stanford_Logo.svg.png", website: "https://stanford.edu", order: 2, createdAt: new Date() },
      { name: "MIT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png", website: "https://mit.edu", order: 3, createdAt: new Date() },
      { name: "University of Melbourne", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/University_of_Melbourne_logo.svg/1200px-University_of_Melbourne_logo.svg.png", website: "https://unimelb.edu.au", order: 4, createdAt: new Date() },
      { name: "Technical University of Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Technische_Universit%C3%A4t_M%C3%BCnchen_logo.svg/1200px-Technische_Universit%C3%A4t_M%C3%BCnchen_logo.svg.png", website: "https://tum.de", order: 5, createdAt: new Date() },
      { name: "University of Toronto", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_logo.svg/1200px-Utoronto_logo.svg.png", website: "https://utoronto.ca", order: 6, createdAt: new Date() },
      { name: "University of Sydney", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/University_of_Sydney_logo.svg/1200px-University_of_Sydney_logo.svg.png", website: "https://sydney.edu.au", order: 7, createdAt: new Date() },
      { name: "Imperial College London", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Imperial_College_London_logo.svg/1200px-Imperial_College_London_logo.svg.png", website: "https://imperial.ac.uk", order: 8, createdAt: new Date() },
    ]

    await db.collection("partners").insertMany(partners)
    console.log(`✓ Inserted ${partners.length} partners`)

    // 6. Seed business_details
    console.log("\n=== Seeding business_details ===")
    await db.collection("business_details").deleteMany({})

    const businessDetails = {
      name: "Bright Future Edu Education Consultancy Pvt. Ltd.",
      logo: "/logo.png",
      address: "Kathmandu, Nepal",
      emails: ["info@brightfutureedu.com.np", "support@brightfutureedu.com.np"],
      phones: ["+977-1-4000000", "+977-9849000000"],
      offices: [
        {
          label: "Head Office",
          address: "Thamel, Kathmandu, Nepal",
          emails: ["info@brightfutureedu.com.np"],
          phones: ["+977-1-4000000"],
        },
        {
          label: "Branch Office",
          address: "Pokhara, Nepal",
          emails: ["pokhara@brightfutureedu.com.np"],
          phones: ["+977-61-400000"],
        },
      ],
      socialLinks: {
        facebook: "https://facebook.com/brightfutureedu",
        twitter: "https://twitter.com/brightfutureedu",
        linkedin: "https://linkedin.com/company/brightfutureedu",
        instagram: "https://instagram.com/brightfutureedu",
        youtube: "https://youtube.com/brightfutureedu",
      },
      updatedAt: new Date(),
    }

    await db.collection("business_details").insertOne(businessDetails)
    console.log("✓ Inserted business details")

    // 7. Seed services (used by home page)
    console.log("\n=== Seeding services ===")
    await db.collection("services").deleteMany({})

    const services = [
      {
        name: "University Admissions",
        slug: "university-admissions",
        description: "End-to-end application support for 700+ partner universities across USA, UK, Australia, Canada, and Europe. We handle everything from course selection to offer acceptance.",
        shortDescription: "Complete application support for global universities",
        status: "active",
        category: "Core Service",
        highlights: ["700+ Partner Universities", "Course Selection Guidance", "Application Review", "Offer Negotiation"],
        icon: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400",
        image: "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=800",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Visa & Documentation",
        slug: "visa-documentation",
        description: "Step-by-step visa filing, document review, and interview prep with a 98% success rate. Our experts ensure your application is flawless.",
        shortDescription: "98% visa success rate with expert guidance",
        status: "active",
        category: "Core Service",
        highlights: ["98% Success Rate", "Document Review", "Interview Prep", "Post-Visa Support"],
        icon: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400",
        image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=800",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Test Preparation",
        slug: "test-preparation",
        description: "IELTS, PTE, SAT, and Duolingo coaching designed to get you the scores you need. Personalized study plans and mock tests included.",
        shortDescription: "IELTS, PTE, SAT, and Duolingo coaching",
        status: "active",
        category: "Core Service",
        highlights: ["IELTS Coaching", "PTE Preparation", "SAT Classes", "Mock Tests"],
        icon: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
        image: "https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&w=800",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pre & Post Departure",
        slug: "pre-post-departure",
        description: "From travel arrangements to accommodation support — we make your landing smooth. Includes airport pickup and initial settlement assistance.",
        shortDescription: "Travel and accommodation support",
        status: "active",
        category: "Support Service",
        highlights: ["Airport Pickup", "Accommodation Search", "Bank Account Setup", "SIM Card Assistance"],
        icon: "https://images.pexels.com/photos/207682/pexels-photo-207682.jpeg?auto=compress&cs=tinysrgb&w=400",
        image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("services").insertMany(services)
    console.log(`✓ Inserted ${services.length} services`)

    // 8. Seed blogs (used by home page)
    console.log("\n=== Seeding blogs ===")
    await db.collection("blogs").deleteMany({})

    const blogs = [
      {
        title: "How to Choose the Right University Abroad",
        slug: "choose-right-university-abroad",
        metaTitle: "How to Choose the Right University Abroad | Bright Future Edu",
        metaDescription: "Expert tips on selecting the perfect university for your study abroad journey.",
        content: "# How to Choose the Right University Abroad\n\nChoosing the right university is one of the most important decisions you'll make...\n\n## Consider Your Goals\n\nStart by defining what you want to achieve...",
        excerpt: "Expert tips on selecting the perfect university for your study abroad journey.",
        author: "Ashim Sharma Mainali",
        status: "published",
        featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
        tags: ["Study Abroad", "University Selection", "Tips"],
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      },
      {
        title: "IELTS vs PTE: Which Test Should You Take?",
        slug: "ielts-vs-pte-comparison",
        metaTitle: "IELTS vs PTE: Which Test Should You Take? | Bright Future Edu",
        metaDescription: "A detailed comparison of IELTS and PTE to help you choose the right English test.",
        content: "# IELTS vs PTE: Which Test Should You Take?\n\nBoth IELTS and PTE are widely accepted English proficiency tests...",
        excerpt: "A detailed comparison of IELTS and PTE to help you choose the right English test.",
        author: "Sita Gurung",
        status: "published",
        featuredImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
        tags: ["IELTS", "PTE", "English Tests"],
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      },
      {
        title: "Top Scholarships for Nepali Students in 2025",
        slug: "top-scholarships-nepali-students-2025",
        metaTitle: "Top Scholarships for Nepali Students in 2025 | Bright Future Edu",
        metaDescription: "Discover the best scholarship opportunities for Nepali students studying abroad in 2025.",
        content: "# Top Scholarships for Nepali Students in 2025\n\nScholarships can significantly reduce the financial burden...",
        excerpt: "Discover the best scholarship opportunities for Nepali students studying abroad in 2025.",
        author: "Prakash Thapa",
        status: "published",
        featuredImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop",
        tags: ["Scholarships", "Funding", "2025"],
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      },
    ]

    await db.collection("blogs").insertMany(blogs)
    console.log(`✓ Inserted ${blogs.length} blogs`)

    console.log("\n========================================")
    console.log("🎉 Seed completed successfully!")
    console.log("========================================")
    console.log("Collections seeded:")
    console.log("  • page_contents (home, about, founder)")
    console.log("  • bod_members (8 team members)")
    console.log("  • testimonials (3 testimonials)")
    console.log("  • destinations (4 destinations)")
    console.log("  • partners (8 university partners)")
    console.log("  • business_details (1 record)")
    console.log("  • services (4 services)")
    console.log("  • blogs (3 blogs)")
    console.log("========================================")

  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await client.close()
    console.log("\nDatabase connection closed.")
    process.exit(0)
  }
}

seedData()
