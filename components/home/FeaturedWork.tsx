"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const photos = [
  { id: 1, category: "Wedding", title: "Golden Hour Romance", aspect: "portrait" },
  { id: 2, category: "Portrait", title: "Natural Light Studio", aspect: "landscape" },
  { id: 3, category: "Event", title: "Corporate Gala", aspect: "portrait" },
  { id: 4, category: "Commercial", title: "Brand Identity", aspect: "landscape" },
  { id: 5, category: "Family", title: "Sunday Afternoon", aspect: "portrait" },
  { id: 6, category: "Wedding", title: "First Dance", aspect: "landscape" },
];

const gradients = [
  "linear-gradient(135deg, #1a1208 0%, #2d1f0a 100%)",
  "linear-gradient(135deg, #0a1a1a 0%, #0a2020 100%)",
  "linear-gradient(135deg, #1a0a1a 0%, #1f0a2d 100%)",
  "linear-gradient(135deg, #1a1a0a 0%, #2d2d0a 100%)",
  "linear-gradient(135deg, #0a1a0a 0%, #0a2d0a 100%)",
  "linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 100%)",
];

export default function FeaturedWork() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.5rem" }}>
              Selected Work
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#ededed", lineHeight: 1.1 }}>
              Featured Portfolio
            </h2>
          </div>
          <Link
            href="/portfolio"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#c8a97e",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.9rem")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.5rem")}
          >
            View All Work <ArrowRight size={16} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
          }}
          className="photo-grid"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "2px",
                cursor: "pointer",
                gridRow: photo.aspect === "portrait" ? "span 2" : "span 1",
                minHeight: photo.aspect === "portrait" ? "420px" : "200px",
                background: gradients[i % gradients.length],
              }}
              className="photo-card"
            >
              {/* Placeholder visual */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid rgba(200,169,126,0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "16px",
                      border: "2px solid rgba(200,169,126,0.4)",
                      borderRadius: "2px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(200,169,126,0.4)",
                      }}
                    />
                  </div>
                </div>
                <p style={{ color: "rgba(200,169,126,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em" }}>YOUR PHOTO</p>
              </div>

              {/* Watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%) rotate(-30deg)",
                  color: "rgba(200,169,126,0.08)",
                  fontSize: "1.4rem",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                ASHU KHAN
              </div>

              {/* Hover overlay */}
              <div
                className="photo-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.3rem" }}>
                  {photo.category}
                </span>
                <p style={{ fontSize: "1rem", fontWeight: 500, color: "#ededed" }}>{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .photo-card:hover .photo-overlay { opacity: 1 !important; }
        .photo-card { transition: transform 0.3s; }
        .photo-card:hover { transform: scale(1.01); }
        @media (max-width: 768px) {
          .photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .photo-card { grid-row: span 1 !important; min-height: 200px !important; }
        }
        @media (max-width: 480px) {
          .photo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
