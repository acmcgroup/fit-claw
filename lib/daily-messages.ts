import { formatWhatsAppNumber, sendWhatsAppTemplate } from "./whatsapp";

export async function sendMorningMessage(
  clientPhone: string,
  clientName: string
): Promise<void> {
  const templateSid = process.env.TWILIO_TEMPLATE_MORNING!;
  await sendWhatsAppTemplate(formatWhatsAppNumber(clientPhone), templateSid, {
    "1": clientName,
  });
}

export async function sendMiddayMessage(
  clientPhone: string,
  clientName: string
): Promise<void> {
  const templateSid = process.env.TWILIO_TEMPLATE_MIDDAY!;
  await sendWhatsAppTemplate(formatWhatsAppNumber(clientPhone), templateSid, {
    "1": clientName,
  });
}

export async function sendEveningMessage(
  clientPhone: string,
  clientName: string
): Promise<void> {
  const templateSid = process.env.TWILIO_TEMPLATE_EVENING!;
  await sendWhatsAppTemplate(formatWhatsAppNumber(clientPhone), templateSid, {
    "1": clientName,
  });
}

export async function sendDailyMessage(
  type: "morning" | "midday" | "evening",
  clientPhone: string,
  clientName: string
): Promise<void> {
  if (type === "morning") {
    await sendMorningMessage(clientPhone, clientName);
  } else if (type === "midday") {
    await sendMiddayMessage(clientPhone, clientName);
  } else {
    await sendEveningMessage(clientPhone, clientName);
  }
}
