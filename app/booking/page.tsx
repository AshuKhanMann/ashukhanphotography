"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronRight } from "lucide-react";

const packages = [
  { id: "", label: "Select a package..." },
  { id: "portrait-basic", label: "Portrait — Essential ($350)" },
  { id: "portrait-premium", label: "Portrait — Premium ($650)" },
  { id: "wedding-essential", label: "Wedding — Essential ($2,500)" },
  { id: "wedding-luxury", label: "Wedding — Luxury ($4,500)" },
  { id: "event-half", label: "Event — Half Day ($800)" },
  { id: "commercial", label: "Commercial — Brand ($1,200)" },
];

function BookingForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: params.get("package") || "",
    date: "",
    time: "",
    location: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const pkg = params.get("package");
    if (pkg) setForm((f) => ({ ...f, package: pkg }));
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 300, color: "#ededed", marginBottom: "0.7rem" }}>
          Booking Request Received!
        </h2>
        <p style={{ color: "#888", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Thank you! I&apos;ll review your request and reply within 24 hours to confirm your session and send a payment link.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#c8a97e",
            color: "#000",
            padding: "0.8rem 2rem",
            borderRadius: "2px",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Back to Home
        </a>
      </div>
    );
  }

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

  const labelStyle = {
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#666",
    marginBottom: "0.4rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="form-grid">
        {/* Name */}
        <div>
          <label style={labelStyle}><User size={12} /> Full Name *</label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}><Mail size={12} /> Email *</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}><Phone size={12} /> Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>

        {/* Package */}
        <div>
          <label style={labelStyle}><ChevronRight size={12} /> Package *</label>
          <select name="package" required value={form.package} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}>
            {packages.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>

        {/* Date */}
        <div>
          <label style={labelStyle}><Calendar size={12} /> Preferred Date *</label>
          <input name="date" type="date" required value={form.date} onChange={handleChange} style={{ ...inputStyle, colorScheme: "dark" }} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>

        {/* Time */}
        <div>
          <label style={labelStyle}><Clock size={12} /> Preferred Time</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} style={{ ...inputStyle, colorScheme: "dark" }} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>

        {/* Location */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}><ChevronRight size={12} /> Session Location / Venue</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Studio, outdoor park, your home, event venue..." style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>

        {/* Message */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}><MessageSquare size={12} /> Tell Me About Your Vision</label>
          <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Describe what you have in mind — style, mood, special requirements, or anything you&apos;d like me to know..." style={{ ...inputStyle, resize: "vertical" as const }} onFocus={(e) => (e.target.style.borderColor = "#c8a97e")} onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")} />
        </div>
      </div>

      {status === "error" && (
        <p style={{ color: "#e55", fontSize: "0.85rem", marginTop: "1rem" }}>
          Something went wrong. Please try again or email hello@ashukhan.com directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          marginTop: "2rem",
          width: "100%",
          background: status === "loading" ? "#a8895e" : "#c8a97e",
          color: "#000",
          border: "none",
          padding: "1rem",
          borderRadius: "2px",
          fontSize: "0.9rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        {status === "loading" ? "Sending..." : "Submit Booking Request"}
      </button>

      <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "1rem", textAlign: "center" }}>
        You won&apos;t be charged yet — I&apos;ll confirm availability and send a payment link within 24 hours.
      </p>

      <style>{`
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            Reserve Your Date
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#ededed", marginBottom: "1rem" }}>
            Book a Session
          </h1>
          <p style={{ color: "#666", lineHeight: 1.7 }}>
            Fill out the form below and I&apos;ll get back to you within 24 hours to confirm your booking.
          </p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "4px", padding: "2.5rem" }}>
          <Suspense fallback={<div style={{ color: "#888", padding: "2rem", textAlign: "center" }}>Loading form...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
