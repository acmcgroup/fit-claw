import { formatWhatsAppNumber, sendWhatsAppTemplate } from "./whatsapp";

export async function sendMorningMessage(
  coachPhone: string,
  coachName: string
): Promise<void> {
  const templateSid = process.env.TWILIO_TEMPLATE_MORNING!;
  await sendWhatsAppTemplate(formatWhatsAppNumber(coachPhone), templateSid, {
    "1": coachName,
  });
}

export async function sendMiddayMessage(
  coachPhone: string,
  coachName: string
): Promise<void> {
  const templateSid = process.env.TWILIO_TEMPLATE_MIDDAY!;
  await sendWhatsAppTemplate(formatWhatsAppNumber(coachPhone), templateSid, {
    "1": coachName,
  });
}

export async function sendEveningMessage(
  coachPhone: string,
  coachName: string
): Promise<void> {
  const templateSid = process.env.TWILIO_TEMPLATE_EVENING!;
  await sendWhatsAppTemplate(formatWhatsAppNumber(coachPhone), templateSid, {
    "1": coachName,
  });
}

export async function sendDailyMessage(
  type: "morning" | "midday" | "evening",
  coachPhone: string,
  coachName: string
): Promise<void> {
  if (type === "morning") {
    await sendMorningMessage(coachPhone, coachName);
  } else if (type === "midday") {
    await sendMiddayMessage(coachPhone, coachName);
  } else {
    await sendEveningMessage(coachPhone, coachName);
  }
}
