"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Camera } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/games", label: "Games" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Camera size={22} style={{ color: "#c8a97e" }} />
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#ededed",
            }}
          >
            ASHU KHAN
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#aaa",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c8a97e")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#aaa")}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              style={{
                background: "#c8a97e",
                color: "#000",
                padding: "0.5rem 1.2rem",
                borderRadius: "2px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#a8895e")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#c8a97e")}
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#ededed" }}
          className="mobile-only"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(10,10,10,0.98)",
            borderTop: "1px solid #2a2a2a",
            padding: "1rem 1.5rem 2rem",
          }}
        >
          {[...links, { href: "/booking", label: "Book Now" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.8rem 0",
                borderBottom: "1px solid #1a1a1a",
                fontSize: "0.95rem",
                letterSpacing: "0.08em",
                color: l.label === "Book Now" ? "#c8a97e" : "#ccc",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex; }
        .mobile-only { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
