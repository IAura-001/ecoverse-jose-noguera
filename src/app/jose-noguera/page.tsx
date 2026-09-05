import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { JoseCard } from "./jose-card";

export const metadata: Metadata = {
  title: `${contact.fullName} | ECOVERSE`,
  description:
    "José Noguera · Regional Manager en ECOVERSE. Tarjeta digital, perfil profesional y experiencias.",

  alternates: {
    canonical: contact.profileUrl,
  },

  openGraph: {
    title: `${contact.fullName} | ECOVERSE`,
    description: "Regional Manager · ECOVERSE",
    type: "profile",
    url: contact.profileUrl,
    siteName: "ECOVERSE",

    images: [
      {
        url: "/jose-noguera/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${contact.fullName} | ECOVERSE`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${contact.fullName} | ECOVERSE`,
    description: "Regional Manager · ECOVERSE",
    images: ["/jose-noguera/opengraph-image"],
  },
};

export default function Home() {
  return <JoseCard contact={contact} />;
}