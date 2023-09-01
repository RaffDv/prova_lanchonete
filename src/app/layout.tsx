import { AuthProvider } from '@/contexts/user/auth'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { CartProvider } from '@/contexts/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Avellaneda',
  description: 'Lanchonete Avellaneda',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
