import { ImageResponse } from "next/og";
import { profile } from "./profileData";

export const alt = "Nadjide Omar · Java / Spring Boot, Full Stack & DevOps.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#0d1115", color: "#f0f0e9", padding: "55px 65px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff25", paddingBottom: 25 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}><span style={{ fontSize: 48, letterSpacing: -5 }}>n.</span><span style={{ fontSize: 23 }}>{profile.name}</span></div>
        <span style={{ color: "#a7cfff", fontSize: 17 }}>FULL STACK / DEVOPS / IA LOCALE</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 90, lineHeight: 1.04, letterSpacing: -5 }}><span>Du code.</span><span style={{ color: "#a7cfff" }}>À la production.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #ffffff25", paddingTop: 25, color: "#a0afbc", fontSize: 19 }}>
        <span>09/2021–09/2026 · Java / Spring Boot</span><span>{profile.location} · portfolio-ts-nine.vercel.app</span>
      </div>
    </div>,
    size
  );
}
