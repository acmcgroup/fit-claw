import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { orders, coachProfiles } from "@/db/schema";
import { verifyInstallToken } from "@/lib/token";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();

  const sessionId = formData.get("session_id");
  const token = formData.get("token");
  const name = formData.get("name");
  const whatsappPhone = formData.get("whatsapp_phone");
  const coachingTone = formData.get("coaching_tone");

  if (
    !sessionId || typeof sessionId !== "string" || sessionId.trim() === "" ||
    !token || typeof token !== "string" || token.trim() === "" ||
    !name || typeof name !== "string" || name.trim() === "" ||
    !whatsappPhone || typeof whatsappPhone !== "string" || whatsappPhone.trim() === "" ||
    !coachingTone || typeof coachingTone !== "string" || coachingTone.trim() === ""
  ) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId));

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "fulfilled") {
    return NextResponse.json({ error: "Order not fulfilled" }, { status: 403 });
  }

  if (!order.tokenHash || !verifyInstallToken(sessionId, token, order.tokenHash)) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  if (order.tokenUsedAt !== null) {
    const [existingProfile] = await db
      .select({ id: coachProfiles.id })
      .from(coachProfiles)
      .where(eq(coachProfiles.orderId, order.id));

    if (existingProfile) {
      return NextResponse.redirect(new URL("/onboarding/done", request.url));
    }

    return NextResponse.json({ error: "Token already used" }, { status: 403 });
  }

  await db.insert(coachProfiles).values({
    orderId: order.id,
    name: name.trim(),
    whatsappPhone: whatsappPhone.trim(),
    coachingTone: coachingTone.trim(),
  });

  await db
    .update(orders)
    .set({ tokenUsedAt: new Date() })
    .where(eq(orders.id, order.id));

  return NextResponse.redirect(new URL("/onboarding/done", request.url));
}
