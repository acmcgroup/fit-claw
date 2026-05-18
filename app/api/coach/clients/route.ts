import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { coachProfiles, clients } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();

  const secret = formData.get("secret");
  const name = formData.get("name");
  const whatsappPhone = formData.get("whatsapp_phone");

  if (
    !secret || typeof secret !== "string" || secret.trim() === "" ||
    !name || typeof name !== "string" || name.trim() === "" ||
    !whatsappPhone || typeof whatsappPhone !== "string" || whatsappPhone.trim() === ""
  ) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const [coachProfile] = await db
    .select({ id: coachProfiles.id })
    .from(coachProfiles)
    .where(eq(coachProfiles.manageSecret, secret));

  if (!coachProfile) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  await db.insert(clients).values({
    coachProfileId: coachProfile.id,
    name: name.trim(),
    whatsappPhone: whatsappPhone.trim(),
    status: "active",
  });

  return NextResponse.redirect(new URL(`/coach?secret=${secret}`, request.url));
}
