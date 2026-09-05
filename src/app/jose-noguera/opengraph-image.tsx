import { ImageResponse } from "next/og";
import { joseContact } from "@/config/jose-noguera";

export const alt =
  "José Noguera | Regional Manager en ECOVERSE";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  const baseUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";

  const portraitUrl = new URL(
    joseContact.portrait,
    baseUrl
  ).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px",
          background:
            "linear-gradient(135deg, #0d0d12 0%, #17101f 55%, #0b0b0f 100%)",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "58%",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "5px",
              color: "#b99ad8",
              marginBottom: "28px",
            }}
          >
            ECOVERSE
          </div>

          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "20px",
            }}
          >
            José Noguera
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#c9a0ff",
            }}
          >
            Regional Manager en ECOVERSE
          </div>
        </div>

        <div
          style={{
            width: "360px",
            height: "480px",
            display: "flex",
            overflow: "hidden",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,.15)",
          }}
        >
          <img
            src={portraitUrl}
            alt=""
            width="360"
            height="480"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}