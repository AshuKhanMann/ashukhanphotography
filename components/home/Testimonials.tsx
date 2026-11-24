import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & James",
    role: "Wedding Clients",
    text: "Ashu captured every emotion of our wedding day perfectly. The photos are breathtaking — we relive that magical day every time we look at them.",
    stars: 5,
  },
  {
    name: "Emily Chen",
    role: "Portrait Client",
    text: "Incredibly professional and made me feel so comfortable during the shoot. The final images exceeded all my expectations!",
    stars: 5,
  },
  {
    name: "TechVision Inc.",
    role: "Commercial Client",
    text: "Ashu transformed our brand imagery completely. Delivered on time, on budget, and beyond our creative vision.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            Kind Words
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#ededed" }}>
            Client Reviews
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: "4px",
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", gap: "3px", marginBottom: "1.2rem" }}>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} fill="#c8a97e" style={{ color: "#c8a97e" }} />
                ))}
              </div>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1.5rem", fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p style={{ color: "#ededed", fontSize: "0.9rem", fontWeight: 500 }}>{t.name}</p>
                <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "0.2rem" }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
