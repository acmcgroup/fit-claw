import Link from "next/link";

const PROBLEMS = [
  {
    label: "You manage 20+ clients manually",
    desc: "Every check-in, every follow-up, every reminder—done by hand or not done at all.",
  },
  {
    label: "Clients drift after 6 weeks",
    desc: "Engagement drops, progress stalls, they cancel. You lose the revenue.",
  },
  {
    label: "You can't scale without burning out",
    desc: "More clients means more messages. There's no system behind your coaching.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Set the plan once",
    desc: "Define habits, nutrition targets, training days, and check-in schedule per client. Takes minutes.",
  },
  {
    n: "02",
    title: "Fit Claw runs the daily loop",
    desc: "Morning focus, midday correction, evening review—sent automatically in your coaching tone.",
  },
  {
    n: "03",
    title: "You see who needs you",
    desc: "Adherence scores, streak data, and at-risk flags. Act only where it counts.",
  },
];

const OUTCOMES = [
  { stat: "40%", label: "fewer dropouts in the first 90 days" },
  { stat: "3×", label: "more client check-ins without extra time" },
  { stat: "2×", label: "more clients at the same coaching quality" },
  { stat: "Wk 8", label: "when upsell conversations open naturally" },
];

const TESTIMONIALS = [
  {
    quote:
      "I used to spend Sunday nights writing individual check-ins. Now Fit Claw handles the daily loop and I only message clients when there's a real reason. Retention went up noticeably in the first month.",
    name: "Marco V.",
    role: "Personal Trainer · 34 active clients",
  },
  {
    quote:
      "My nutrition clients would lose momentum between sessions. With Fit Claw they get a nudge at the right moment—without it feeling generic. The weekly summaries keep them engaged and accountable.",
    name: "Sofia R.",
    role: "Nutrition Coach · Online practice",
  },
  {
    quote:
      "We run a PT studio with five coaches. Before this, adherence tracking was spreadsheets and WhatsApp. Now every coach has a dashboard and we catch at-risk clients before they churn.",
    name: "Daniel M.",
    role: "Studio Owner · 3 coaches, 110 clients",
  },
];

const FEATURES = [
  "Automated morning, midday, and evening client messages",
  "Habit logging, meal logging, hydration, and workout tracking",
  "At-risk client alerts and adherence scores",
  "Weekly summary for each client + weekly report for each coach",
  "Coaching tone personalised per coach",
  "Unlimited clients per coach seat",
  "Cancel any time — no lock-in",
];

const FAQS = [
  {
    q: "What is Fit Claw and who is it for?",
    a: "Fit Claw is a coaching retention system for personal trainers, nutrition coaches, and PT studios. It automates daily client communication and surfaces the data you need to reduce churn and grow revenue.",
  },
  {
    q: "Does my client need to install anything?",
    a: "No. Clients interact through chat (WhatsApp, Telegram, or a browser link). Nothing to download.",
  },
  {
    q: "Is my data safe?",
    a: "All data is stored in an encrypted, GDPR-compliant database. Client information is never used for advertising or shared with third parties.",
  },
  {
    q: "What happens if I cancel?",
    a: "Cancel any time from your dashboard. Your data is exported on request. No hidden fees, no notice period.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-zinc-100 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <span className="text-base font-semibold tracking-tight">Fit Claw</span>
          <nav className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="#how-it-works" className="hidden sm:inline hover:text-zinc-900 dark:hover:text-zinc-100">
              How it works
            </a>
            <a href="#pricing" className="hidden sm:inline hover:text-zinc-900 dark:hover:text-zinc-100">
              Pricing
            </a>
            <Link
              href="/api/checkout"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            >
              Start free trial
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            For personal trainers &amp; nutrition coaches
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight leading-tight sm:text-5xl">
            Your clients stop dropping out.
            <br />
            You stop chasing them.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Fit Claw sends the right message to every client, every day—check-ins,
            habit nudges, nutrition reminders—so you coach more people without losing
            the personal touch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/api/checkout"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-500"
            >
              Start free — 14 days
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              See how it works
            </a>
          </div>

          {/* Mock chat preview */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                time: "07:30",
                label: "Morning brief",
                messages: [
                  { from: "coach", text: "Good morning! Today: strength session + 2L water + protein at every meal." },
                  { from: "client", text: "On it 💪" },
                ],
              },
              {
                time: "13:00",
                label: "Midday check",
                messages: [
                  { from: "coach", text: "Halfway through—protein is behind. Add a shake or chicken at lunch." },
                  { from: "client", text: "Just logged lunch, fixing it now." },
                ],
              },
              {
                time: "21:00",
                label: "Evening review",
                messages: [
                  { from: "coach", text: "Great day. 4/5 habits done. Tomorrow: rest day, hit that step goal." },
                  { from: "client", text: "Best week so far 🔥" },
                ],
              },
            ].map(({ time, label, messages }) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
                  <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {time}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {messages.map(({ from, text }) => (
                    <div
                      key={text}
                      className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        from === "coach"
                          ? "self-start bg-emerald-600 text-white"
                          : "self-end bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
                      }`}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Problem ────────────────────────────────────────────────── */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Sound familiar?</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Coaching is personal. The admin is not.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PROBLEMS.map(({ label, desc }) => (
                <li
                  key={label}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-950"
                >
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Simple by design</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Set it up in minutes. Let it run.
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ n, title, desc }) => (
              <li key={n} className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-emerald-600/30 dark:text-emerald-400/30">{n}</span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Outcomes ───────────────────────────────────────────────── */}
        <section className="bg-zinc-900 py-16 text-white dark:bg-zinc-800">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Real results for coaches who use systems.
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-4">
              {OUTCOMES.map(({ stat, label }) => (
                <li key={label}>
                  <p className="text-4xl font-bold text-emerald-400">{stat}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Social proof ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Coaches who made the switch.
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role }) => (
              <li
                key={name}
                className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Pricing ────────────────────────────────────────────────── */}
        <section id="pricing" className="bg-zinc-50 py-16 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Pricing</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              One plan. Everything included.
            </h2>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 text-left dark:border-zinc-700 dark:bg-zinc-950">
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">€49</span>
                <span className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">/ month</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">per coach seat</p>

              <ul className="mt-6 space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/api/checkout"
                className="mt-8 flex w-full items-center justify-center rounded-full bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Start 14-day free trial
              </Link>
              <p className="mt-3 text-center text-xs text-zinc-400 dark:text-zinc-500">
                Cancel any time. No setup fee.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section id="faq" className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
          <dl className="mt-8 space-y-6">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-zinc-100 pb-6 last:border-none dark:border-zinc-800">
                <dt className="font-medium text-zinc-900 dark:text-zinc-100">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────── */}
        <section className="bg-zinc-900 py-20 text-center text-white dark:bg-zinc-800">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your next client stays.
              <br />
              The one after that too.
            </h2>
            <p className="mt-4 text-zinc-400">
              Start your free 14-day trial. No credit card required.
            </p>
            <Link
              href="/api/checkout"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-400"
            >
              Get started
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 py-8 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-400 sm:flex-row sm:px-6">
          <span>Fit Claw © {new Date().getFullYear()}</span>
          <nav className="flex gap-4">
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300">Privacy</a>
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
