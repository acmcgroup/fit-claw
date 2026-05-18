import twilio from "twilio";
import { eq, and } from "drizzle-orm";
import { db } from "@/db/index";
import { clients } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("x-twilio-signature") ?? "";

  const webhookUrl = process.env.TWILIO_WEBHOOK_URL;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const formData = await request.formData();
  const params: Record<string, string> = {};
  formData.forEach((value, key) => { params[key] = value.toString(); });

  if (webhookUrl && authToken) {
    const valid = twilio.validateRequest(authToken, signature, webhookUrl, params);
    if (!valid) {
      return new Response("Forbidden", { status: 403 });
    }
  } else {
    console.warn("[whatsapp webhook] skipping signature validation — TWILIO_WEBHOOK_URL or TWILIO_AUTH_TOKEN not set");
  }

  const from = params["From"] ?? "";
  const body = params["Body"] ?? "";
  const profileName = params["ProfileName"] ?? "";
  console.log("[whatsapp inbound]", { from, body, profileName });

  const strippedPhone = from.replace(/^whatsapp:/, "");
  const [client] = await db
    .select()
    .from(clients)
    .where(and(eq(clients.whatsappPhone, strippedPhone), eq(clients.status, "active")))
    .limit(1);

  if (client) {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Got it, ${client.name}! Your coach will see your progress. Keep it up 💪</Message></Response>`,
      { status: 200, headers: { "Content-Type": "text/xml" } }
    );
  }

  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
    { status: 200, headers: { "Content-Type": "text/xml" } }
  );
}
