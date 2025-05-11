import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sayfa Bulunamadı</h2>
      <p className="text-gray-500 mb-8 max-w-md">Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</p>
      <Link href="/">
        <Button className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  )
}

