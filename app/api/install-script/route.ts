import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { orders } from "@/db/schema";
import { verifyInstallToken } from "@/lib/token";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const sessionId = searchParams.get("session_id");
  const token = searchParams.get("token");

  if (!sessionId || !token) {
    return new NextResponse("missing session_id or token", { status: 400 });
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId));

  if (!order) {
    return new NextResponse("not found", { status: 404 });
  }

  if (order.status !== "fulfilled") {
    return new NextResponse("payment not completed", { status: 403 });
  }

  if (order.tokenHash === null) {
    return new NextResponse("payment not completed", { status: 403 });
  }

  if (!verifyInstallToken(sessionId, token, order.tokenHash)) {
    return new NextResponse("invalid token", { status: 403 });
  }

  if (order.tokenUsedAt !== null) {
    return new NextResponse("token already used", { status: 403 });
  }

  await db
    .update(orders)
    .set({ tokenUsedAt: new Date() })
    .where(eq(orders.stripeSessionId, sessionId));

  const script = `#!/usr/bin/env bash
set -euo pipefail
echo "GetFit: payment verified."
echo "Replace this script with your OpenClaw install steps."
`;

  return new NextResponse(script, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
