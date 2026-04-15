import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <span className="text-sm font-semibold tracking-tight">Fit Claw</span>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <a href="#product" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Product
            </a>
            <a href="#stack" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Stack
            </a>
            <Link
              href="#checkout"
              className="rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Get access
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Coaching extension · retention · adherence
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Turn every program into daily accountability—without manual follow-up.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Fit Claw is a retention engine for gyms, PTs, and nutrition coaches: chat-first
            micro-coaching, adherence visibility, and at-risk signals—built to run with OpenClaw
            orchestration and a central database your whole team shares.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#checkout"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Buy cloud install
            </Link>
            <a
              href="#stack"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              How it is deployed
            </a>
          </div>
        </section>

        <section id="product" className="border-y border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Built for professionals, not generic tracking</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                "Daily prompts, quick logging, and short accountability loops between sessions.",
                "Coach visibility: adherence, streaks, gaps, and who needs a human touch.",
                "Deterministic rules first; LLM for tone, meal text, and tight summaries.",
                "Weekly client summaries and coach reports aligned to retention and upsells.",
              ].map((text) => (
                <li
                  key={text}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="stack" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Deployment shape</h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            This site runs on Vercel. Your data lives in a managed Postgres (Neon, Supabase, or
            similar)—one source of truth for every coach and client. OpenClaw handles orchestration
            and scheduled flows; tools call your HTTP APIs so nothing important is trapped on a
            single laptop.
          </p>
          <ol className="mt-8 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">1.</span> Checkout
              confirms payment (Stripe webhook on this app).
            </li>
            <li>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">2.</span> You receive a
              short-lived install token and CLI instructions (served only after payment).
            </li>
            <li>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">3.</span> Provision
              OpenClaw against the same API + database for all your trainers.
            </li>
          </ol>
        </section>

        <section
          id="checkout"
          className="border-t border-zinc-200 bg-emerald-950 py-16 text-emerald-50 dark:border-zinc-800"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Checkout</h2>
            <p className="mt-3 max-w-2xl text-emerald-100/90">
              Wire Stripe Checkout or Payment Links and point the success URL to a protected route
              that calls your delivery API. Set environment variables in{" "}
              <code className="rounded bg-emerald-900/80 px-1.5 py-0.5 font-mono text-xs">
                .env.local
              </code>{" "}
              (see <code className="font-mono text-xs">.env.example</code>).
            </p>
            <p className="mt-6 rounded-2xl border border-emerald-800/80 bg-emerald-900/40 p-4 font-mono text-xs leading-relaxed text-emerald-100/95">
              # After integration, paid customers see something like:
              <br />
              curl -fsSL &quot;$INSTALL_URL?token=…&quot; | bash
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        Fit Claw · coaching retention layer · OpenClaw-ready
      </footer>
    </div>
  );
}
