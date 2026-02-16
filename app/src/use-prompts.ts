import { useEffect, useState } from "react";
import type { Prompt } from "./types";
import { parseFrontmatter } from "./parse-frontmatter";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const indexRes = await fetch("/prompts/prompt-index.json");
        const filenames: string[] = await indexRes.json();

        const results = await Promise.all(
          filenames.map(async (filename) => {
            const res = await fetch(`/prompts/${filename}`);
            const raw = await res.text();
            const { meta, body } = parseFrontmatter(raw);
            return { meta, body, filename };
          })
        );

        setPrompts(results);
      } catch (err) {
        console.error("Failed to load prompts:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { prompts, loading };
}
