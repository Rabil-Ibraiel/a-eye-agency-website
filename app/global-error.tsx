"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#000000", color: "#ffffff", fontFamily: "Alfabet, Helvetica Neue, Helvetica, Arial, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(24px, 5vw, 72px)" }}>
          <p style={{ color: "#ff3b01", letterSpacing: "0.14em", textTransform: "uppercase" }}>A-Eye. / System error</p>
          <h1 style={{ maxWidth: 850, margin: "28px 0 16px", fontSize: "clamp(48px, 9vw, 120px)", lineHeight: 0.9, letterSpacing: "-0.06em" }}>The image went out of focus.</h1>
          <button type="button" onClick={unstable_retry} style={{ width: "fit-content", minHeight: 44, marginTop: 20, padding: "0 20px", border: 0, background: "#ff3b01", color: "#000000", fontWeight: 700 }}>Try again</button>
        </main>
      </body>
    </html>
  );
}
