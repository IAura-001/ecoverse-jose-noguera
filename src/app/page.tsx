import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { JoseCard } from "./jose-noguera/jose-card";

const productionUrl =
  "https://ecoverse-jose-noguera.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),

  title: `${contact.fullName} | ECOVERSE`,

  description:
    "José Noguera · Regional Manager en ECOVERSE",

  alternates: {
    canonical: productionUrl,
  },

  openGraph: {
    title: `${contact.fullName} | ECOVERSE`,
    description:
      "Regional Manager en ECOVERSE",
    url: productionUrl,
    siteName: "ECOVERSE",
    type: "profile",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${contact.fullName} | Regional Manager en ECOVERSE`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${contact.fullName} | ECOVERSE`,
    description:
      "Regional Manager en ECOVERSE",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return <JoseCard contact={contact} />;
}