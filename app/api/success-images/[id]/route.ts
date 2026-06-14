import { NextResponse } from "next/server"
import { getSuccessImageById, updateSuccessImage } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export const runtime = "nodejs"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const image = await getSuccessImageById(id)
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }
    return NextResponse.json({ image })
  } catch (error) {
    console.error("[SuccessImages API] GET by ID Error:", error)
    return NextResponse.json({ error: "Failed to fetch success image" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const { id } = await params
    const body = await request.json()
    await updateSuccessImage(id, body)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SuccessImages API] PUT Error:", error)
    return NextResponse.json({ error: "Failed to update success image" }, { status: 500 })
  }
}
