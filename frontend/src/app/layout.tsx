import { env } from "@/config/environment";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastConfig } from "./(components)/(toasts)/toast-config";
import { TooltipProvider } from "./(components)/(ui)/tooltip";
import ClientProviders from "./(context)/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Polka POAP',
  description: "Fullstack D'app for assigning POAP tokens to participants of an event. Built with ink! and Substrate.",
  metadataBase: new URL(env.url),
  robots: env.isProduction ? 'all' : 'noindex,nofollow',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: env.url,
    siteName: 'polka-poap',
    images: [
      {
        url: '/images/inkathon-og-banner.jpg',
        width: 1280,
        height: 640,
      },
    ],
  },
  twitter: {
    site: '@scio_xyz',
    creator: '@scio_xyz',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <TooltipProvider>{children}</TooltipProvider>
          <ToastConfig />
          </ClientProviders>  
      </body>
    </html>
  );
}
