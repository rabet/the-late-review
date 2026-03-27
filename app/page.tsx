import Link from "next/link";
import { getAllPoems, getAllTopics } from "@/lib/poems";
import TopicFilter from "@/app/components/TopicFilter";

export default function Home() {
  const poems = getAllPoems();
  const topics = getAllTopics();

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

        {/* Topic Filter + Poems */}
        <TopicFilter poems={poems} topics={topics} />

      </div>

      {/* Footer */}
      <footer className="border-t border-[#e0e0e0] px-6 md:px-12 py-8 mt-24 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-[#888]">The Late Review</span>
        <span className="text-xs text-[#888]">Classic voices. Contemporary echoes.</span>
      </footer>
    </main>
  );
}
