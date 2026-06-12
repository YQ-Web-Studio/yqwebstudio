import type { Metadata } from 'next';
import { Inter, Playfair_Display, Syne, Space_Grotesk, Unbounded } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { QueryClientProviderWrapper } from "@/components/QueryClientProviderWrapper";
import { Navbar } from "@/components/Navbar";
import { ContactProvider } from "@/context/ContactContext";
import { ContactDrawer } from "@/components/ContactDrawer";
import { GlobalToasters } from "@/components/GlobalToasters";

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  style: ['italic', 'normal'], 
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yqwebstudio.com'),
  alternates: {
    canonical: '/',
  },
  title: 'YQ Web Studio | Premium Web Solutions Designed For Business Growth',
  description: 'Bespoke web applications designed to drive business growth. Based in Southend-on-Sea, UK, YQ Web Studio delivers full-stack development and lightning-fast digital experiences for ambitious brands worldwide.',
  openGraph: {
    title: 'YQ Web Studio | Premium Bespoke Web Design',
    description: 'Premium web design and full-stack development. Based in Southend-on-Sea, UK, building high-converting digital experiences for businesses globally.',
    url: 'https://yqwebstudio.com',
    siteName: 'YQ Web Studio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'YQ Web Studio - Global Web Design based in Southend-on-Sea',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark md:text-[90%]" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="/" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${syne.variable} ${spaceGrotesk.variable} ${unbounded.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XREECV4SNL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XREECV4SNL');
          `}
        </Script>

        <QueryClientProviderWrapper>
          <ContactProvider>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <ContactDrawer />
            <GlobalToasters />
          </ContactProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}