import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  siteType: z.string().min(2),
  message: z.string().min(10),
  locale: z.enum(["en", "pt-BR"]).default("en"),
  turnstileToken: z.string().optional()
});

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }
  if (!token) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token })
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return !!result.success;
}

export async function POST(request: Request) {
  try {
    const payload = bodySchema.parse(await request.json());
    const turnstileOk = await verifyTurnstile(payload.turnstileToken);

    if (!turnstileOk) {
      return NextResponse.json({ ok: false, message: "Turnstile validation failed." }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL || "hello@starkelosung.com";
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "STARKE LOSUNG <onboarding@resend.dev>",
        to: [contactEmail],
        subject: `New lead: ${payload.name}`,
        replyTo: payload.email,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Country: ${payload.country}`,
          `Site Type: ${payload.siteType}`,
          `Locale: ${payload.locale}`,
          "",
          payload.message
        ].join("\n")
      });
    } else {
      console.log("Contact form stub", payload);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ ok: false, message: "Unexpected error." }, { status: 500 });
  }
}
