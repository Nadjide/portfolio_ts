import { ImageResponse } from "next/og";

export const alt = "Nadjide Omar · Software Engineer (Full Stack & DevOps)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";

const CYAN = "#38bdf8";
const CYAN_SOFT = "#7dd3fc";
const GREEN = "#4ade80";
const STONE = "#a8a29e";

export default function OpengraphImage() {
  const line = (children: React.ReactNode, color = "#e2e8f0") => (
    <div style={{ display: "flex", color, fontSize: 24, lineHeight: 1.5 }}>{children}</div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05080f",
          fontFamily: mono,
          padding: 56,
        }}
      >
        {/* fenêtre terminal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "#0a0f17",
            overflow: "hidden",
            boxShadow: "0 0 90px rgba(56,189,248,0.12)",
          }}
        >
          {/* barre de titre */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 22px",
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#ef4444" }} />
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#eab308" }} />
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#22c55e" }} />
            <div style={{ display: "flex", marginLeft: 14, color: STONE, fontSize: 20 }}>
              visitor@nadjide: ~
            </div>
          </div>

          {/* corps */}
          <div style={{ display: "flex", flexDirection: "column", padding: 44, gap: 6, flex: 1 }}>
            <div style={{ display: "flex", gap: 10, fontSize: 24 }}>
              <span style={{ color: CYAN }}>visitor@nadjide</span>
              <span style={{ color: STONE }}>:~$</span>
              <span style={{ color: "#e2e8f0" }}>whoami</span>
            </div>

            <div style={{ display: "flex", height: 14 }} />

            <div style={{ display: "flex", color: "#f8fafc", fontSize: 62, fontWeight: 800 }}>
              Nadjide Omar
            </div>
            <div style={{ display: "flex", color: CYAN_SOFT, fontSize: 30, marginTop: 4 }}>
              Software Engineer · Full Stack &amp; DevOps
            </div>

            <div style={{ display: "flex", height: 22 }} />

            {line(
              <span>
                <span style={{ color: STONE }}>{"// "}</span>Docker · CI/CD · Next.js · FastAPI · Python · IA locale
              </span>,
              GREEN
            )}

            <div style={{ display: "flex", gap: 10, fontSize: 24, marginTop: 14 }}>
              <span style={{ color: CYAN }}>visitor@nadjide</span>
              <span style={{ color: STONE }}>:~$</span>
              <span style={{ color: "#e2e8f0" }}>help</span>
              <span
                style={{
                  display: "flex",
                  width: 12,
                  height: 26,
                  background: CYAN,
                  marginLeft: 4,
                }}
              />
            </div>
          </div>

          {/* barre de statut façon tmux */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "10px 20px",
              background: "#0b1220",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              color: STONE,
              fontSize: 18,
            }}
          >
            <span style={{ display: "flex", color: CYAN_SOFT, background: "rgba(56,189,248,0.18)", padding: "2px 10px", borderRadius: 4 }}>
              [portfolio]
            </span>
            <span style={{ display: "flex" }}> master</span>
            <span style={{ display: "flex", marginLeft: "auto" }}>Nice, FR · FR · EN</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
