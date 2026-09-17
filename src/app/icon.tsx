import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 15,
          background: "#160706",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff9100",
          borderRadius: "8px",
          border: "2px solid #00b7cd",
          fontWeight: 900,
          fontFamily: "monospace",
        }}
      >
        ∑π
      </div>
    ),
    {
      ...size,
    }
  );
}
