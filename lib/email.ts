import { Resend } from "resend";

export async function sendOnboardingEmail(to: string, onboardingUrl: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@getfit.app";
  await resend.emails.send({
    from,
    to,
    subject: "Complete your GetFit setup",
    text: `Welcome to GetFit! Click the link below to complete your coach profile setup.\n\n${onboardingUrl}\n\nThis link can only be used once.`,
  });
}
