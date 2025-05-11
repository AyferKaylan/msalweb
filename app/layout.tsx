import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MSAL Öğrenci",
  description: "Öğrenci bilgi sistemi",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-36x36.png", sizes: "36x36", type: "image/png" },
      { url: "/android-icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/android-icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/ms-icon-70x70.png", sizes: "70x70", type: "image/png" },
      { url: "/ms-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/ms-icon-150x150.png", sizes: "150x150", type: "image/png" },
      { url: "/ms-icon-310x310.png", sizes: "310x310", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-icon.png", sizes: "180x180" },
      { url: "/apple-icon-precomposed.png", sizes: "180x180" },
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  appleWebApp: {
    title: "MSAL Öğrenci",
    statusBarStyle: "black-translucent",
    capable: true,
    startupImage: [
      {
        url: "/apple-touch-icon.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#000000",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/apple-touch-icon.png" color="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MSAL Öğrenci" />
      </head>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

