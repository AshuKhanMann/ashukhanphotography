"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Download, Lock, CheckCircle, Image, LogOut } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  package_id: string;
  session_date: string;
  paid_at: string;
  photos_delivered: boolean;
}

const SAMPLE_PHOTOS = [
  { id: 1, name: "IMG_001_full.jpg", size: "8.2 MB", cloudinaryUrl: "#" },
  { id: 2, name: "IMG_002_full.jpg", size: "7.6 MB", cloudinaryUrl: "#" },
  { id: 3, name: "IMG_003_full.jpg", size: "9.1 MB", cloudinaryUrl: "#" },
  { id: 4, name: "IMG_004_full.jpg", size: "6.8 MB", cloudinaryUrl: "#" },
  { id: 5, name: "IMG_005_full.jpg", size: "8.4 MB", cloudinaryUrl: "#" },
  { id: 6, name: "IMG_006_full.jpg", size: "7.2 MB", cloudinaryUrl: "#" },
];

function PortalContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [email, setEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If redirected from Stripe with session_id, pre-fill state
  useEffect(() => {
    if (sessionId) {
      // In production: fetch order by session_id from your API
      setOrder({
        id: sessionId,
        package_id: "portrait-premium",
        session_date: "2026-12-15",
        paid_at: new Date().toISOString(),
        photos_delivered: false,
      });
      setEmail("client@example.com");
    }
  }, [sessionId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // In production: call /api/portal/login to verify email + fetch orders
    await new Promise((r) => setTimeout(r, 800));
    if (inputEmail.includes("@")) {
      setEmail(inputEmail);
      // Demo: show sample order
      setOrder({
        id: "demo-order",
        package_id: "portrait-premium",
        session_date: "2026-11-20",
        paid_at: new Date().toISOString(),
        photos_delivered: true,
      });
    } else {
      setError("No orders found for this email address.");
    }
    setLoading(false);
  };

  if (!email && !sessionId) {
    return (
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>
        <div
          style={{
            background: "#111",
            border: "1px solid #1a1a1a",
            borderRadius: "4px",
            padding: "2.5rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Lock size={32} style={{ color: "#c8a97e", marginBottom: "0.7rem" }} />
            <h2 style={{ fontSize: "1.3rem", fontWeight: 400, color: "#ededed" }}>Client Portal</h2>
            <p style={{ color: "#666", fontSize: "0.875rem", marginTop: "0.4rem" }}>
              Enter your email to access your photos
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              required
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: "100%",
                background: "#0a0a0a",
                border: "1px solid #2a2a2a",
                borderRadius: "2px",
                padding: "0.8rem 1rem",
                color: "#ededed",
                fontSize: "0.9rem",
                marginBottom: "1rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c8a97e")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            />
            {error && <p style={{ color: "#e55", fontSize: "0.8rem", marginBottom: "0.7rem" }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#c8a97e",
                color: "#000",
                border: "none",
                padding: "0.9rem",
                borderRadius: "2px",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Checking..." : "Access My Photos"}
            </button>
          </form>

          <p style={{ color: "#555", fontSize: "0.78rem", marginTop: "1.5rem", textAlign: "center" }}>
            Only clients who have completed payment can access photos.{" "}
            <Link href="/booking" style={{ color: "#c8a97e" }}>Book a session</Link>
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p style={{ color: "#888" }}>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome bar */}
      <div
        style={{
          background: "#111",
          border: "1px solid #1a1a1a",
          borderRadius: "4px",
          padding: "1.5rem 2rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <CheckCircle size={18} style={{ color: "#4caf50" }} />
            <span style={{ color: "#ededed", fontSize: "0.95rem", fontWeight: 500 }}>Payment Confirmed</span>
          </div>
          <p style={{ color: "#666", fontSize: "0.8rem" }}>
            {email} · {order.package_id.replace(/-/g, " ")} · Session: {order.session_date}
          </p>
        </div>
        <button
          onClick={() => { setEmail(""); setOrder(null); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#666",
            padding: "0.5rem 1rem",
            borderRadius: "2px",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* Photos grid */}
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 400, color: "#ededed" }}>
          Your Photos <span style={{ color: "#555", fontWeight: 300 }}>({SAMPLE_PHOTOS.length} files)</span>
        </h2>
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#c8a97e",
            color: "#000",
            padding: "0.6rem 1.3rem",
            borderRadius: "2px",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <Download size={14} /> Download All (.zip)
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {SAMPLE_PHOTOS.map((photo, i) => {
          const gradients = [
            "linear-gradient(135deg, #1a1208, #2d2010)",
            "linear-gradient(135deg, #0a1520, #0f2535)",
            "linear-gradient(135deg, #101a0a, #182810)",
          ];
          return (
            <div
              key={photo.id}
              style={{
                background: gradients[i % gradients.length],
                border: "1px solid #1a1a1a",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              {/* Full-res placeholder */}
              <div
                style={{
                  height: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  position: "relative",
                }}
              >
                <Image size={28} style={{ color: "rgba(200,169,126,0.4)" }} />
                <span style={{ color: "rgba(200,169,126,0.3)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                  FULL RESOLUTION
                </span>
                {/* No watermark indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "rgba(76,175,80,0.2)",
                    border: "1px solid rgba(76,175,80,0.4)",
                    borderRadius: "2px",
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.6rem",
                    color: "#4caf50",
                    letterSpacing: "0.1em",
                  }}
                >
                  NO WATERMARK
                </div>
              </div>
              <div
                style={{
                  padding: "0.8rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #1a1a1a",
                }}
              >
                <div>
                  <p style={{ color: "#888", fontSize: "0.78rem" }}>{photo.name}</p>
                  <p style={{ color: "#555", fontSize: "0.72rem" }}>{photo.size}</p>
                </div>
                <a
                  href={photo.cloudinaryUrl}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    background: "rgba(200,169,126,0.1)",
                    border: "1px solid rgba(200,169,126,0.2)",
                    borderRadius: "2px",
                    color: "#c8a97e",
                  }}
                >
                  <Download size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "2rem", textAlign: "center" }}>
        Photos available for download for 1 year from session date. Need help?{" "}
        <Link href="/contact" style={{ color: "#c8a97e" }}>Contact us</Link>
      </p>
    </div>
  );
}

export default function PortalPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            Secure Access
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 300, color: "#ededed" }}>
            Client Photo Portal
          </h1>
        </div>

        <Suspense fallback={<div style={{ textAlign: "center", color: "#888", padding: "3rem" }}>Loading portal...</div>}>
          <PortalContent />
        </Suspense>
      </div>
    </div>
  );
}
