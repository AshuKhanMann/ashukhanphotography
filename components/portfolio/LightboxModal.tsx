"use client";

import { X, MapPin, Lock, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Photo {
  id: number;
  category: string;
  title: string;
  location: string;
  aspect: string;
}

interface Props {
  photo: Photo;
  gradient: string;
  onClose: () => void;
}

export default function LightboxModal({ photo, gradient, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: "4px",
          maxWidth: "800px",
          width: "100%",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo preview with watermark */}
        <div
          style={{
            position: "relative",
            background: gradient,
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "rgba(200,169,126,0.4)", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📷</div>
            YOUR PHOTO HERE
          </div>

          {/* Watermark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                color: "rgba(200,169,126,0.1)",
                fontSize: "2rem",
                letterSpacing: "0.3em",
                fontWeight: 700,
                transform: "rotate(-25deg)",
                userSelect: "none",
              }}
            >
              © ASHU KHAN
            </div>
          </div>

          {/* Watermark notice */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(200,169,126,0.3)",
              borderRadius: "20px",
              padding: "0.4rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              color: "#c8a97e",
              whiteSpace: "nowrap",
            }}
          >
            <Lock size={12} />
            Preview — watermark removed after purchase
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid #333",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ededed",
              transition: "background 0.2s",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Info + actions */}
        <div style={{ padding: "1.5rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a97e" }}>
                {photo.category}
              </span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 400, color: "#ededed", margin: "0.3rem 0" }}>
                {photo.title}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#555", fontSize: "0.85rem" }}>
                <MapPin size={13} />
                {photo.location}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", alignItems: "flex-end" }}>
              <p style={{ color: "#888", fontSize: "0.8rem" }}>Digital download from $29</p>
              <Link
                href="/booking"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#c8a97e",
                  color: "#000",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "2px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <ShoppingCart size={15} />
                Purchase / Book Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
