"use client";

import Link from "next/link";

export default function OnboardingError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        We couldn&apos;t save your profile. Please try again or contact support.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={unstable_retry}
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-500"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-sm text-emerald-700 underline dark:text-emerald-400"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
