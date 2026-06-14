require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") })
const { MongoClient, ObjectId } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/brightfuture"

const successImages = [
  {
    _id: new ObjectId(),
    title: "UK Visa Granted - Rima Khatri",
    description: "Congratulations to Ms. Rima Khatri for UK Visa Grant. Bachelor of Business at University of Roehampton, London.",
    imageUrl: "/success-stories/rima-khatri-uk.jpg",
    category: "UK",
    order: 1,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Australia Visa Grant - Karmu Tamang",
    description: "Congratulations to Ms. Karmu Tamang for Australia Visa Grant. MPA/MBA at Holmes Institute, Sydney Australia.",
    imageUrl: "/success-stories/karmu-tamang-australia.jpg",
    category: "Australia",
    order: 2,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Australia Visa Approved - Ashish Karki",
    description: "Congratulations to Ashish Karki for Australia Visa Approval.",
    imageUrl: "/success-stories/ashish-karki-australia.jpg",
    category: "Australia",
    order: 3,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Australia Visa Granted - Kamal Prasad Timalsaina",
    description: "Congratulations to Kamal Prasad Timalsaina for Australia Visa Grant. Bachelor of Information Technology (IT).",
    imageUrl: "/success-stories/kamal-timalsaina-australia.jpg",
    category: "Australia",
    order: 4,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Study in UK - Accounting & Management",
    description: "BSc Hons Accounting with Management - 2.8 GPA accepted. IELTS 6.0 | 5.5. Intake Sep 2024.",
    imageUrl: "/page-headers/uk-student-contact.png",
    category: "UK",
    order: 5,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Study in UK - Computing Systems",
    description: "BSc Hons Computing Systems - Gap accepted from 2017 onward. PTE 55 | 51.",
    imageUrl: "/page-headers/digital-student.png",
    category: "UK",
    order: 6,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Study in Australia - Master's Programs",
    description: "Master's student success story. Full visa and admission support provided.",
    imageUrl: "/page-headers/student-orange.png",
    category: "Australia",
    order: 7,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Study in Canada - Bachelor's Admission",
    description: "Bachelor's student in Canada with scholarship guidance and visa approval.",
    imageUrl: "/banner.jpeg",
    category: "Canada",
    order: 8,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "IELTS Success - 7.5 Band Score",
    description: "Student achieved 7.5 band in IELTS with our test preparation program.",
    imageUrl: "/placeholder-logo.png",
    category: "Test Prep",
    order: 9,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    title: "Visa Approved - USA F-1",
    description: "USA student visa approved after comprehensive documentation support.",
    imageUrl: "/page-headers/counseling-session.png",
    category: "Visa",
    order: 10,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seed() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db("brightfuture")

  const collection = db.collection("success_images")

  // Clear existing
  await collection.deleteMany({})

  // Insert seed data
  const result = await collection.insertMany(successImages)
  console.log(`✅ Seeded ${result.insertedCount} success images`)
  console.log("\n⚠️  NOTE: The 4 new real-student entries use placeholder paths:")
  console.log("   /success-stories/rima-khatri-uk.jpg")
  console.log("   /success-stories/karmu-tamang-australia.jpg")
  console.log("   /success-stories/ashish-karki-australia.jpg")
  console.log("   /success-stories/kamal-timalsaina-australia.jpg")
  console.log("\n   Please upload the actual images via Admin → Success Images")
  console.log("   or place them in the public/success-stories/ folder.")

  await client.close()
}

seed().catch(console.error)
