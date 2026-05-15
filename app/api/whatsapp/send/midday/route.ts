import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { coachProfiles, orders } from "@/db/schema";
import { sendDailyMessage } from "@/lib/daily-messages";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cronSecret = request.headers.get("x-cron-secret");
  if (cronSecret !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const profiles = await db
    .select({
      name: coachProfiles.name,
      whatsappPhone: coachProfiles.whatsappPhone,
    })
    .from(coachProfiles)
    .innerJoin(orders, eq(coachProfiles.orderId, orders.id))
    .where(eq(orders.status, "fulfilled"));

  let sent = 0;
  for (const profile of profiles) {
    try {
      await sendDailyMessage("midday", profile.whatsappPhone, profile.name);
      sent++;
    } catch (err) {
      console.error("[whatsapp send midday] error for", profile.whatsappPhone, err);
    }
  }

  return Response.json({ sent });
}
