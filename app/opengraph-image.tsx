import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "A-Eye. See What Others Do Not.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 62,
        background: "#000000",
        color: "#ffffff",
        border: "1px solid #2b2b2b",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ fontWeight: 700 }}>A-Eye<span style={{ color: "#ff3b01" }}>.</span></span>
        <span style={{ color: "#9a9d96", letterSpacing: "0.16em", textTransform: "uppercase" }}>Creative content agency</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 56 }}>
        <div style={{ maxWidth: 820, fontSize: 92, lineHeight: 0.9, letterSpacing: "-0.06em", fontWeight: 650 }}>
          See What Others Do Not.
        </div>
        <div style={{ width: 124, height: 124, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ff3b01", color: "#ff3b01", fontSize: 54 }}>A.</div>
      </div>
    </div>,
    size,
  );
}
