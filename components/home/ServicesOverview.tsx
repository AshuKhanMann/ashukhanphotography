"use client";
import Link from "next/link";
import { Camera, Heart, Users, Building2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    desc: "Full-day coverage of your most special day, from preparation to reception.",
    price: "From $2,500",
    href: "/services#weddings",
  },
  {
    icon: Users,
    title: "Portrait Sessions",
    desc: "Individual, couple, and family portraits with professional retouching included.",
    price: "From $350",
    href: "/services#portraits",
  },
  {
    icon: Camera,
    title: "Event Coverage",
    desc: "Corporate events, parties, concerts — comprehensive event documentation.",
    price: "From $800",
    href: "/services#events",
  },
  {
    icon: Building2,
    title: "Commercial Shoots",
    desc: "Brand photography, product shots, and editorial work for businesses.",
    price: "From $1,200",
    href: "/services#commercial",
  },
];

export default function ServicesOverview() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#080808" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            What I Offer
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#ededed" }}>
            Photography Services
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                style={{
                  display: "block",
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: "4px",
                  padding: "2rem",
                  transition: "border-color 0.3s, transform 0.2s",
                  textDecoration: "none",
                }}
                className="service-card"
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "rgba(200,169,126,0.1)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.2rem",
                  }}
                >
                  <Icon size={22} style={{ color: "#c8a97e" }} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 500, color: "#ededed", marginBottom: "0.7rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#666", lineHeight: 1.7, marginBottom: "1.2rem" }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#c8a97e", fontSize: "0.9rem", fontWeight: 500 }}>{s.price}</span>
                  <ArrowRight size={16} style={{ color: "#444" }} />
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              border: "1px solid #2a2a2a",
              color: "#888",
              padding: "0.9rem 2rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#c8a97e";
              (e.currentTarget as HTMLElement).style.color = "#c8a97e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
              (e.currentTarget as HTMLElement).style.color = "#888";
            }}
          >
            View All Services & Pricing <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        .service-card:hover {
          border-color: rgba(200,169,126,0.4) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}
