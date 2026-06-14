// MongoDB seed script for courses data
// Run this with: node scripts/seed-courses-data.js

const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "brightfuture"

async function seedData() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    console.log("\n=== Seeding courses ===")
    await db.collection("courses").deleteMany({})

    const courses = [
      {
        name: "Bachelor of Computer Science",
        slug: "bachelor-computer-science",
        description: "A comprehensive 4-year degree program covering programming, algorithms, data structures, software engineering, and artificial intelligence. Prepares students for careers in tech across the globe.",
        shortDescription: "4-year CS degree with AI, software engineering, and data structures.",
        status: "active",
        category: "Undergraduate",
        highlights: ["AI & Machine Learning", "Software Engineering", "Data Structures", "Cloud Computing"],
        icon: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "MBA in International Business",
        slug: "mba-international-business",
        description: "A 2-year master's program focused on global trade, cross-cultural management, finance, and strategic leadership. Designed for aspiring business leaders in multinational corporations.",
        shortDescription: "2-year MBA focusing on global trade and leadership.",
        status: "active",
        category: "Postgraduate",
        highlights: ["Global Strategy", "Cross-Cultural Management", "Finance", "Leadership"],
        icon: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bachelor of Nursing",
        slug: "bachelor-nursing",
        description: "A hands-on nursing degree with clinical placements in top hospitals. Covers anatomy, pharmacology, patient care, and healthcare management. High demand worldwide.",
        shortDescription: "Hands-on nursing degree with global clinical placements.",
        status: "active",
        category: "Healthcare",
        highlights: ["Clinical Placements", "Patient Care", "Pharmacology", "Healthcare Management"],
        icon: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Master of Data Science",
        slug: "master-data-science",
        description: "An advanced program in data analytics, machine learning, big data technologies, and statistical modeling. Perfect for students aiming for roles in tech, finance, and research.",
        shortDescription: "Advanced program in ML, big data, and statistical modeling.",
        status: "active",
        category: "Postgraduate",
        highlights: ["Machine Learning", "Big Data", "Statistical Modeling", "Python & R"],
        icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bachelor of Business Administration",
        slug: "bachelor-business-administration",
        description: "A foundational business degree covering marketing, accounting, economics, and entrepreneurship. Prepares students for diverse roles in management and startups.",
        shortDescription: "Foundation in marketing, accounting, economics, and entrepreneurship.",
        status: "active",
        category: "Undergraduate",
        highlights: ["Marketing", "Accounting", "Economics", "Entrepreneurship"],
        icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Master of Cybersecurity",
        slug: "master-cybersecurity",
        description: "A specialized master's in network security, ethical hacking, risk management, and digital forensics. Critical skills for protecting organizations in an increasingly digital world.",
        shortDescription: "Master's in network security, ethical hacking, and digital forensics.",
        status: "active",
        category: "Postgraduate",
        highlights: ["Network Security", "Ethical Hacking", "Risk Management", "Digital Forensics"],
        icon: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("courses").insertMany(courses)
    console.log(`✓ Inserted ${courses.length} courses`)

    console.log("\n========================================")
    console.log("🎉 Courses seed completed!")
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
