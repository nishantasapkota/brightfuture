import { NextResponse } from "next/server"
import {
  getSuccessImages,
  getSuccessImagesCount,
  createSuccessImage,
  deleteSuccessImage,
} from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const search = searchParams.get("search") || ""
    const skip = (page - 1) * limit

    const [images, total] = await Promise.all([
      getSuccessImages(limit, skip, search),
      getSuccessImagesCount(search),
    ])

    return NextResponse.json({
      images,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[SuccessImages API] GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch success images" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const body = await request.json()
    const result = await createSuccessImage(body)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("[SuccessImages API] POST Error:", error)
    return NextResponse.json({ error: "Failed to create success image" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    await deleteSuccessImage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SuccessImages API] DELETE Error:", error)
    return NextResponse.json({ error: "Failed to delete success image" }, { status: 500 })
  }
}
