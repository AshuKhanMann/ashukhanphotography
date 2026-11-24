import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Website Contact <noreply@ashukhan.com>",
        to: ["hello@ashukhan.com"],
        replyTo: email,
        subject: `Contact Form: ${subject || "New Message"} — ${name}`,
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject || "—"}</p>
          <hr/>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
