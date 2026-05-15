import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { orders, coachProfiles } from "@/db/schema";
import { verifyInstallToken } from "@/lib/token";

type Props = {
  searchParams: Promise<{ session_id?: string; token?: string }>;
};

export default async function OnboardingPage({ searchParams }: Props) {
  const { session_id: sessionId, token } = await searchParams;

  if (!sessionId || !token) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Missing required parameters.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
          Back home
        </Link>
      </div>
    );
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId));

  if (!order || order.status !== "fulfilled") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Payment not found.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
          Back home
        </Link>
      </div>
    );
  }

  if (!order.tokenHash || !verifyInstallToken(sessionId, token, order.tokenHash)) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Invalid or expired link.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
          Back home
        </Link>
      </div>
    );
  }

  if (order.tokenUsedAt !== null) {
    const [existingProfile] = await db
      .select({ id: coachProfiles.id })
      .from(coachProfiles)
      .where(eq(coachProfiles.orderId, order.id));

    if (existingProfile) {
      return (
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <p className="text-zinc-700 dark:text-zinc-300">You&apos;ve already completed setup. We&apos;ll be in touch!</p>
          <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
            Back home
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Set up your coach profile
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        This takes two minutes. We&apos;ll use these details to personalise your clients&apos; daily messages.
      </p>

      <form action="/api/onboarding" method="POST" className="mt-8 space-y-6">
        <input type="hidden" name="session_id" value={sessionId} />
        <input type="hidden" name="token" value={token} />

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Marco Silva"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
              />
            </div>

            <div>
              <label
                htmlFor="whatsapp_phone"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Your WhatsApp number
              </label>
              <input
                id="whatsapp_phone"
                name="whatsapp_phone"
                type="tel"
                required
                placeholder="+351 912 345 678"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
              />
            </div>

            <div>
              <label
                htmlFor="coaching_tone"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Coaching tone
              </label>
              <select
                id="coaching_tone"
                name="coaching_tone"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              >
                <option value="professional">Professional &amp; clear</option>
                <option value="friendly">Friendly &amp; supportive</option>
                <option value="motivational">High-energy &amp; motivating</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Complete setup
        </button>
      </form>
    </div>
  );
}
