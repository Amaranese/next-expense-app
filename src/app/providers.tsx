"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  )
} 