"use client";
import Link from "next/link";
import { Check } from "lucide-react";

const packages = [
  {
    id: "portrait-basic",
    name: "Portrait — Essential",
    price: 350,
    duration: "1 hour",
    photos: "30 edited photos",
    category: "portraits",
    features: [
      "1-hour session",
      "1 location",
      "30 professionally edited photos",
      "Online gallery for 30 days",
      "Personal use license",
    ],
  },
  {
    id: "portrait-premium",
    name: "Portrait — Premium",
    price: 650,
    duration: "2 hours",
    photos: "75 edited photos",
    category: "portraits",
    popular: true,
    features: [
      "2-hour session",
      "Up to 2 locations",
      "75 professionally edited photos",
      "Online gallery for 90 days",
      "Personal use license",
      "1 large print included",
      "Rush delivery available",
    ],
  },
  {
    id: "wedding-essential",
    name: "Wedding — Essential",
    price: 2500,
    duration: "6 hours",
    photos: "400 edited photos",
    category: "weddings",
    features: [
      "6-hour coverage",
      "1 photographer",
      "400+ edited photos",
      "Online gallery 1 year",
      "Full commercial license",
      "Engagement session ($250 value)",
    ],
  },
  {
    id: "wedding-luxury",
    name: "Wedding — Luxury",
    price: 4500,
    duration: "Full day",
    photos: "800 edited photos",
    category: "weddings",
    popular: true,
    features: [
      "Full day (12 hours)",
      "2 photographers",
      "800+ edited photos",
      "Online gallery lifetime",
      "Full commercial license",
      "Engagement session",
      "Wedding album (30 pages)",
      "Drone footage",
      "Same-day preview (10 photos)",
    ],
  },
  {
    id: "event-half",
    name: "Event — Half Day",
    price: 800,
    duration: "4 hours",
    photos: "150 edited photos",
    category: "events",
    features: [
      "4-hour coverage",
      "150+ edited photos",
      "Online gallery 60 days",
      "Commercial license",
      "48-hour delivery",
    ],
  },
  {
    id: "commercial",
    name: "Commercial — Brand",
    price: 1200,
    duration: "Half day",
    photos: "50 final images",
    category: "commercial",
    features: [
      "4-hour studio/location shoot",
      "50 final retouched images",
      "Full commercial license",
      "Style consultation",
      "1 round of revisions",
      "24-hour delivery",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            Pricing & Packages
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#ededed", marginBottom: "1rem" }}>
            Photography Services
          </h1>
          <p style={{ color: "#666", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Transparent pricing with no hidden fees. All packages include professional editing, online gallery delivery, and watermark-free downloads after payment.
          </p>
        </div>

        {/* Package grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              id={pkg.category}
              style={{
                background: pkg.popular ? "linear-gradient(135deg, #1a140a 0%, #111 100%)" : "#111",
                border: `1px solid ${pkg.popular ? "#c8a97e" : "#1a1a1a"}`,
                borderRadius: "4px",
                padding: "2rem",
                position: "relative",
              }}
            >
              {pkg.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "1.5rem",
                    background: "#c8a97e",
                    color: "#000",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "0 0 3px 3px",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a97e" }}>
                  {pkg.category}
                </span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 500, color: "#ededed", margin: "0.4rem 0 0.5rem" }}>
                  {pkg.name}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
                  <span style={{ fontSize: "2.2rem", fontWeight: 300, color: "#ededed" }}>
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span style={{ color: "#555", fontSize: "0.85rem" }}>/ session</span>
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>⏱ {pkg.duration}</span>
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>📷 {pkg.photos}</span>
                </div>
              </div>

              <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                {pkg.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <Check size={14} style={{ color: "#c8a97e", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.875rem", color: "#888" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/booking?package=${pkg.id}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: pkg.popular ? "#c8a97e" : "transparent",
                  border: `1px solid ${pkg.popular ? "#c8a97e" : "#2a2a2a"}`,
                  color: pkg.popular ? "#000" : "#888",
                  padding: "0.8rem",
                  borderRadius: "2px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!pkg.popular) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#c8a97e";
                    (e.currentTarget as HTMLElement).style.color = "#c8a97e";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pkg.popular) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
                    (e.currentTarget as HTMLElement).style.color = "#888";
                  }
                }}
              >
                Book This Package
              </Link>
            </div>
          ))}
        </div>

        {/* Custom quote */}
        <div
          style={{
            marginTop: "4rem",
            background: "#111",
            border: "1px solid #1a1a1a",
            borderRadius: "4px",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 300, color: "#ededed", marginBottom: "0.7rem" }}>
            Need Something Custom?
          </h3>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Multi-day projects, destination shoots, licensing agreements — let&apos;s talk.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              border: "1px solid #c8a97e",
              color: "#c8a97e",
              padding: "0.8rem 2rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Request a Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
