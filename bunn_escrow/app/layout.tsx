import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'The Escrow Manager',
  description: 'Your one stop for creating a excrow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-customColors-background text-white px-4 md:px-8 lg:px-20 py-6 lg:py-12`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
