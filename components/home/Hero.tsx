"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(200,169,126,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,169,126,0.05) 0%, transparent 40%)",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,169,126,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "2rem 1.5rem",
          maxWidth: "900px",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#c8a97e",
            marginBottom: "1.5rem",
          }}
        >
          Professional Photography
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ededed",
            marginBottom: "1.5rem",
          }}
        >
          Capturing Your
          <br />
          <span style={{ color: "#c8a97e", fontStyle: "italic" }}>Most Precious</span>
          <br />
          Moments
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#888",
            lineHeight: 1.8,
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
          }}
        >
          Award-winning photography for weddings, portraits, events, and commercial projects.
          Every image tells a story — let me tell yours.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/portfolio"
            style={{
              background: "#c8a97e",
              color: "#000",
              padding: "0.9rem 2.2rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#a8895e";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c8a97e";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View Portfolio
          </Link>
          <Link
            href="/booking"
            style={{
              border: "1px solid #c8a97e",
              color: "#c8a97e",
              padding: "0.9rem 2.2rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c8a97e";
              (e.currentTarget as HTMLElement).style.color = "#000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#c8a97e";
            }}
          >
            Book a Session
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            marginTop: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            ["500+", "Sessions"],
            ["12+", "Years Exp."],
            ["100%", "Satisfaction"],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "2rem", fontWeight: 300, color: "#c8a97e", lineHeight: 1 }}>{num}</p>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginTop: "0.3rem" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.3rem",
          color: "#444",
          animation: "bounce 2s infinite",
        }}
      >
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</p>
        <ChevronDown size={16} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
