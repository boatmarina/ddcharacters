"use client";

import { useState, useEffect, useCallback } from "react";
import CharacterSheet from "./components/CharacterSheet";
import { Character } from "./types/character";

const EXAMPLE_PROMPTS = [
  "Geralt of Rivia from The Witcher — a monster hunter with silver and steel swords, witcher mutations, signs magic (Igni, Aard, Quen, Yrden, Axii), and his stoic but morally complex personality.",
  "Gandalf the Grey from Lord of the Rings — ancient wizard with a staff, fireworks, powerful magic, deep wisdom, and a mysterious backstory as a Maia.",
  "Kratos from God of War — the Ghost of Sparta, formerly Greek God of War, wielding the Leviathan Axe, near-godlike strength, rage abilities, and tragic but loving father nature.",
  "Hermione Granger from Harry Potter — brilliant witch with encyclopedic magical knowledge, a time-turner, wand spells, and her loyal but bossy personality.",
];

interface SavedCharacter {
  id: string;
  name: string;
  class: string;
  level: number;
  symbol: string;
  savedAt: string;
  data: Character;
}

const STORAGE_KEY = "dnd_character_history";
const MAX_SAVED = 20;

function loadSavedCharacters(): SavedCharacter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCharacterToHistory(character: Character): SavedCharacter[] {
  const saved = loadSavedCharacters();
  const entry: SavedCharacter = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: character.name,
    class: character.class,
    level: character.level,
    symbol: character.symbol || "⚔️",
    savedAt: new Date().toISOString(),
    data: character,
  };
  // Prepend new, cap at MAX_SAVED
  const updated = [entry, ...saved].slice(0, MAX_SAVED);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export default function Home() {
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(3);
  const [character, setCharacter] = useState<Character | null>(null);
  const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);

  useEffect(() => {
    setSavedCharacters(loadSavedCharacters());
  }, []);

  const loadCharacter = useCallback((saved: SavedCharacter) => {
    setCharacter(saved.data);
    setCurrentCharacterId(saved.id);
    setError(null);
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setCharacter((prev) => (prev ? { ...prev, name } : null));
    // Also update the name in the saved history entry
    if (currentCharacterId) {
      const saved = loadSavedCharacters().map((c) =>
        c.id === currentCharacterId ? { ...c, name, data: { ...c.data, name } } : c
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      setSavedCharacters(saved);
    }
  }, [currentCharacterId]);

  const deleteCharacter = useCallback((id: string) => {
    const saved = loadSavedCharacters().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setSavedCharacters(saved);
  }, []);

  async function generateCharacter() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    setCharacter(null);

    try {
      const res = await fetch("/api/generate-character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, level }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate character");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }
      fullText += decoder.decode(); // flush any remaining buffered bytes

      console.log("[generate-character] Raw response length:", fullText.length);
      console.log("[generate-character] First 300 chars:", fullText.slice(0, 300));
      console.log("[generate-character] Last 300 chars:", fullText.slice(-300));

      // Check if the stream ended cleanly
      const streamComplete = fullText.includes("###END###");
      console.log("[generate-character] Stream complete sentinel found:", streamComplete);
      const cleanedText = fullText.replace("###END###", "").trim();

      // Strip markdown code fences if present
      let jsonText = cleanedText;
      if (jsonText.startsWith("```")) {
        jsonText = jsonText
          .replace(/^```(?:json)?\s*\n?/, "")
          .replace(/\n?```\s*$/, "")
          .trim();
        console.log("[generate-character] Stripped markdown fences");
      }

      // Check if the streamed content is an error JSON
      if (/^\s*\{"error":/.test(jsonText)) {
        const errData = JSON.parse(jsonText);
        throw new Error(errData.error || "Failed to generate character");
      }

      // If stream was cut off, let the user know to retry
      if (!streamComplete) {
        throw new Error("Generation was interrupted — please try again.");
      }

      // Walk braces to extract the outermost JSON object exactly
      const start = jsonText.indexOf("{");
      if (start === -1) throw new Error("No valid character data in response");

      let depth = 0;
      let end = -1;
      for (let i = start; i < jsonText.length; i++) {
        if (jsonText[i] === "{") depth++;
        else if (jsonText[i] === "}") {
          depth--;
          if (depth === 0) {
            end = i;
            break;
          }
        }
      }

      console.log("[generate-character] Brace walk: depth at end =", depth, "end index =", end);
      if (end === -1) throw new Error("Could not parse character data — please try again.");

      const parsed: Character = JSON.parse(jsonText.slice(start, end + 1));
      setCharacter(parsed);

      // Save to localStorage
      const updated = saveCharacterToHistory(parsed);
      setSavedCharacters(updated);
      setCurrentCharacterId(updated[0].id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-[#1a0a00]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top, #2d1200 0%, #1a0a00 100%)",
      }}
    >
      {/* Header */}
      <header className="no-print border-b-4 border-[#8B0000] bg-[#2d1200] py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-4xl font-bold text-[#D4AF37]"
            style={{
              fontFamily: "Georgia, serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            ⚔️ D&amp;D Character Forge
          </h1>
          <p className="text-[#c8a96e] mt-1 text-sm">
            Transform any fictional character into a D&amp;D 5e character sheet
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="no-print bg-[#2d1200] border-2 border-[#8B0000] rounded-xl p-6 mb-8 shadow-2xl">
          <div className="mb-4">
            <label
              className="block text-[#D4AF37] font-bold text-lg mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Describe Your Character
            </label>
            <p className="text-[#c8a96e] text-sm mb-3">
              Tell us who the character is and any specific abilities, weapons,
              or traits you want replicated. You can reference characters from
              books, movies, games, TV shows, or even describe an original
              character.
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Geralt of Rivia from The Witcher — a monster hunter with silver and steel swords, witcher mutations, signs magic (Igni, Aard, Quen, Yrden, Axii), and his stoic but morally complex personality."
              className="w-full h-36 bg-[#1a0a00] border-2 border-[#8B0000] rounded-lg p-3 text-[#e8d5b7] placeholder-[#5a3a1a] focus:outline-none focus:border-[#D4AF37] resize-none text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            />
          </div>

          {/* Level Selector + Example Prompts row */}
          <div className="flex items-start gap-6 mb-4">
            {/* Level Dropdown */}
            <div className="flex-shrink-0">
              <label className="text-[#c8a96e] text-xs uppercase font-bold tracking-wider block mb-2">
                Character Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="bg-[#1a0a00] border-2 border-[#8B0000] text-[#D4AF37] rounded-lg px-3 py-2 font-bold text-lg focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Example prompts */}
            <div className="flex-1">
              <p className="text-[#c8a96e] text-xs mb-2 uppercase font-bold tracking-wider">
                Quick Examples:
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setDescription(prompt)}
                    className="text-xs bg-[#1a0a00] border border-[#8B0000] text-[#c8a96e] hover:border-[#D4AF37] hover:text-[#D4AF37] rounded px-3 py-1 transition-colors cursor-pointer"
                  >
                    {prompt.split(" from ")[0].split(" — ")[0]} →
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generateCharacter}
            disabled={loading || !description.trim()}
            className="w-full py-3 bg-[#8B0000] hover:bg-[#a00000] disabled:bg-[#3d0000] disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors border-2 border-[#D4AF37] disabled:border-[#5a3a1a] cursor-pointer"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Forging Character Sheet...
              </span>
            ) : (
              "⚔️ Generate Character Sheet"
            )}
          </button>
        </div>

        {/* Saved Characters */}
        {savedCharacters.length > 0 && (
          <div className="no-print mb-8">
            <h2
              className="text-[#D4AF37] font-bold text-lg mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              📜 Saved Characters
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {savedCharacters.map((saved) => (
                <div
                  key={saved.id}
                  className="flex-shrink-0 bg-[#2d1200] border-2 border-[#8B0000] rounded-lg p-3 w-48 hover:border-[#D4AF37] transition-colors group"
                >
                  <button
                    onClick={() => loadCharacter(saved)}
                    className="w-full text-left cursor-pointer"
                  >
                    <div className="text-lg mb-1">{saved.symbol}</div>
                    <div className="text-[#D4AF37] font-bold text-sm truncate">
                      {saved.name}
                    </div>
                    <div className="text-[#c8a96e] text-xs truncate">
                      {saved.class} &middot; Lvl {saved.level}
                    </div>
                    <div className="text-[#5a3a1a] text-[10px] mt-1">
                      {new Date(saved.savedAt).toLocaleDateString()}
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCharacter(saved.id);
                    }}
                    className="text-[#5a3a1a] hover:text-red-500 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="no-print bg-[#3d0000] border-2 border-red-700 rounded-xl p-4 mb-8 text-red-300">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Character Sheet */}
        {character && (
          <div>
            <div className="flex justify-end mb-3 no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2 bg-[#2d1200] border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1a0a00] font-bold rounded-lg transition-colors cursor-pointer"
                style={{ fontFamily: "Georgia, serif" }}
              >
                🖨️ Print / Save as PDF
              </button>
            </div>
            <div id="print-area" className="rounded-xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]">
              <CharacterSheet character={character} onNameChange={handleNameChange} />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!character && !loading && !error && savedCharacters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎲</div>
            <p
              className="text-[#c8a96e] text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Describe a character above to forge their D&amp;D character sheet
            </p>
            <p className="text-[#5a3a1a] text-sm mt-2">
              Works with characters from any fiction — books, movies, games,
              shows, and more
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
