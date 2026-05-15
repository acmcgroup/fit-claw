import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { customers, orders } from "@/db/schema";

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

  const [row] = await db
    .select({ status: orders.status, email: customers.email })
    .from(orders)
    .innerJoin(customers, eq(orders.customerId, customers.id))
    .where(eq(orders.stripeSessionId, sessionId));

  if (row && row.status === "fulfilled") {
    paid = true;
    customerEmail = row.email ?? null;
  }

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
            Check your email for the install link. If you don&apos;t see it within a few minutes, check your spam folder.
          </p>
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
