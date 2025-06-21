import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PABO Leerapp',
  description: 'Leerapp voor PABO studenten om leerdoelen eigen te maken',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-100 min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}