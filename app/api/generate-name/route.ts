import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { race, characterClass, background, alignment, currentName, subclass } =
    await req.json();

  if (!race || !characterClass) {
    return Response.json({ error: "race and characterClass are required" }, { status: 400 });
  }

  const prompt = `Generate a single fitting D&D character name for this character:
- Race: ${race}
- Class: ${characterClass}${subclass ? ` (${subclass})` : ""}
- Background: ${background ?? "unknown"}
- Alignment: ${alignment ?? "unknown"}
- Current name (generate something different): ${currentName ?? "none"}

The name should suit the race and feel appropriate for this kind of character. Return ONLY the name — no explanation, no punctuation other than apostrophes or hyphens that are part of the name itself.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 30,
      messages: [{ role: "user", content: prompt }],
    });

    const name = (message.content[0] as { type: string; text: string }).text.trim();
    return Response.json({ name });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 500 });
  }
}
