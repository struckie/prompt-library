import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Prompt } from "./types";

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(prompt.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {prompt.meta.title}
            </h2>
            <span className="inline-block mt-1 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {prompt.meta.category}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className="shrink-0 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Tags */}
        {prompt.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {prompt.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        <div
          className={`prose prose-sm prose-gray max-w-none ${
            !expanded ? "max-h-40 overflow-hidden relative" : ""
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {prompt.body}
          </ReactMarkdown>
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
