import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { JoseCard } from "./jose-noguera/jose-card";

const siteUrl = "https://ecoverse-jose-noguera.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "José Noguera | ECOVERSE",
  description: "Regional Manager en ECOVERSE",
  openGraph: {
    title: "José Noguera | ECOVERSE",
    description: "Regional Manager en ECOVERSE",
    url: siteUrl,
    siteName: "ECOVERSE",
    type: "profile",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "José Noguera | ECOVERSE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "José Noguera | ECOVERSE",
    description: "Regional Manager en ECOVERSE",
    images: ["/og.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  return <JoseCard contact={contact} />;
}