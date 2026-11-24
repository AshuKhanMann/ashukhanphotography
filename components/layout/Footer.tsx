"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Camera, Share2, Globe, Rss, Mail, Phone } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid #1a1a1a",
        padding: "4rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <Camera size={20} style={{ color: "#c8a97e" }} />
              <span style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "0.1em" }}>ASHU KHAN</span>
            </div>
            <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "240px" }}>
              Professional photographer capturing life&apos;s most meaningful moments with artistry and care.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
              {[Share2, Globe, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    color: "#555",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8a97e")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1rem" }}>
              Quick Links
            </h4>
            {[
              ["Portfolio", "/portfolio"],
              ["Services", "/services"],
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Games", "/games"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{ display: "block", color: "#666", fontSize: "0.875rem", marginBottom: "0.5rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ededed")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#666")}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1rem" }}>
              Services
            </h4>
            {["Portrait Sessions", "Wedding Photography", "Event Coverage", "Commercial Shoots", "Family Portraits"].map((s) => (
              <p key={s} style={{ color: "#666", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{s}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1rem" }}>
              Contact
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#666", fontSize: "0.875rem", marginBottom: "0.7rem" }}>
              <Mail size={14} style={{ color: "#c8a97e", flexShrink: 0 }} />
              <span>hello@ashukhan.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#666", fontSize: "0.875rem", marginBottom: "1.2rem" }}>
              <Phone size={14} style={{ color: "#c8a97e", flexShrink: 0 }} />
              <span>+1 (555) 000-0000</span>
            </div>
            <Link
              href="/booking"
              style={{
                display: "inline-block",
                background: "#c8a97e",
                color: "#000",
                padding: "0.6rem 1.4rem",
                borderRadius: "2px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#444", fontSize: "0.8rem" }}>
            &copy; {year} Ashu Khan Photography. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Client Portal"].map((item, i) => (
              <Link
                key={item}
                href={i === 2 ? "/portal" : "#"}
                style={{ color: "#444", fontSize: "0.8rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c8a97e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#444")}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
