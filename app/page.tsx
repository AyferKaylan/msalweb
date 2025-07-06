"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [pageStates, setPageStates] = useState({})
  const { toast } = useToast()
  const router = useRouter()

  // Function to clear cookies
  const clearCookies = () => {
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
    }
  }

  // Function to clear storage
  const clearStorage = () => {
    localStorage.clear()
    sessionStorage.clear()
  }

  // Function to clear browser cache
  const clearBrowserCache = () => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      })
    }
    clearCookies()
    clearStorage()
  }

  // Function to handle button click
  const handleButtonClick = (href, title) => {
    clearCookies()
    clearStorage()

    // Handle internal navigation
    if (href === "odevler.html") {
      router.push("/odevler")
    } else if (href === "yazilitarihleri.html") {
      router.push("/yazilitarihleri")
    } else if (href === "dersprogrami.html") {
      router.push("/dersprogrami")
    } else if (href === "e-cevap.html") {
      router.push("/e-cevap")
    } else if (href === "ogrencibilgi.html") {
      router.push("/ogrencibilgi")
    } else if (href === "https://brtplus.wixsite.com/dersmatik/forum/9-sinif") {
      router.push("/yaziliornekleri")
    } else {
      // External link
      window.location.href = href
    }
  }

  // Function to fetch document from Google Docs
  const fetchDocument = async () => {
    const googleDocUrl =
      "https://docs.google.com/document/d/e/2PACX-1vTxv7qeD1iUiLBuXPNJ5S9oVMn1ui5gzH70sigEjbaJfzEoStBmSWxLGnma52MWZifz3qmIJdo_E7vu/pub"
    const cacheBuster = new Date().getTime()

    try {
      const response = await fetch(`${googleDocUrl}?nocache=${cacheBuster}`)
      const text = await response.text()

      const parser = new DOMParser()
      const doc = parser.parseFromString(text, "text/html")
      const content = doc.body.innerText

      return content
    } catch (error) {
      console.error("Error fetching document:", error)
      return ""
    }
  }

  // Function to extract page states
  const extractPageStates = (content) => {
    const states = {}
    const regex = /Sayfa (\d+):\s*(ON|OFF|DEFAULT)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      const pageNumber = match[1]
      const state = match[2]
      states[`Sayfa ${pageNumber}`] = state
    }

    return states
  }

  // Setup buttons
  useEffect(() => {
    const setupButtons = async () => {
      clearBrowserCache()

      try {
        const docContent = await fetchDocument()
        const states = extractPageStates(docContent)
        setPageStates(states)
        setLoading(false)
      } catch (error) {
        console.error("Error setting up buttons:", error)
        setLoading(false)
      }
    }

    setupButtons()
  }, [])

  // Button data
  const buttons = [
    {
      title: "Ödevler",
      href: "odevler.html",
      page: "Sayfa 1",
      imgSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9gyo2d2.jpeg-dohPmT8ih0nn3rBTrF9hDxThRpNe81.png",
    },
    {
      title: "E-Cevap",
      href: "e-cevap.html",
      page: "Sayfa 2",
      imgSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aov726t.jpeg-eY20X4izgS3qELLXRba2vWO15kZLnd.png",
    },
    {
      title: "Öğrenci Bilgi",
      href: "ogrencibilgi.html",
      page: "Sayfa 3",
      imgSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4alxyw6.jpeg-uA1Lc0Ad3DgJrIr1pi1pCdGShIWNnw.png",
    },
    {
      title: "Yazılı Tarihleri",
      href: "yazilitarihleri.html",
      page: "Sayfa 4",
      imgSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mbbwvi6.jpeg-dXtekYYVM5HNIhxhTsCWamYte3d6BR.png",
    },
    {
      title: "Yazılı Örnekleri",
      href: "https://brtplus.wixsite.com/dersmatik/forum/9-sinif",
      page: "Sayfa 5",
      imgSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6jywu8d.jpeg-noQqYo9DnF6VdXnbNY6nOzwsSJunoj.png",
    },
    {
      title: "Ders Programı",
      href: "dersprogrami.html",
      page: "Sayfa 6",
      imgSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/po59q66.jpeg-ansfdmYIBC9dQwLakz6mjw01bAvXxi.png",
    },
  ]

  // Check if button is disabled - sadece pageState'e göre kontrol et
  const isButtonDisabled = (pageState) => {
    return pageState === "DEFAULT"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with just text (no background image) */}
      <div className="bg-black text-white py-3 px-5 text-left text-2xl font-semibold flex justify-between items-center">
        <span>MSAL Öğrenci</span>
        <span className="text-sm font-normal">10/D</span>
      </div>

      {/* Loading text */}
      {loading ? (
        <div className="text-base text-gray-600 mt-5 font-normal">Güncelleniyor...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3 mt-2 p-3 max-w-4xl mx-auto">
          {buttons.map((button, index) => {
            const pageState = pageStates[button.page] || "DEFAULT"
            const disabled = pageState === "DEFAULT"

            if (pageState === "OFF") {
              return null
            }

            return (
              <div
                key={index}
                className={`w-[45%] sm:w-[30%] md:w-[22%] aspect-[1/1.2] rounded-2xl overflow-hidden ${
                  disabled ? "opacity-70" : ""
                }`}
                onClick={() => {
                  if (pageState !== "DEFAULT") {
                    handleButtonClick(button.href, button.title)
                  }
                }}
              >
                <div
                  className={`flex flex-col items-center justify-center h-full w-full 
                    bg-gradient-to-b from-blue-400 to-blue-600
                    text-white no-underline transition-all duration-300 shadow-lg
                    active:scale-95 active:shadow-md`}
                >
                  <div className="w-3/5 h-auto mb-2 flex items-center justify-center p-3">
                    <Image
                      src={button.imgSrc || "/placeholder.svg"}
                      alt={button.title}
                      width={100}
                      height={100}
                      className="w-full h-auto"
                    />
                  </div>
                  <span className="text-base font-semibold">{button.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4">Sürüm 4.4 | HBK</div>
    </div>
  )
}
