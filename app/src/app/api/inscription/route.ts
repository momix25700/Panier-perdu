import { NextResponse } from "next/server";

// L'email est seulement écrit dans les logs Vercel pour l'instant.
// Pour le stocker vraiment, branche ici un service (Resend, Formspree, Supabase…).
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const ok = typeof email === "string" && /^\S+@\S+\.\S+$/.test(email);
    if (!ok) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    console.log("[inscription]", email.toLowerCase().trim());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}