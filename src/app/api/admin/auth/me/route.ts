import { NextResponse } from "next/server";

import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.session) return auth.response!;

  const admin = await getPrisma().adminUser.findUnique({
    where: { id: auth.session.sub },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!admin) return unauthorized();

  return NextResponse.json({ success: true, admin });
}
