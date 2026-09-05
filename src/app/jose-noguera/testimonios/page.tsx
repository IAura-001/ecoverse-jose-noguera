import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { TestimonialsRoute } from "../testimonials-route";

export const metadata: Metadata = {
  title: `Experiencias | ${contact.fullName} | ECOVERSE`,
  description: "Experiencias de clientes de ECOVERSE.",
};

export default async function JoseTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{
    slide?: string;
    tab?: string;
  }>;
}) {
  const params = await searchParams;

  const value = Number(params.slide ?? "1");

  const tab =
    params.tab === "videos"
      ? "videos"
      : "photos";

  return (
    <TestimonialsRoute
      items={contact.testimonials}
      index={
        Number.isFinite(value)
          ? value - 1
          : 0
      }
      tab={tab}
    />
  );
}