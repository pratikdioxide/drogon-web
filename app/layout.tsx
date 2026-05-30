import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drogon',
  description: 'Free info lookup',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
