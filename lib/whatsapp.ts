import twilio from "twilio";

let _client: twilio.Twilio | null = null;

export function getTwilio(): twilio.Twilio {
  if (!process.env.TWILIO_ACCOUNT_SID) {
    throw new Error("TWILIO_ACCOUNT_SID is not set");
  }
  if (!process.env.TWILIO_AUTH_TOKEN) {
    throw new Error("TWILIO_AUTH_TOKEN is not set");
  }
  if (!_client) {
    _client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  return _client;
}

export async function sendWhatsAppTemplate(
  to: string,
  contentSid: string,
  contentVariables: Record<string, string>
): Promise<void> {
  const client = getTwilio();
  const from = process.env.TWILIO_WHATSAPP_NUMBER;
  await client.messages.create({
    from,
    to,
    contentSid,
    contentVariables: JSON.stringify(contentVariables),
  });
}

export function formatWhatsAppNumber(phone: string): string {
  const stripped = phone.replace(/^whatsapp:/, "");
  const leadingPlus = stripped.startsWith("+") ? "+" : "";
  const digits = stripped.replace(/\D/g, "");
  return `whatsapp:${leadingPlus}${digits}`;
}
