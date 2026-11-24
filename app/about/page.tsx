import { Award, Camera, Heart, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 1.5rem" }}>

        {/* Hero section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            marginBottom: "6rem",
          }}
          className="about-grid"
        >
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
              The Photographer
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#ededed", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Hi, I&apos;m Ashu Khan
            </h1>
            <p style={{ color: "#888", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: "1.2rem" }}>
              I&apos;m a professional photographer with over 12 years of experience capturing the full spectrum of human emotion — from the quiet tenderness of a newborn session to the grand celebration of a wedding day.
            </p>
            <p style={{ color: "#888", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: "2rem" }}>
              My work is rooted in authenticity. I believe the best photographs are the ones where you forget there&apos;s a camera in the room — where real moments emerge naturally, beautifully, and without pretense.
            </p>
            <Link
              href="/booking"
              style={{
                display: "inline-block",
                background: "#c8a97e",
                color: "#000",
                padding: "0.9rem 2rem",
                borderRadius: "2px",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Work With Me
            </Link>
          </div>

          {/* Photo placeholder */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1208, #2d2010)",
              borderRadius: "4px",
              height: "480px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              border: "1px solid #2a2a2a",
            }}
          >
            <Camera size={48} style={{ color: "rgba(200,169,126,0.3)" }} />
            <p style={{ color: "rgba(200,169,126,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
              ADD YOUR PHOTO HERE
            </p>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 300, color: "#ededed" }}>What I Stand For</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: Heart, title: "Authenticity", desc: "I capture real moments — not poses. Genuine emotion, genuine connection." },
              { icon: Camera, title: "Craft", desc: "Every shot is deliberate. Light, composition, timing — nothing is left to chance." },
              { icon: Award, title: "Quality", desc: "Every delivered photo is professionally edited to the highest standard." },
              { icon: Globe, title: "Availability", desc: "Based worldwide — I travel for weddings, destination shoots, and commercial work." },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "4px", padding: "2rem" }}>
                  <Icon size={24} style={{ color: "#c8a97e", marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#ededed", marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 style={{ fontSize: "2rem", fontWeight: 300, color: "#ededed", marginBottom: "2.5rem" }}>My Journey</h2>
          <div style={{ position: "relative", paddingLeft: "2rem", borderLeft: "1px solid #2a2a2a" }}>
            {[
              { year: "2012", title: "First Camera", desc: "Started with a secondhand DSLR and a passion for storytelling." },
              { year: "2015", title: "First Wedding", desc: "Photographed my first wedding — and fell completely in love with the genre." },
              { year: "2018", title: "Commercial Work", desc: "Expanded into brand and product photography for major clients." },
              { year: "2022", title: "500+ Sessions", desc: "Reached a milestone of 500 completed photography sessions worldwide." },
              { year: "Now", title: "Still Shooting", desc: "Every session is a new story. Looking forward to telling yours." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "2.5rem", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-2.45rem",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#c8a97e",
                    border: "2px solid #0a0a0a",
                  }}
                />
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "#c8a97e", textTransform: "uppercase" }}>{item.year}</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#ededed", margin: "0.3rem 0" }}>{item.title}</h3>
                <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
