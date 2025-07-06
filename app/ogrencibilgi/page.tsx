"use client"

export default function OgrenciBilgi() {
  return (
    <div className="min-h-screen bg-[#f9fafc] flex flex-col">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white p-3 flex items-center shadow-md">
        <button
          onClick={() => window.history.back()}
          className="mr-3 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">Öğrenci Bilgi</h1>
      </div>

      {/* Iframe container */}
      <div className="h-[calc(100vh-60px)]">
        <iframe
          src="https://ogrencibilgisistemi.vercel.app/10d"
          className="w-full h-full border-0 block"
          title="Öğrenci Bilgi Sistemi"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
