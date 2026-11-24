"use client";

import { useState } from "react";
import WatermarkedPhoto from "@/components/portfolio/WatermarkedPhoto";
import LightboxModal from "@/components/portfolio/LightboxModal";

const categories = ["All", "Weddings", "Portraits", "Events", "Commercial", "Family"];

const photos = [
  { id: 1, category: "Weddings", title: "Sunset Vows", location: "Napa Valley", aspect: "portrait" },
  { id: 2, category: "Portraits", title: "Natural Light", location: "Studio", aspect: "landscape" },
  { id: 3, category: "Events", title: "Corporate Gala", location: "Downtown", aspect: "landscape" },
  { id: 4, category: "Commercial", title: "Product Line", location: "Studio", aspect: "portrait" },
  { id: 5, category: "Family", title: "Sunday Walk", location: "Central Park", aspect: "landscape" },
  { id: 6, category: "Weddings", title: "First Dance", location: "Grand Ballroom", aspect: "portrait" },
  { id: 7, category: "Portraits", title: "Executive Portrait", location: "Office", aspect: "landscape" },
  { id: 8, category: "Events", title: "Concert Night", location: "Madison Square", aspect: "portrait" },
  { id: 9, category: "Commercial", title: "Brand Campaign", location: "Rooftop", aspect: "landscape" },
  { id: 10, category: "Family", title: "New Arrival", location: "Home", aspect: "portrait" },
  { id: 11, category: "Weddings", title: "Garden Ceremony", location: "Estate Gardens", aspect: "landscape" },
  { id: 12, category: "Portraits", title: "Golden Hour", location: "Beach", aspect: "portrait" },
];

const gradients = [
  "linear-gradient(135deg, #1a1208 0%, #2d2010 100%)",
  "linear-gradient(135deg, #0a1520 0%, #0f2535 100%)",
  "linear-gradient(135deg, #1a0a1a 0%, #280a28 100%)",
  "linear-gradient(135deg, #101a0a 0%, #182810 100%)",
  "linear-gradient(135deg, #1a1a0a 0%, #282808 100%)",
  "linear-gradient(135deg, #1a0808 0%, #281010 100%)",
];

export default function PortfolioClient() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: "2px",
              border: `1px solid ${active === cat ? "#c8a97e" : "#2a2a2a"}`,
              background: active === cat ? "#c8a97e" : "transparent",
              color: active === cat ? "#000" : "#888",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          columns: "3 300px",
          gap: "0.75rem",
        }}
      >
        {filtered.map((photo, i) => (
          <div
            key={photo.id}
            onClick={() => setLightbox(photo)}
            style={{
              breakInside: "avoid",
              marginBottom: "0.75rem",
              cursor: "pointer",
            }}
          >
            <WatermarkedPhoto
              gradient={gradients[i % gradients.length]}
              title={photo.title}
              category={photo.category}
              location={photo.location}
              tall={photo.aspect === "portrait"}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <LightboxModal
          photo={lightbox}
          gradient={gradients[lightbox.id % gradients.length]}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
