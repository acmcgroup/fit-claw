import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { coachProfiles, clients } from "@/db/schema";

type Props = {
  searchParams: Promise<{ secret?: string }>;
};

export default async function CoachPage({ searchParams }: Props) {
  const { secret } = await searchParams;

  if (!secret) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Access denied.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
          ← Home
        </Link>
      </div>
    );
  }

  const [coachProfile] = await db
    .select()
    .from(coachProfiles)
    .where(eq(coachProfiles.manageSecret, secret));

  if (!coachProfile) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Access denied.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline dark:text-emerald-400">
          ← Home
        </Link>
      </div>
    );
  }

  const clientList = await db
    .select()
    .from(clients)
    .where(eq(clients.coachProfileId, coachProfile.id))
    .orderBy(clients.createdAt);

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Your clients — {coachProfile.name}
      </h1>

      <div className="mt-6">
        {clientList.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No clients yet. Add your first client below.
          </p>
        ) : (
          <ul className="space-y-3">
            {clientList.map((client) => (
              <li
                key={client.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{client.name}</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{client.whatsappPhone}</p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{client.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Add a client</h2>
        <form action="/api/coach/clients" method="POST" className="mt-4 space-y-4">
          <input type="hidden" name="secret" value={secret} />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Client name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Ana Costa"
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="whatsapp_phone"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Client WhatsApp
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

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            Add client
          </button>
        </form>
      </div>
    </div>
  );
}
