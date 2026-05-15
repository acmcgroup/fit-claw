import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export function generateInstallToken(sessionId: string): { token: string; hash: string } {
  const token = randomBytes(16).toString("hex");
  const secret = process.env.INSTALL_TOKEN_SIGNING_SECRET!;
  const hash = createHmac("sha256", secret).update(`${sessionId}:${token}`).digest("hex");
  return { token, hash };
}

export function verifyInstallToken(sessionId: string, token: string, storedHash: string): boolean {
  const secret = process.env.INSTALL_TOKEN_SIGNING_SECRET!;
  const hash = createHmac("sha256", secret).update(`${sessionId}:${token}`).digest("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
