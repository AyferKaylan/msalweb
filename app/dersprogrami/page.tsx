"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function DersProgrami() {
  const [timestamp, setTimestamp] = useState("")

  useEffect(() => {
    // Generate timestamp to prevent caching
    setTimestamp(new Date().getTime().toString())
  }, [])

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
        <h1 className="text-lg font-bold">Ders Programı</h1>
      </div>

      {/* Image container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-full overflow-auto">
          <Image
            src={`https://www.dropbox.com/scl/fi/rjtdws2dgl3cjtt86ihlz/ders-program-9d_page-0001.jpg?rlkey=h8dv51bqck0ogo51lweeqp9o2&st=9v7la37g&dl=1&t=${timestamp}`}
            alt="Ders Programı"
            width={1000}
            height={1414}
            className="max-w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}
