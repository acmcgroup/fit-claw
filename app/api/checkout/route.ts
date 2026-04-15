import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { getStripe } from "@/lib/stripe-server";

export const runtime = "nodejs";

/**
 * Starts Stripe Checkout (Payment mode). Wire STRIPE_PRICE_ID in Vercel env.
 * CTA: link to /api/checkout
 */
export async function GET() {
  if (!process.env.STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_ID is not configured" },
      { status: 503 },
    );
  }

  const base = getSiteUrl();

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/#checkout`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "No Checkout URL returned" }, { status: 500 });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
