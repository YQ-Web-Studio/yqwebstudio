import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'YQ Web Studio — Engineering Premium Web Solutions',
  description: 'Bespoke web applications designed to drive business growth. Full-stack development by YQ Web Studio.',
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
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
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
