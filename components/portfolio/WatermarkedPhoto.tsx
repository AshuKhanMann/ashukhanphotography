"use client";

interface Props {
  gradient: string;
  title: string;
  category: string;
  location: string;
  tall?: boolean;
}

export default function WatermarkedPhoto({ gradient, title, category, location, tall }: Props) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "2px",
        background: gradient,
        minHeight: tall ? "380px" : "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="wm-photo"
    >
      {/* Camera icon placeholder */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "50px",
            height: "40px",
            border: "1.5px solid rgba(200,169,126,0.25)",
            borderRadius: "3px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              border: "1.5px solid rgba(200,169,126,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-6px",
              left: "10px",
              width: "14px",
              height: "6px",
              background: "rgba(200,169,126,0.1)",
              borderRadius: "2px 2px 0 0",
              border: "1.5px solid rgba(200,169,126,0.25)",
              borderBottom: "none",
            }}
          />
        </div>
        <p style={{ color: "rgba(200,169,126,0.3)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
          UPLOAD PHOTO
        </p>
      </div>

      {/* Diagonal watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%) rotate(-25deg)",
          color: "rgba(200,169,126,0.07)",
          fontSize: "1.2rem",
          letterSpacing: "0.25em",
          fontWeight: 700,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        © ASHU KHAN
      </div>

      {/* Hover overlay with info */}
      <div
        className="wm-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)",
          opacity: 0,
          transition: "opacity 0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.2rem",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8a97e",
            marginBottom: "0.2rem",
          }}
        >
          {category} · {location}
        </span>
        <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "#ededed" }}>{title}</p>
      </div>

      <style>{`
        .wm-photo:hover .wm-overlay { opacity: 1 !important; }
        .wm-photo { transition: transform 0.3s; }
        .wm-photo:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}
