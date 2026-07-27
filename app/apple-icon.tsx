import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0c0c",
        color: "#b7ff3c",
        border: "12px solid #b7ff3c",
        fontSize: 86,
        fontWeight: 700,
      }}
    >
      A.
    </div>,
    size,
  );
}
