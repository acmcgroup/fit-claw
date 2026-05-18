import { formatWhatsAppNumber, sendWhatsAppTemplate } from "./whatsapp";

export async function sendMorningMessage(
  clientPhone: string,
  clientName: string,
  coachingTone: string
): Promise<void> {
  const templateSid = process.env[`TWILIO_TEMPLATE_MORNING_${coachingTone.toUpperCase()}`];
  if (!templateSid) throw new Error(`Missing template SID for MORNING ${coachingTone}`);
  await sendWhatsAppTemplate(formatWhatsAppNumber(clientPhone), templateSid, {
    "1": clientName,
  });
}

export async function sendMiddayMessage(
  clientPhone: string,
  clientName: string,
  coachingTone: string
): Promise<void> {
  const templateSid = process.env[`TWILIO_TEMPLATE_MIDDAY_${coachingTone.toUpperCase()}`];
  if (!templateSid) throw new Error(`Missing template SID for MIDDAY ${coachingTone}`);
  await sendWhatsAppTemplate(formatWhatsAppNumber(clientPhone), templateSid, {
    "1": clientName,
  });
}

export async function sendEveningMessage(
  clientPhone: string,
  clientName: string,
  coachingTone: string
): Promise<void> {
  const templateSid = process.env[`TWILIO_TEMPLATE_EVENING_${coachingTone.toUpperCase()}`];
  if (!templateSid) throw new Error(`Missing template SID for EVENING ${coachingTone}`);
  await sendWhatsAppTemplate(formatWhatsAppNumber(clientPhone), templateSid, {
    "1": clientName,
  });
}

export async function sendDailyMessage(
  type: "morning" | "midday" | "evening",
  clientPhone: string,
  clientName: string,
  coachingTone: string
): Promise<void> {
  if (type === "morning") {
    await sendMorningMessage(clientPhone, clientName, coachingTone);
  } else if (type === "midday") {
    await sendMiddayMessage(clientPhone, clientName, coachingTone);
  } else {
    await sendEveningMessage(clientPhone, clientName, coachingTone);
  }
}
