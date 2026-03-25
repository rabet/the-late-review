import Link from "next/link";
import { poems } from "@/data/poems";

export default function Home() {
  const [featured, ...rest] = poems;

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#0f0f0f]">
      {/* Nav */}
      <nav className="border-b border-[#e0e0e0] px-6 md:px-12 py-5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-[#888] font-medium">
          The Late Review
        </span>
        <div className="flex gap-8 text-xs uppercase tracking-[0.15em] text-[#888]">
          <Link href="/" className="text-[#c0392b] font-medium">Poems</Link>
          <Link href="/about" className="hover:text-[#0f0f0f] transition-colors">About</Link>
        </div>
      </nav>

      <div className="px-6 md:px-12 py-16 max-w-[1400px] mx-auto">

        {/* Header */}
        <header className="mb-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c0392b] mb-4 font-medium">
            Classic voices. Contemporary echoes.
          </p>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight ligatures">
            Poets speak<br />
            <span className="text-[#888]">to our times.</span>
          </h1>
        </header>

        {/* Featured Poem */}
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
                  <span className="text-xs uppercase tracking-[0.15em] text-[#888]">{featured.poet}</span>
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

        {/* Divider */}
        <div className="border-t border-[#e0e0e0] mb-12" />

        {/* Grid of remaining poems */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e0e0e0]">
            {rest.map((poem, i) => (
              <Link
                key={poem.slug}
                href={`/poem/${poem.slug}`}
                className="group bg-[#fafafa] p-8 hover:bg-white transition-colors"
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
                    {String(i + 2).padStart(2, "0")}
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
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#e0e0e0] px-6 md:px-12 py-8 mt-24 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-[#888]">The Late Review</span>
        <span className="text-xs text-[#888]">Classic voices. Contemporary echoes.</span>
      </footer>
    </main>
  );
}
