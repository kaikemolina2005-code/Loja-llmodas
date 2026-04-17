import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import { storeConfig } from '@/config/store';
import Script from 'next/script';
import { ECWID_STORE_ID } from '@/lib/products';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: `${storeConfig.name} | Moda Feminina Elegante`,
  description: 'High-performance, mobile-first e-commerce store optimized for conversion and speed.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="pt-br" className={`${inter.variable}`}>
        <head>
          <style dangerouslySetInnerHTML={{
            __html: `:root { --brand-primary: ${storeConfig.primaryColor}; }`
          }} />
          <Script 
            src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=nextjs`} 
            strategy="afterInteractive"
          />
        </head>
        <body className="font-sans" suppressHydrationWarning>
          <CartProvider>
            {children}
            <WhatsAppButton />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
