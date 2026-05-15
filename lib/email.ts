import { Resend } from "resend";

export async function sendInstallEmail(to: string, installUrl: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@getfit.app";
  await resend.emails.send({
    from,
    to,
    subject: "Your GetFit install link",
    text: `To install GetFit on your VM, run the following command:\n\ncurl -fsSL "${installUrl}" | bash\n`,
  });
}
