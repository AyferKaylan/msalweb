"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Odevler() {
  const [content, setContent] = useState("Metin yükleniyor...")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isButtonHidden, setIsButtonHidden] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [isEasterEggClicked, setIsEasterEggClicked] = useState(false)

  const googleDocUrl =
    "https://docs.google.com/document/d/e/2PACX-1vRsLfyGgx_g-avP3h8OD5dshEA-Mftmqj4PAtJ8OAYIUhSQMdVCHgi_PYpEDniG2DHRtoX6k2lyVV-n/pub"

  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Load content
    loadText()

    // Set button visibility timeout
    const timeout = setTimeout(() => {
      setIsButtonHidden(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", isDarkMode ? "light" : "dark")

    // Reset button visibility
    setIsButtonHidden(false)
    const timeout = setTimeout(() => {
      setIsButtonHidden(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }

  const loadText = async () => {
    if (navigator.onLine) {
      try {
        const cacheBuster = new Date().getTime()
        const response = await fetch(`${googleDocUrl}?nocache=${cacheBuster}`)

        if (!response.ok) {
          throw new Error("Metin indirilemedi.")
        }

        const data = await response.text()

        let plainText = data
          .replace(/<script.*?<\/script>/gs, "")
          .replace(/<style.*?<\/style>/gs, "")
          .replace(/<[^>]+>/g, "")
          .trim()

        plainText = plainText.replace(/@/g, "<br>")

        const unwantedTexts = [
          "ödevler",
          "Google Dokümanlar kullanılarak yayınlandı",
          "Kötüye kullanım bildir",
          "Daha fazla bilgi edinin",
          "5 dakikada bir otomatik olarak güncellenir",
        ]

        unwantedTexts.forEach((text) => {
          plainText = plainText.replace(new RegExp(text, "gi"), "")
        })

        if (plainText) {
          localStorage.setItem("textData", plainText)
          setContent(plainText)
        } else {
          setContent("Metin yüklenemedi. Lütfen daha sonra tekrar deneyin.")
        }
      } catch (error) {
        console.error("Bir hata oluştu:", error)
        setContent(`Metin yüklenirken bir hata oluştu: ${error.message}`)
      }
    } else {
      const savedText = localStorage.getItem("textData")
      if (savedText) {
        setContent(savedText)
      } else {
        setContent("İnternet bağlantısı yok ve daha önce kaydedilmiş bir metin bulunmuyor.")
      }
    }
  }

  const showRecepHoca = () => {
    if (isEasterEggClicked) return

    setIsEasterEggClicked(true)
    setShowEasterEgg(true)

    // Play audio
    const audio = new Audio("/rcp.mp3")
    audio.play()

    // Hide after 3.5 seconds
    setTimeout(() => {
      setShowEasterEgg(false)
      setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
      }, 1000)
    }, 3500)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#1e1e2f] text-[#e0e0e0]" : "bg-[#f9fafc] text-[#333]"}`}>
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
        <h1 className="text-lg font-bold">Ödevler</h1>
      </div>

      {/* Content */}
      <div className="flex justify-center items-start min-h-[calc(100vh-120px)] p-5 mt-5">
        <div
          className={`max-w-[800px] ${
            isDarkMode ? "bg-[#2a2a3b] text-[#e0e0e0]" : "bg-white text-[#333]"
          } rounded-xl shadow-lg p-7 text-base leading-7`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Footer */}
      <div className="text-center p-3 text-sm text-gray-500">
        Son Güncelleme: {new Date().toLocaleDateString("tr-TR")} {new Date().toLocaleTimeString("tr-TR")}
        <br />
        <span id="special-text" className="cursor-pointer" onClick={showRecepHoca}></span>
      </div>

      {/* Theme toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={`fixed bottom-5 right-5 rounded-full w-12 h-12 bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white border-none shadow-lg transition-all duration-300 hover:scale-110 ${
          isButtonHidden ? "opacity-30" : "opacity-100"
        }`}
        onClick={toggleTheme}
        onMouseEnter={() => setIsButtonHidden(false)}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      {/* Easter egg */}
      {showEasterEgg && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative">
            <Image
              src="/rcp.png"
              alt="Recep Hoca"
              width={300}
              height={300}
              className="rounded-lg max-w-[80%] animate-fadeIn"
            />
          </div>
        </div>
      )}
    </div>
  )
}
