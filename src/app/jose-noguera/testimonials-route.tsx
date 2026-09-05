import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/config/jose-noguera";
import styles from "./experience-route.module.css";

type MediaTab = "photos" | "videos";

export function TestimonialsRoute({
  items,
  index = 0,
  tab = "photos",
}: {
  items: Testimonial[];
  index?: number;
  tab?: MediaTab;
}) {
  const photos = items.filter(
    (
      item
    ): item is Extract<Testimonial, { type: "image" }> =>
      item.type === "image"
  );

  const videos = items.filter(
    (
      item
    ): item is Extract<Testimonial, { type: "video" }> =>
      item.type === "video"
  );

  const activeItems = tab === "videos" ? videos : photos;

  const safeIndex = activeItems.length
    ? ((index % activeItems.length) + activeItems.length) %
      activeItems.length
    : 0;

  const current = activeItems[safeIndex];

  const previous = activeItems.length
    ? ((safeIndex - 1 + activeItems.length) %
        activeItems.length) +
      1
    : 1;

  const next = activeItems.length
    ? ((safeIndex + 1) % activeItems.length) + 1
    : 1;

  return (
    <main className={styles.page}>
      <section className={styles.sheet}>
        <div className={styles.handle} aria-hidden="true" />

        <header className={styles.header}>
          <div>
            <span>JOSÉ NOGUERA · ECOVERSE</span>
            <h1>Experiencias</h1>
          </div>

          <a
            className={styles.back}
            href="/jose-noguera"
            aria-label="Volver a la tarjeta de José Noguera"
          />
        </header>

        <nav
          className={styles.mediaTabs}
          aria-label="Tipos de experiencias"
        >
          <a
            href="/jose-noguera/testimonios?tab=photos&slide=1"
            className={`${styles.mediaTab} ${
              tab === "photos"
                ? styles.mediaTabActive
                : ""
            }`}
          >
            <span>Fotos</span>
            <small>{photos.length}</small>
          </a>

          <a
            href="/jose-noguera/testimonios?tab=videos&slide=1"
            className={`${styles.mediaTab} ${
              tab === "videos"
                ? styles.mediaTabActive
                : ""
            }`}
          >
            <span>Videos</span>
            <small>{videos.length}</small>
          </a>
        </nav>

        {current && (
          <div className={styles.experienceLayout}>
            <div className={styles.visualArea}>
              {current.type === "video" ? (
                <video
                  className={styles.experienceVideo}
                  src={current.video}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  className={styles.experienceImage}
                  src={current.image}
                  alt="Experiencia de cliente ECOVERSE"
                  width={1200}
                  height={1200}
                  priority
                />
              )}
            </div>

            <div className={styles.metaArea}>
              {current.type === "video" ? (
                <>
                  <span className={styles.testimonialLabel}>
                    Testimonio en video
                  </span>

                  <div className={styles.attribution}>
                    <span aria-hidden="true" />

                    <div>
                      <strong>
                        {current.name ||
                          "Cliente ECOVERSE"}
                      </strong>

                      <small>
                        {current.context ||
                          "Testimonio en video"}
                      </small>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className={styles.testimonialLabel}>
                    Experiencia de cliente
                  </span>

                  {current.quote && (
                    <div className={styles.testimonial}>
                      {current.quote}
                    </div>
                  )}

                  <div className={styles.attribution}>
                    <span aria-hidden="true" />

                    <div>
                      <strong>
                        {current.name ||
                          "Cliente ECOVERSE"}
                      </strong>

                      {current.context && (
                        <small>
                          {current.context}
                        </small>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.navigation}>
              <span>
                {String(safeIndex + 1).padStart(2, "0")}{" "}
                <span>
                  /{" "}
                  {String(activeItems.length).padStart(
                    2,
                    "0"
                  )}
                </span>
              </span>

              <div>
                <a
                  className={styles.navigationLink}
                  href={`/jose-noguera/testimonios?tab=${tab}&slide=${previous}`}
                  aria-label={
                    tab === "videos"
                      ? "Video anterior"
                      : "Foto anterior"
                  }
                >
                  <ArrowLeft aria-hidden="true" />
                </a>

                <a
                  className={styles.navigationLink}
                  href={`/jose-noguera/testimonios?tab=${tab}&slide=${next}`}
                  aria-label={
                    tab === "videos"
                      ? "Siguiente video"
                      : "Siguiente foto"
                  }
                >
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}