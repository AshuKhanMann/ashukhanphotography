"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SYMBOLS = ["📸", "🌅", "🎞️", "🖼️", "🌸", "🏔️", "🌊", "✨"];
type Card = { id: number; symbol: string; flipped: boolean; matched: boolean };

function makeCards(): Card[] {
  return [...SYMBOLS, ...SYMBOLS].map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }));
}

function shuffle(arr: Card[]): Card[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>(makeCards);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setCards(shuffle(makeCards()));
    setStarted(true);
  }, []);

  const reset = useCallback(() => {
    setCards(shuffle(makeCards()));
    setSelected([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  }, []);

  const handleFlip = (id: number) => {
    if (!started || locked || cards[id].flipped || cards[id].matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);
    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = newSelected;
      if (newCards[a].symbol === newCards[b].symbol) {
        const matched = newCards.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c));
        setCards(matched);
        setSelected([]);
        setLocked(false);
        if (matched.every((c) => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)));
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <Link href="/games" style={{ color: "#c8a97e", fontSize: "0.85rem", display: "block", marginBottom: "2rem" }}>← Back to Games</Link>

        <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#ededed", marginBottom: "0.4rem" }}>Photo Memory Match</h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Moves: <strong style={{ color: "#c8a97e" }}>{moves}</strong>
          {won && <span style={{ color: "#4caf50", marginLeft: "1rem" }}>🎉 You won in {moves} moves!</span>}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "2rem" }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              style={{
                height: "90px",
                borderRadius: "4px",
                cursor: card.matched || card.flipped ? "default" : "pointer",
                background: card.flipped || card.matched
                  ? card.matched ? "rgba(76,175,80,0.1)" : "#1a1a1a"
                  : "linear-gradient(135deg, #1a1208, #2d2010)",
                border: `1px solid ${card.matched ? "rgba(76,175,80,0.3)" : card.flipped ? "#c8a97e" : "#2a2a2a"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                transition: "all 0.2s",
                userSelect: "none",
              }}
            >
              {(card.flipped || card.matched) ? card.symbol : ""}
            </div>
          ))}
        </div>

        <button
          onClick={reset}
          style={{
            background: "#c8a97e",
            color: "#000",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "2px",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
