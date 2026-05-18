import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { setSessionCookie, signSession } from "@/lib/auth";
import { badRequest, serverError } from "@/lib/admin-api";
import { getPrisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.email("أدخل بريدًا إلكترونيًا صحيحًا"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return badRequest("طلب غير صالح");
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("بيانات الدخول غير صحيحة");
  }

  const { email, password } = parsed.data;

  try {
    const admin = await getPrisma().adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      return badRequest("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return badRequest("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const token = signSession({
      sub: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login failed:", error);
    return serverError("تعذر تسجيل الدخول");
  }
}
