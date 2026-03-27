"use client";

import { useState } from "react";
import Link from "next/link";
import type { Poem } from "@/lib/poems";

type Props = {
  poems: Poem[];
  topics: string[];
};

export default function TopicFilter({ poems, topics }: Props) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const [featured, ...rest] = poems;
  const filteredRest = activeTopic
    ? rest.filter((p) => p.topic === activeTopic)
    : rest;

  const showFeatured = !activeTopic || featured.topic === activeTopic;

  return (
    <>
      {/* Topic filter pills */}
      <div className="flex flex-wrap gap-3 mb-16">
        <button
          onClick={() => setActiveTopic(null)}
          className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-colors cursor-pointer ${
            activeTopic === null
              ? "bg-[#0f0f0f] text-white border-[#0f0f0f]"
              : "bg-transparent text-[#888] border-[#e0e0e0] hover:border-[#0f0f0f] hover:text-[#0f0f0f]"
          }`}
        >
          All
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic === activeTopic ? null : topic)}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-colors cursor-pointer ${
              activeTopic === topic
                ? "bg-[#0f0f0f] text-white border-[#0f0f0f]"
                : "bg-transparent text-[#888] border-[#e0e0e0] hover:border-[#0f0f0f] hover:text-[#0f0f0f]"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Featured Poem */}
      {showFeatured && (
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-[#e0e0e0] pt-8">
            <div className="md:col-span-1 mb-4 md:mb-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
                Featured
              </span>
            </div>
            <div className="md:col-span-7 md:col-start-2">
              <Link href={`/poem/${featured.slug}`} className="group block">
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#888]">
                    {featured.poet}
                  </span>
                  <span className="text-xs text-[#c0392b]">{featured.topic}</span>
                </div>
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight mb-6 group-hover:text-[#c0392b] transition-colors ligatures">
                  {featured.title}
                </h2>
                <p className="text-sm text-[#888] leading-relaxed whitespace-pre-line max-w-lg">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#0f0f0f] group-hover:text-[#c0392b] transition-colors">
                  <span>Read poem</span>
                  <span>→</span>
                </div>
              </Link>
            </div>
            <div className="md:col-span-3 md:col-start-10 hidden md:flex flex-col justify-end">
              <div className="text-right">
                <p className="text-[8rem] font-bold leading-none text-[#e0e0e0] select-none">
                  {String(poems.indexOf(featured) + 1).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      {showFeatured && filteredRest.length > 0 && (
        <div className="border-t border-[#e0e0e0] mb-12" />
      )}

      {/* Grid of poems */}
      {filteredRest.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {filteredRest.map((poem) => {
              const globalIndex = poems.indexOf(poem);
              return (
                <Link
                  key={poem.slug}
                  href={`/poem/${poem.slug}`}
                  className="group bg-[#fafafa] p-8 hover:bg-white transition-colors border border-[#e0e0e0]"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-1">
                        {poem.poet}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#c0392b]">
                        {poem.topic}
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-[#e0e0e0] group-hover:text-[#c0392b] transition-colors">
                      {String(globalIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight tracking-tight mb-4 group-hover:text-[#c0392b] transition-colors ligatures">
                    {poem.title}
                  </h3>
                  <p className="text-xs text-[#888] leading-relaxed whitespace-pre-line line-clamp-3">
                    {poem.excerpt}
                  </p>
                  <div className="mt-6 text-[10px] uppercase tracking-[0.15em] text-[#888]">
                    {poem.date}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!showFeatured && filteredRest.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-sm text-[#888]">No poems found for this topic.</p>
        </div>
      )}
    </>
  );
}
