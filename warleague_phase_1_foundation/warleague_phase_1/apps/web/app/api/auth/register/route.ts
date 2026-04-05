import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const displayName = String(form.get("displayName") || "").trim();
  const password = String(form.get("password") || "");

  if (!email || !displayName || !password) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: {
      email,
      displayName,
      passwordHash,
      player: { create: {} }
    }
  });

  await createSession(user.id);
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
