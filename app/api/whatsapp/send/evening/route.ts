import { eq, and } from "drizzle-orm";
import { db } from "@/db/index";
import { coachProfiles, orders, clients } from "@/db/schema";
import { sendDailyMessage } from "@/lib/daily-messages";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const activeClients = await db
    .select({
      name: clients.name,
      whatsappPhone: clients.whatsappPhone,
    })
    .from(clients)
    .innerJoin(coachProfiles, eq(clients.coachProfileId, coachProfiles.id))
    .innerJoin(orders, eq(coachProfiles.orderId, orders.id))
    .where(and(eq(clients.status, "active"), eq(orders.status, "fulfilled")));

  let sent = 0;
  for (const client of activeClients) {
    try {
      await sendDailyMessage("evening", client.whatsappPhone, client.name);
      sent++;
    } catch (err) {
      console.error("[whatsapp send evening] error for", client.whatsappPhone, err);
    }
  }

  return Response.json({ sent });
}
