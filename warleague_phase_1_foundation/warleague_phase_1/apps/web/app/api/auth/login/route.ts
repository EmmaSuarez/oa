import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.redirect(new URL("/login", req.url));

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return NextResponse.redirect(new URL("/login", req.url));

  await createSession(user.id);
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
