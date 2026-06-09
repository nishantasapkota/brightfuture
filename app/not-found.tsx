import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(135deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>
      <div className="relative z-10 text-center px-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">Error 404</p>
        <h1 className="text-9xl font-extrabold text-white/5">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white -mt-6 mb-4">Page Not Found</h2>
        <p className="text-white/40 max-w-md mx-auto mb-8">Sorry, we could not find the page you are looking for. It might have been moved or does not exist.</p>
        <div className="flex justify-center">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-500 text-white px-6 h-12 rounded-xl text-[13px] font-bold shadow-lg shadow-red-600/15">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
