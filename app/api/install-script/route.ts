import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe-server";

export const runtime = "nodejs";

/**
 * Streams a placeholder install script only if the Checkout session is paid.
 * Replace the echo body with your real OpenClaw bundle / curl target.
 */
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return new NextResponse("missing session_id", { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return new NextResponse("payment not completed", { status: 403 });
    }

    const script = `#!/usr/bin/env bash
set -euo pipefail
echo "GetFit: payment verified for session ${sessionId}"
echo "Replace this script with your OpenClaw install steps."
`;

    return new NextResponse(script, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[install-script]", e);
    return new NextResponse("not found", { status: 404 });
  }
}
