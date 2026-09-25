import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capuz Negro — The Codex',
  description: 'Uma trilogia de ficção histórica.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
