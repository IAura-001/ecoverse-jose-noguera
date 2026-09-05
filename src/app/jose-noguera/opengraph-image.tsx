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
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          background:
            "radial-gradient(circle at 20% 10%, #261637 0%, #0d0e13 48%, #050607 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-100px",
            top: "-150px",
            width: "650px",
            height: "650px",
            display: "flex",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(112,62,230,.34), rgba(75,40,150,.12) 45%, transparent 72%)",
          }}
        />

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
              marginBottom: "30px",
              color: "#c3aad8",
              fontSize: "19px",
              letterSpacing: "6px",
            }}
          >
            ECOVERSE
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              fontSize: "70px",
              fontWeight: 700,
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            José Noguera
          </div>

          <div
            style={{
              display: "flex",
              color: "#c99aff",
              fontSize: "27px",
              letterSpacing: "2px",
              lineHeight: 1.2,
            }}
          >
            Regional Manager en ECOVERSE
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "64px",
            top: "48px",
            width: "390px",
            height: "534px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.18)",
            borderRadius: "32px",
            background: "#11131a",
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

        <div
          style={{
            position: "absolute",
            right: "68px",
            bottom: "35px",
            left: "68px",
            height: "4px",
            display: "flex",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg,#b32fed,#345de6 46%,#0eb9aa 76%,#20ca6c)",
          }}
        />
      </div>
    ),
    size
  );
}