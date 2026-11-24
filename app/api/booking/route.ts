import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, package: pkg, date, time, location, message } = body;

    if (!name || !email || !pkg || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Booking System <noreply@ashukhan.com>",
        to: ["hello@ashukhan.com"],
        subject: `New Booking Request — ${pkg} — ${name}`,
        html: `
          <h2>New Booking Request</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Package</td><td style="padding:8px">${pkg}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Date</td><td style="padding:8px">${date}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Time</td><td style="padding:8px">${time || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Location</td><td style="padding:8px">${location || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message || "—"}</td></tr>
          </table>
        `,
      });

      await resend.emails.send({
        from: "Ashu Khan Photography <hello@ashukhan.com>",
        to: [email],
        subject: "Your Booking Request — Ashu Khan Photography",
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for your booking request! I've received your enquiry for the <strong>${pkg}</strong> package on <strong>${date}</strong>.</p>
          <p>I'll review your request and get back to you within <strong>24 hours</strong> to confirm availability and send a secure payment link.</p>
          <p>In the meantime, feel free to browse my <a href="https://ashukhan.com/portfolio">portfolio</a>.</p>
          <br/>
          <p>Warm regards,<br/><strong>Ashu Khan</strong><br/>hello@ashukhan.com</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
