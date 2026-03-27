import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Poem = {
  slug: string;
  poet: string;
  poetEra: string;
  title: string;
  topic: string;
  date: string;
  excerpt: string;
  lines: string[];
};

const poemsDir = path.join(process.cwd(), "content/poems");

export function getAllPoems(): Poem[] {
  const files = fs.readdirSync(poemsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(poemsDir, file), "utf-8");
      const { data, content } = matter(raw);

      // Split content into lines, preserving stanza breaks as empty strings
      const lines = content
        .trim()
        .split("\n")
        .map((line) => line.trimEnd());

      // Collapse consecutive empty lines into single empty string
      const cleaned: string[] = [];
      let lastWasEmpty = false;
      for (const line of lines) {
        if (line === "") {
          if (!lastWasEmpty) cleaned.push("");
          lastWasEmpty = true;
        } else {
          cleaned.push(line);
          lastWasEmpty = false;
        }
      }

      return {
        slug: data.slug,
        poet: data.poet,
        poetEra: data.poetEra,
        title: data.title,
        topic: data.topic,
        date: data.date,
        excerpt: (data.excerpt || "").trim(),
        lines: cleaned,
      } satisfies Poem;
    })
    .sort((a, b) => {
      // Maintain a stable order — sort by date descending, then by slug
      const dateOrder = ["March 2026", "February 2026", "January 2026"];
      const ai = dateOrder.indexOf(a.date);
      const bi = dateOrder.indexOf(b.date);
      if (ai !== bi) return ai - bi;
      return a.slug.localeCompare(b.slug);
    });
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return getAllPoems().find((p) => p.slug === slug);
}

export function getAllTopics(): string[] {
  const topics = new Set(getAllPoems().map((p) => p.topic));
  return Array.from(topics).sort();
}
