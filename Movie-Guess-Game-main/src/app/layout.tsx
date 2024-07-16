import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { Navbar } from '@/components'
import { ReduxProvider } from '@/store/ReduxProvider'
import { Toaster, toast } from 'sonner';



const ImpactFont = localFont({
  src: './impact.ttf',
  variable: "--font-impact",
})



export const metadata: Metadata = {
  title: 'Hollywood Conundrum',
  description: 'Guess Movies By Clues',
  twitter: {
    site: '@hollywoodconundrum',
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    url: 'https://movie-guess-game-xi.vercel.app/',
    title: 'hollywood conundrum',
    description: 'Guess Movies By clues',
    images: [
      {
        url: 'https://movie-guess-game-xi.vercel.app/show.PNG',
        width: 1200,
        height: 630,
        alt: 'hollywood conundrum',
      }
    ]
  },
  authors: [{ name: 'Abdullah moiz', url: 'https://abdullahmoiz.vercel.app/' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ImpactFont.className}>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
