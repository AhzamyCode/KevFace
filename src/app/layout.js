import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Kevyll AI Chat",
  description: "A simple AI chat app powered by multiple AI models",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Kevyll AI Chat",
    description: "A simple AI chat app powered by multiple AI models",
    url: "https://kevyll.com",
    siteName: "Kevyll AI",
    images: [
      {
        url: "https://uploader.zenzxz.dpdns.org/uploads/1760880480104.jpeg",
        width: 1200,
        height: 630,
        alt: "Kevyll AI Chat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gray-950 text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
