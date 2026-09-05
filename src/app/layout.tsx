import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const productionUrl =
  process.env.NEXT_PUBLIC_CARD_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "José Noguera | ECOVERSE",
  description: "Regional Manager en ECOVERSE",
  applicationName: "ECOVERSE Card",
  openGraph: {
    title: "José Noguera | ECOVERSE",
    description: "Regional Manager en ECOVERSE",
    type: "profile",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "José Noguera — Regional Manager en ECOVERSE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "José Noguera | ECOVERSE",
    description: "Regional Manager en ECOVERSE",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050607",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}