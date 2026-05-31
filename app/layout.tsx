import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lensaberitabali.com'),
  title: {
    default: 'Lensa Berita Bali',
    template: '%s | Lensa Berita Bali',
  },
  description: 'Portal berita terkini seputar Bali — informasi cepat, akurat, dan terpercaya untuk masyarakat Bali dan seluruh Indonesia.',
  keywords: ['berita bali', 'berita terkini bali', 'lensa berita bali', 'portal berita bali'],
  authors: [{ name: 'Lensa Berita Bali' }],
  openGraph: {
    siteName: 'Lensa Berita Bali',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/logo.jpeg', width: 800, height: 800, alt: 'Lensa Berita Bali' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.jpeg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
