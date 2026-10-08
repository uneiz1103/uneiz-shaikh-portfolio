import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

const indigo = "#6366f1";
const cyan = "#06b6d4";

export function MonogramMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.22,
        background: `linear-gradient(135deg, ${indigo}, ${cyan})`,
        color: "#ffffff",
        fontSize: size * 0.42,
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      US
    </div>
  );
}

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          backgroundImage: `radial-gradient(circle at 12% 0%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 92% 12%, rgba(6,182,212,0.22), transparent 40%)`,
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <MonogramMark size={64} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
            <div style={{ fontSize: 22, color: "#a1a1aa" }}>{site.role}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a5b4fc",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 48 ? 58 : 72,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#8b8b95" }}>
          {site.domain.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    ogSize,
  );
}
