import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "OutreachOS — Outreach Management Platform",
  description: "Internal outreach management platform for business discovery, lead enrichment, and email campaigns.",
}

import { ReduxProvider } from "@/components/providers/redux-provider"

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080808]">
        <ReduxProvider>
          <TooltipProvider delay={200}>
            {children}
          </TooltipProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
