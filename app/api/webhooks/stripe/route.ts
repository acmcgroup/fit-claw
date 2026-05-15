import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { getStripe } from "@/lib/stripe-server";
import { db } from "@/db/index";
import { customers, orders } from "@/db/schema";
import { generateInstallToken } from "@/lib/token";
import { sendInstallEmail } from "@/lib/email";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

/**
 * Configure endpoint in Stripe Dashboard → Developers → Webhooks:
 * URL: https://<your-domain>/api/webhooks/stripe
 * Events: checkout.session.completed (add more as needed)
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe-Signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const email = session.customer_details?.email ?? session.customer_email;
      if (!email) {
        console.warn("[stripe webhook] checkout.session.completed missing email, skipping", session.id);
        return NextResponse.json({ received: true });
      }

      const stripeCustomerId = session.customer as string;

      await db
        .insert(customers)
        .values({ stripeCustomerId, email })
        .onConflictDoUpdate({
          target: customers.stripeCustomerId,
          set: { stripeCustomerId },
        });

      const [customer] = await db
        .select({ id: customers.id })
        .from(customers)
        .where(eq(customers.stripeCustomerId, stripeCustomerId));

      const [order] = await db
        .insert(orders)
        .values({ customerId: customer.id, stripeSessionId: session.id, status: "pending" })
        .returning({ id: orders.id });

      const { token, hash } = generateInstallToken(session.id);

      await db
        .update(orders)
        .set({ tokenHash: hash, status: "fulfilled" })
        .where(eq(orders.id, order.id));

      const installUrl = `${getSiteUrl()}/api/install-script?session_id=${session.id}&token=${token}`;
      await sendInstallEmail(email, installUrl);

      console.log("[stripe webhook] checkout fulfilled", session.id, email);
    } catch (err) {
      console.error("[stripe webhook] fulfillment error", session.id, err);
    }
  }

  return NextResponse.json({ received: true });
}
