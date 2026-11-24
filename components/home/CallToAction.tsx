"use client";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section
      style={{
        padding: "7rem 1.5rem",
        background: "linear-gradient(135deg, #0d0a05 0%, #111 50%, #0d0a05 100%)",
        borderTop: "1px solid #1a1a1a",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1rem" }}>
          Let&apos;s Create Together
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "#ededed",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          Ready to Book Your
          <br />
          <span style={{ color: "#c8a97e", fontStyle: "italic" }}>Dream Session?</span>
        </h2>
        <p style={{ color: "#777", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Limited spots available each month. Reach out today to check availability and
          lock in your date before it&apos;s gone.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/booking"
            style={{
              background: "#c8a97e",
              color: "#000",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#a8895e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#c8a97e")}
          >
            Book a Session
          </Link>
          <Link
            href="/contact"
            style={{
              border: "1px solid #333",
              color: "#888",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#c8a97e";
              (e.currentTarget as HTMLElement).style.color = "#c8a97e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#333";
              (e.currentTarget as HTMLElement).style.color = "#888";
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
