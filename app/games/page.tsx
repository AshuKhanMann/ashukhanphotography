import Link from "next/link";

const games = [
  {
    id: "memory-match",
    title: "Photo Memory Match",
    desc: "Classic card-matching game using photography themed cards. Test your visual memory!",
    difficulty: "Easy",
    emoji: "🃏",
    href: "/games/memory-match",
  },
  {
    id: "photo-quiz",
    title: "Photography Quiz",
    desc: "How well do you know camera settings, composition rules, and photo history?",
    difficulty: "Medium",
    emoji: "📸",
    href: "/games/photo-quiz",
  },
  {
    id: "spot-the-difference",
    title: "Spot the Edit",
    desc: "Can you tell which photo was edited and which is straight out of camera?",
    difficulty: "Hard",
    emoji: "🔍",
    href: "/games/spot-the-edit",
  },
  {
    id: "color-match",
    title: "Color Grading Challenge",
    desc: "Match the color grade to the correct photography style. Test your eye!",
    difficulty: "Medium",
    emoji: "🎨",
    href: "/games/color-grading",
  },
];

export default function GamesPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a97e", marginBottom: "0.7rem" }}>
            Fun Zone
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#ededed", marginBottom: "0.7rem" }}>
            Photography Games
          </h1>
          <p style={{ color: "#666", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
            Take a break and test your photography knowledge with these mini-games. More coming soon!
          </p>
        </div>

        {/* Games grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {games.map((game) => (
            <Link
              key={game.id}
              href={game.href}
              style={{
                display: "block",
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: "4px",
                padding: "2rem",
                transition: "border-color 0.3s, transform 0.2s",
                textDecoration: "none",
              }}
              className="game-card"
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{game.emoji}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.7rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#ededed" }}>{game.title}</h3>
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: game.difficulty === "Easy" ? "#4caf50" : game.difficulty === "Medium" ? "#ff9800" : "#f44336",
                    border: `1px solid ${game.difficulty === "Easy" ? "rgba(76,175,80,0.3)" : game.difficulty === "Medium" ? "rgba(255,152,0,0.3)" : "rgba(244,67,54,0.3)"}`,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                >
                  {game.difficulty}
                </span>
              </div>
              <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>{game.desc}</p>
              <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "#c8a97e", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Play Now →
              </div>
            </Link>
          ))}
        </div>

        {/* Subdomain note */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1a1a1a",
            borderRadius: "4px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 400, color: "#ededed", marginBottom: "0.5rem" }}>
            Want this as its own site?
          </h3>
          <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 1rem" }}>
            This games section can be deployed as{" "}
            <code style={{ color: "#c8a97e", background: "#0a0a0a", padding: "0.1rem 0.4rem", borderRadius: "2px" }}>
              games.ashukhan.com
            </code>{" "}
            as a separate subdomain with its own look and feel.
          </p>
          <Link href="/contact" style={{ color: "#c8a97e", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
            Talk to me about custom additions →
          </Link>
        </div>
      </div>

      <style>{`
        .game-card:hover {
          border-color: rgba(200,169,126,0.4) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
