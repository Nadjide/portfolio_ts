import { ImageResponse } from "next/og";

export const alt = "Nadjide Omar — Ingénieur DevOps & Développeur Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";

export default function OpengraphImage() {
  const file = (name: string, color: string, active = false) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 10px",
        borderRadius: 4,
        background: active ? "#37373d" : "transparent",
        color: active ? "#ffffff" : "#cccccc",
        fontSize: 20,
        fontFamily: mono,
      }}
    >
      <span style={{ color, fontSize: 14, fontWeight: 700 }}>●</span>
      {name}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#1e1e1e",
          fontFamily: mono,
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          {/* activity bar */}
          <div style={{ width: 56, background: "#333333" }} />
          {/* sidebar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 300,
              background: "#252526",
              padding: "24px 14px",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", color: "#bbbbbb", fontSize: 16, letterSpacing: 2, marginBottom: 8 }}>
              EXPLORER
            </div>
            {file("about/", "#c09553")}
            {file("experience/", "#c09553")}
            {file("projects/", "#c09553")}
            {file("skills.json", "#cbcb41")}
            {file("contact.ts", "#3178c6", true)}
          </div>
          {/* editor */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, background: "#1e1e1e" }}>
            <div style={{ display: "flex", height: 44, background: "#252526", alignItems: "center", paddingLeft: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1e1e1e", height: "100%", padding: "0 16px", color: "#fff", fontSize: 18 }}>
                <span style={{ color: "#3178c6", fontWeight: 700, fontSize: 13 }}>TS</span> contact.ts
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: 40, gap: 14 }}>
              <div style={{ display: "flex", color: "#f8fafc", fontSize: 46, fontWeight: 800 }}>
                Nadjide Omar
              </div>
              <div style={{ display: "flex", color: "#4ec9b0", fontSize: 28 }}>
                Ingénieur DevOps &amp; Développeur Full Stack
              </div>
              <div style={{ display: "flex", height: 16 }} />
              <div style={{ display: "flex", color: "#6a9955", fontSize: 22 }}>
                {"// Docker · CI/CD · Next.js · FastAPI · Python · IA locale"}
              </div>
              <div style={{ display: "flex", color: "#569cd6", fontSize: 22 }}>
                const <span style={{ color: "#9cdcfe" }}>&nbsp;portfolio</span>
                <span style={{ color: "#d4d4d4" }}>&nbsp;=&nbsp;</span>
                <span style={{ color: "#ce9178" }}>&quot;explore →&quot;</span>
                <span style={{ color: "#d4d4d4" }}>;</span>
              </div>
            </div>
          </div>
        </div>
        {/* status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 36,
            background: "#007acc",
            color: "#fff",
            fontSize: 18,
            paddingLeft: 16,
            gap: 24,
          }}
        >
          <span>⎇ master</span>
          <span style={{ marginLeft: "auto", marginRight: 16 }}>TypeScript · UTF-8</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
