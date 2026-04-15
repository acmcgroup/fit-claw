import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";
import { getStripe } from "@/lib/stripe-server";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccess({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Missing checkout session.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
          Back home
        </Link>
      </div>
    );
  }

  let paid = false;
  let customerEmail: string | null = null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paid = session.payment_status === "paid";
    customerEmail = session.customer_details?.email ?? session.customer_email ?? null;
  } catch {
    paid = false;
  }

  const base = getSiteUrl();
  const installUrl = `${base}/api/install-script?session_id=${encodeURIComponent(sessionId)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        {paid ? "Payment confirmed" : "Payment pending"}
      </h1>
      {customerEmail ? (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Receipt: {customerEmail}</p>
      ) : null}
      {paid ? (
        <>
          <p className="mt-6 text-sm text-zinc-700 dark:text-zinc-300">
            Run this on your VM (session is verified server-side when you download the script):
          </p>
          <pre className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-950 p-4 text-xs text-emerald-100 dark:border-zinc-800">
            {`curl -fsSL "${installUrl}" | bash`}
          </pre>
        </>
      ) : (
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          If you just paid, wait a few seconds and refresh. Otherwise return to checkout.
        </p>
      )}
      <Link href="/" className="mt-8 inline-block text-sm text-emerald-700 underline dark:text-emerald-400">
        ← Home
      </Link>
    </div>
  );
}
