"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export interface PaletteItem {
  id: string;
  label: string;
  hint?: string;
}

export default function CommandPalette({
  title,
  placeholder,
  items,
  onSelect,
  onClose,
}: {
  title: string;
  placeholder: string;
  items: PaletteItem[];
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        (it.hint?.toLowerCase().includes(q) ?? false)
    );
  }, [items, query]);

  const choose = (i: number) => {
    const it = filtered[i];
    if (it) onSelect(it.id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(index);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="absolute inset-0 z-[200] flex justify-center px-4 pt-[10vh]"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
        className="h-fit w-full max-w-xl overflow-hidden rounded-md border border-[#1c222b] bg-[#0b0e14] shadow-2xl"
      >
        <div className="border-b border-[#11151c] px-2 py-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            spellCheck={false}
            className="w-full bg-[#11151c] px-3 py-1.5 font-mono text-[13px] text-[#cccccc] outline-none placeholder:text-[#858585]"
          />
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 font-mono text-[13px] text-[#858585]">
              Aucun résultat.
            </p>
          ) : (
            filtered.map((it, i) => (
              <button
                key={it.id}
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => choose(i)}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left font-mono text-[13px] ${
                  i === index ? "bg-[#04395e] text-white" : "text-[#cccccc]"
                }`}
              >
                <span className="truncate">{it.label}</span>
                {it.hint ? (
                  <span className="ml-auto truncate text-[11px] text-[#858585]">
                    {it.hint}
                  </span>
                ) : null}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
