// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import { SoundProvider } from '../contexts/SoundContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Calculation 10!',
  description: 'Make 10 using four numbers and basic operations!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  )
}