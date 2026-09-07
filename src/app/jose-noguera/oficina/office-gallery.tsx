"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Navigation,
} from "lucide-react";
import { useState } from "react";
import type { JoseContact } from "@/config/jose-noguera";
import styles from "./office-gallery.module.css";

type OfficeGalleryProps = {
  contact: JoseContact;
  directionsUrl: string;
};

export function OfficeGallery({
  contact,
  directionsUrl,
}: OfficeGalleryProps) {
  const [current, setCurrent] = useState(0);

  const images = contact.officeGallery;
  const item = images[current];

  const previous = () => {
    setCurrent((value) =>
      value === 0 ? images.length - 1 : value - 1,
    );
  };

  const next = () => {
    setCurrent((value) =>
      value === images.length - 1 ? 0 : value + 1,
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.header}>
          <a
            href="/"
            className={styles.backButton}
            aria-label="Volver a la tarjeta de José Noguera"
          >
            <ArrowLeft aria-hidden="true" />
          </a>

          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              ECOVERSE · ILLINOIS
            </span>

            <h1>Oficina ECOVERSE</h1>

            <div className={styles.address}>
              <MapPin aria-hidden="true" />
              <span>{contact.officeDisplay}</span>
            </div>
          </div>

          <span className={styles.counter}>
            {String(current + 1).padStart(2, "0")}
            {" / "}
            {String(images.length).padStart(2, "0")}
          </span>
        </header>

        <div className={styles.stage}>
          <div className={styles.imageFrame}>
            <Image
              src={item.image}
              alt={`${item.title} — ECOVERSE Illinois`}
              fill
              sizes="(max-width: 640px) 100vw, 520px"
              className={styles.image}
              priority={current === 0}
            />
          </div>

          <button
            type="button"
            className={`${styles.galleryButton} ${styles.previous}`}
            onClick={previous}
            aria-label="Foto anterior"
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${styles.galleryButton} ${styles.next}`}
            onClick={next}
            aria-label="Foto siguiente"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className={styles.caption}>
          <div>
            <span className={styles.captionLabel}>
              INSTALACIONES
            </span>

            <h2>{item.title}</h2>

            <p>{item.description}</p>
          </div>

          <div
            className={styles.progress}
            aria-label={`Foto ${current + 1} de ${images.length}`}
          >
            {images.map((image, index) => (
              <button
                type="button"
                key={image.image}
                className={`${styles.dot} ${
                  index === current ? styles.activeDot : ""
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Ver foto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryAction}
          >
            <Navigation aria-hidden="true" />
            <span>
              <strong>Cómo llegar</strong>
              <small>Abrir indicaciones</small>
            </span>
          </a>

          <a
            href="/"
            className={styles.secondaryAction}
          >
            <ArrowLeft aria-hidden="true" />
            <span>
              <strong>Volver</strong>
              <small>Tarjeta de José</small>
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}