import { ImageResponse } from "next/og";
import { joseContact } from "@/config/jose-noguera";

export const runtime = "edge";

export const alt = "José Noguera | Regional Manager | ECOVERSE";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_JOSE_CARD_URL ||
    process.env.NEXT_PUBLIC_CARD_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");

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
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 20% 15%, #24152f 0%, #0b0c11 45%, #050607 100%)",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "620px",
            height: "620px",
            right: "-160px",
            top: "-140px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(89,61,226,0.32) 0%, rgba(137,42,213,0.14) 38%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            left: "68px",
            right: "68px",
            bottom: "42px",
            height: "5px",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg,#b32fed,#345de6 46%,#0eb9aa 76%,#20ca6c)",
          }}
        />

        {/* Left content */}
        <div
          style={{
            width: "58%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "72px",
            paddingRight: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              letterSpacing: "6px",
              color: "#bca6d1",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            ECOVERSE
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "72px",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-4px",
              marginBottom: "20px",
            }}
          >
            José Noguera
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "26px",
              lineHeight: 1.2,
              color: "#c89cff",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            Regional Manager
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: "520px",
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#c9c3cf",
            }}
          >
            Tarjeta digital · Perfil profesional · Experiencias ECOVERSE
          </div>
        </div>

        {/* Portrait */}
        <div
          style={{
            position: "absolute",
            right: "58px",
            top: "48px",
            width: "390px",
            height: "534px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "34px",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "#11131a",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          }}
        >
          <img
            src={portraitUrl}
            alt=""
            width="390"
            height="534"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}