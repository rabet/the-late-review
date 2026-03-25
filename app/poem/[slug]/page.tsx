import { poems } from "@/data/poems";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return poems.map((p) => ({ slug: p.slug }));
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = poems.find((p) => p.slug === slug);
  if (!poem) notFound();

  const index = poems.indexOf(poem);
  const next = poems[index + 1] ?? poems[0];

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#0f0f0f]">
      {/* Nav */}
      <nav className="border-b border-[#e0e0e0] px-6 md:px-12 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.25em] text-[#888] hover:text-[#0f0f0f] transition-colors font-medium"
        >
          ← The Late Review
        </Link>
        <div className="flex gap-6 text-xs uppercase tracking-[0.15em] text-[#888]">
          <span className="text-[#c0392b] font-medium">{poem.topic}</span>
          <span>{poem.date}</span>
        </div>
      </nav>

      <div className="px-6 md:px-12 py-16 max-w-[1400px] mx-auto">

        {/* Poem header */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-8">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#888]">
                {poem.poet}
              </span>
              <span className="text-xs text-[#888]">{poem.poetEra}</span>
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.92] tracking-tight ligatures">
              {poem.title}
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-10 hidden md:flex items-end justify-end">
            <p className="text-[10rem] font-bold leading-none text-[#e0e0e0] select-none">
              {String(index + 1).padStart(2, "0")}
            </p>
          </div>
        </header>

        {/* Poem body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[#e0e0e0] pt-16">
          <aside className="md:col-span-2 hidden md:block">
            <div className="sticky top-16 space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-1">Poet</p>
                <p className="text-sm font-medium">{poem.poet}</p>
                <p className="text-xs text-[#888]">{poem.poetEra}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-1">Topic</p>
                <p className="text-xs text-[#c0392b] font-medium uppercase tracking-wider">{poem.topic}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-1">Published</p>
                <p className="text-xs text-[#888]">{poem.date}</p>
              </div>
            </div>
          </aside>

          <article className="md:col-span-6 md:col-start-4">
            <div className="space-y-0">
              {poem.lines.map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-6" />
                ) : (
                  <p
                    key={i}
                    className="text-lg md:text-xl leading-relaxed tracking-tight ligatures"
                  >
                    {line}
                  </p>
                )
              )}
            </div>
          </article>
        </div>

        {/* Next poem */}
        <div className="border-t border-[#e0e0e0] mt-24 pt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#888] mb-4">Next poem</p>
          <Link
            href={`/poem/${next.slug}`}
            className="group flex items-baseline gap-6 hover:text-[#c0392b] transition-colors"
          >
            <span className="text-2xl font-bold text-[#e0e0e0] group-hover:text-[#c0392b] transition-colors">
              {String(poems.indexOf(next) + 1).padStart(2, "0")}
            </span>
            <span className="text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight tracking-tight ligatures">
              {next.title}
            </span>
            <span className="text-sm text-[#888] group-hover:text-[#c0392b] transition-colors">→</span>
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#e0e0e0] px-6 md:px-12 py-8 mt-24 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.25em] text-[#888] hover:text-[#0f0f0f] transition-colors"
        >
          The Late Review
        </Link>
        <span className="text-xs text-[#888]">Classic voices. Contemporary echoes.</span>
      </footer>
    </main>
  );
}
