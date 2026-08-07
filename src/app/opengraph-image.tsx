import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — Financial Technology Student & Python Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at request time.
 *
 * Only flexbox and a subset of CSS work in Satori (no grid, no CSS vars), so
 * colours are inlined here rather than pulled from the theme tokens.
 */
export default function OpengraphImage() {
  const ink = "#08090f";
  const iris = "#8b7cff";
  const aqua = "#4fe3f0";
  const mist = "#e9ebf2";
  const mistDim = "#a2a9bd";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: ink,
          backgroundImage: `radial-gradient(circle at 15% 15%, ${iris}33, transparent 45%), radial-gradient(circle at 85% 80%, ${aqua}22, transparent 45%)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              backgroundImage: `linear-gradient(135deg, ${iris}, #5738e6)`,
              color: "white",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            MR
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: mistDim,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Karachi · Pakistan
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "88px",
              fontWeight: 700,
              color: mist,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Muhammad Rafay Khan
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "36px",
              color: mistDim,
            }}
          >
            Financial Technology Student · Python & ML Developer
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {["Machine Learning", "FinTech", "Data Analysis", "Python"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: "999px",
                border: `1px solid ${mist}22`,
                color: mist,
                fontSize: "24px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
