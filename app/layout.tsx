import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SITE_NAME, SITE_URL } from "@/lib/config/site";
import JsonLd from "@/components/seo/JsonLd";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Portal berita terkini seputar Bali — informasi cepat, akurat, dan terpercaya untuk masyarakat Bali dan seluruh Indonesia.',
  keywords: ['berita bali', 'berita terkini bali', 'lensa berita bali', 'portal berita bali'],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    siteName: SITE_NAME,
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/logo.jpeg', width: 800, height: 800, alt: 'Lensa Berita Bali' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.jpeg'],
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.jpeg`,
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
}

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
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
