import PortfolioClient from "@/components/portfolio/PortfolioClient";

export default function PortfolioPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            My Work
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#ededed", marginBottom: "1rem" }}>
            Photography Portfolio
          </h1>
          <p style={{ color: "#666", fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Previews shown with watermark. Purchase a session or digital download to receive full-resolution unwatermarked images.
          </p>
        </div>

        <PortfolioClient />
      </div>
    </div>
  );
}
