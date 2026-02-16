import type { PromptMeta } from "./types";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

export function parseFrontmatter(raw: string): {
  meta: PromptMeta;
  body: string;
} {
  const match = raw.match(FRONTMATTER_RE);

  const defaults: PromptMeta = { title: "Untitled", category: "General", tags: [] };

  if (!match) return { meta: defaults, body: raw.trim() };

  const yamlBlock = match[1];
  const body = raw.slice(match[0].length).trim();
  const meta: Record<string, string | string[]> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Handle YAML arrays like [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim());
    } else {
      meta[key] = value;
    }
  }

  return {
    meta: {
      title: (meta.title as string) || defaults.title,
      category: (meta.category as string) || defaults.category,
      tags: (meta.tags as string[]) || defaults.tags,
    },
    body,
  };
}
