import { NextResponse } from "next/server";

/**
 * Stripe sends POST with Stripe-Signature. Implement with the official Stripe SDK:
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
 *   const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
 * Then mark orders paid and issue short-lived install tokens for your delivery route.
 */
export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 501 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe-Signature" }, { status: 400 });
  }

  await request.text();

  return NextResponse.json(
    {
      received: true,
      hint: "Replace this stub with stripe.webhooks.constructEvent and your order fulfillment logic.",
    },
    { status: 200 },
  );
}
