"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Share2, Globe, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#0a0a0a",
    border: "1px solid #2a2a2a",
    borderRadius: "2px",
    padding: "0.8rem 1rem",
    color: "#ededed",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            Get in Touch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#ededed" }}>
            Let&apos;s Talk
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }} className="contact-grid">
          {/* Info panel */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1.2rem" }}>
                Contact Info
              </h3>
              {[
                { icon: Mail, label: "hello@ashukhan.com", href: "mailto:hello@ashukhan.com" },
                { icon: Phone, label: "+1 (555) 000-0000", href: "tel:+15550000000" },
                { icon: MapPin, label: "New York, NY (available worldwide)", href: null },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", marginBottom: "1rem" }}>
                  <Icon size={16} style={{ color: "#c8a97e", flexShrink: 0, marginTop: "2px" }} />
                  {href ? (
                    <a href={href} style={{ color: "#888", fontSize: "0.875rem", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ededed")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}>
                      {label}
                    </a>
                  ) : (
                    <span style={{ color: "#888", fontSize: "0.875rem" }}>{label}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1rem" }}>
                Business Hours
              </h3>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <Clock size={14} style={{ color: "#c8a97e", flexShrink: 0, marginTop: "3px" }} />
                <div style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  <p>Mon–Fri: 9am – 6pm</p>
                  <p>Sat: 10am – 4pm</p>
                  <p>Sun: By appointment</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "1rem" }}>
                Social
              </h3>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                {[Share2, Globe].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: "36px", height: "36px", border: "1px solid #2a2a2a", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#c8a97e"; (e.currentTarget as HTMLElement).style.color = "#c8a97e"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLElement).style.color = "#666"; }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "4px", padding: "2.5rem" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 300, color: "#ededed", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "#888" }}>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }} className="form-row">
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
                  </div>
                </div>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>Message *</label>
                  <textarea name="message" rows={6} required value={form.message} onChange={handleChange} placeholder="Tell me about your project, timeline, or any questions..." style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
                </div>
                {status === "error" && <p style={{ color: "#e55", fontSize: "0.85rem", marginBottom: "1rem" }}>Failed to send. Please email hello@ashukhan.com directly.</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{ width: "100%", background: "#c8a97e", color: "#000", border: "none", padding: "0.95rem", borderRadius: "2px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: status === "loading" ? "not-allowed" : "pointer" }}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
