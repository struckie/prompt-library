import { useMemo, useState } from "react";
import { usePrompts } from "./use-prompts";
import { PromptCard } from "./PromptCard";

function App() {
  const { prompts, loading } = usePrompts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.meta.category))).sort(),
    [prompts]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return prompts.filter((p) => {
      const matchesSearch =
        !q ||
        p.meta.title.toLowerCase().includes(q) ||
        p.meta.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.body.toLowerCase().includes(q);

      const matchesCategory =
        !activeCategory || p.meta.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [prompts, search, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Prompt Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse, search, and copy AI prompts
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Search + Filters */}
        <div className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 text-sm rounded-full border cursor-pointer transition-colors ${
                !activeCategory
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`px-3 py-1 text-sm rounded-full border cursor-pointer transition-colors ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-500 text-center py-12">Loading prompts...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No prompts found matching your search.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((prompt) => (
              <PromptCard key={prompt.filename} prompt={prompt} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
