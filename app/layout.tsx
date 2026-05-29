import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drogon',
  description: 'Free info lookup',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}