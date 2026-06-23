"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, ImageIcon, Search } from "lucide-react"
import { MediaPickerDialog } from "@/components/media-picker-dialog"
import { ConfirmDialog } from "@/components/confirm-dialog"
import Image from "next/image"

export default function SuccessImagesPage() {
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<any[]>([])
  const [adding, setAdding] = useState(false)
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const [newImage, setNewImage] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    order: 0,
    status: "active" as const,
  })

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const res = await fetch("/api/success-images")
      const data = await res.json()
      setImages(data.images || [])
    } catch (error) {
      toast.error("Failed to load success images")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImage.imageUrl) {
      toast.error("Please select an image")
      return
    }
    setAdding(true)
    try {
      const res = await fetch("/api/success-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage),
      })
      if (res.ok) {
        toast.success("Success image added")
        setNewImage({
          title: "",
          description: "",
          imageUrl: "",
          category: "",
          order: 0,
          status: "active",
        })
        fetchImages()
      } else {
        toast.error("Failed to add image")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = (id: string) => {
    setPendingDeleteId(id)
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!pendingDeleteId) return
    try {
      const res = await fetch(`/api/success-images?id=${pendingDeleteId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        toast.success("Image deleted")
        fetchImages()
      } else {
        toast.error("Failed to delete")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setPendingDeleteId(null)
    }
  }

  const filteredImages = search
    ? images.filter(
        (img) =>
          img.title?.toLowerCase().includes(search.toLowerCase()) ||
          img.category?.toLowerCase().includes(search.toLowerCase())
      )
    : images

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Success Images</h1>
        <p className="text-muted-foreground text-lg">
          Manage gallery images displayed on the Success Stories page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Section */}
        <Card className="lg:col-span-1 h-fit sticky top-8">
          <CardHeader>
            <CardTitle className="text-xl">Add New Image</CardTitle>
            <CardDescription>
              Upload success story designs for the gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newImage.title}
                  onChange={(e) =>
                    setNewImage({ ...newImage, title: e.target.value })
                  }
                  placeholder="e.g. Study in UK - Accounting"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                <div className="flex gap-2">
                  <div
                    className="flex-1 h-10 px-3 bg-muted rounded-md flex items-center text-sm text-muted-foreground truncate cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    {newImage.imageUrl
                      ? newImage.imageUrl
                      : "Select from media..."}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                {newImage.imageUrl && (
                  <div className="mt-2 relative h-32 w-full bg-muted rounded-md overflow-hidden border"
                  >
                    <Image
                      src={newImage.imageUrl}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={newImage.description}
                  onChange={(e) =>
                    setNewImage({ ...newImage, description: e.target.value })
                  }
                  placeholder="Short caption..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={newImage.category}
                  onChange={(e) =>
                    setNewImage({ ...newImage, category: e.target.value })
                  }
                  placeholder="e.g. UK, Australia, Visa"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order</label>
                  <Input
                    type="number"
                    value={newImage.order}
                    onChange={(e) =>
                      setNewImage({
                        ...newImage,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={newImage.status}
                    onChange={(e) =>
                      setNewImage({
                        ...newImage,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={adding}>
                {adding ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Add Image
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {filteredImages.length} image
              {filteredImages.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredImages.length === 0 ? (
              <div className="col-span-full h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground"
              >
                <ImageIcon className="h-8 w-8 mb-2 opacity-20" />
                <p>No success images yet.</p>
              </div>
            ) : (
              filteredImages.map((img) => (
                <Card
                  key={img._id}
                  className="group overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-muted overflow-hidden"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        img._id && handleDelete(img._id.toString())
                      }
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm truncate">{img.title}</h3>
                    {img.category && (
                      <span className="text-xs text-muted-foreground">
                        {img.category}
                      </span>
                    )}
                    <span
                      className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        img.status === "active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      {img.status}
                    </span>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <MediaPickerDialog
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url) => setNewImage({ ...newImage, imageUrl: url })}
        currentImage={newImage.imageUrl}
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </div>
  )
}
