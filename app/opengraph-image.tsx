import type { ReactNode } from "react";
import { ImageResponse } from "next/og";

export const alt = "Nadjide Omar — Ingénieur DevOps & Développeur Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";

export default function OpengraphImage() {
  const dot = (c: string) => ({
    width: 16,
    height: 16,
    borderRadius: 999,
    background: c,
  });

  const line = (children: ReactNode, color = "#cbd5e1") => (
    <div style={{ display: "flex", color, fontSize: 26, fontFamily: mono }}>
      {children}
    </div>
  );

  const promptSpan = (
    <span style={{ color: "#38bdf8" }}>
      visitor<span style={{ color: "#64748b" }}>@</span>
      <span style={{ color: "#7dd3fc" }}>nadjide</span>
      <span style={{ color: "#64748b" }}>:</span>
      <span style={{ color: "#22d3ee" }}>~</span>
      <span style={{ color: "#64748b" }}>$&nbsp;</span>
    </span>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#06090f",
          padding: 56,
        }}
      >
        {/* terminal window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            borderRadius: 20,
            border: "1px solid rgba(56,189,248,0.3)",
            background: "rgba(10,14,21,0.92)",
            overflow: "hidden",
          }}
        >
          {/* chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 24px",
              borderBottom: "1px solid rgba(56,189,248,0.2)",
              background: "#0c1119",
            }}
          >
            <div style={dot("#ef4444")} />
            <div style={dot("#eab308")} />
            <div style={dot("#22c55e")} />
            <div style={{ display: "flex", marginLeft: 16, color: "#7dd3fc", fontSize: 22, fontFamily: mono }}>
              visitor@nadjide: ~ — bash
            </div>
          </div>

          {/* body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: 40,
              flex: 1,
            }}
          >
            {line(<>{promptSpan}whoami</>)}
            <div style={{ display: "flex", color: "#f8fafc", fontSize: 44, fontWeight: 800, fontFamily: mono }}>
              Nadjide Omar
            </div>
            <div style={{ display: "flex", color: "#7dd3fc", fontSize: 30, fontFamily: mono }}>
              Ingénieur DevOps &amp; Développeur Full Stack
            </div>
            <div style={{ display: "flex", height: 18 }} />
            {line(<>{promptSpan}ls projects</>)}
            <div style={{ display: "flex", color: "#22d3ee", fontSize: 26, fontFamily: mono }}>
              stajio/&nbsp;&nbsp;exploree/&nbsp;&nbsp;smart-hire/&nbsp;&nbsp;pokedex/&nbsp;&nbsp;fisherfans/
            </div>
            <div style={{ display: "flex", height: 8 }} />
            <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontFamily: mono }}>
              {promptSpan}
              <div style={{ display: "flex", width: 14, height: 28, background: "#38bdf8", marginLeft: 4 }} />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
