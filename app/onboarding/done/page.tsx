import Link from "next/link";

type Props = {
  searchParams: Promise<{ manage_secret?: string }>;
};

export default async function OnboardingDonePage({ searchParams }: Props) {
  const { manage_secret: manageSecret } = await searchParams;

  if (manageSecret) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          You&apos;re all set!
        </h1>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Your profile is saved. Add your clients below to start sending daily messages.
        </p>
        <Link
          href={`/coach?secret=${manageSecret}`}
          className="mt-8 inline-block rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Manage your clients
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        You&apos;re all set!
      </h1>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        We&apos;ll be in touch.
      </p>
    </div>
  );
}
