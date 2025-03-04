import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import ToTop from '@/components/toTop';
import ReduxProvider from '@/redux/ReduxProvider'; // ✅ Wrap Redux in a separate client component

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ELEVATE CV',
  description: 'AI Resume builder',
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {' '}
          {/* ✅ Use a separate Client Component for Redux */}
          <Header />
          {children}
          <ToTop />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
