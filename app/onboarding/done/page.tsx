import Link from "next/link";

export default function OnboardingDonePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        You&apos;re all set!
      </h1>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        Your profile is saved. We&apos;ll reach out to connect your WhatsApp and get your first clients set up.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm text-emerald-700 underline dark:text-emerald-400">
        ← Home
      </Link>
    </div>
  );
}
