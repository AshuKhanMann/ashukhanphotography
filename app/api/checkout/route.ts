import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PACKAGES: Record<string, { name: string; price: number }> = {
  "portrait-basic": { name: "Portrait — Essential", price: 35000 },
  "portrait-premium": { name: "Portrait — Premium", price: 65000 },
  "wedding-essential": { name: "Wedding — Essential", price: 250000 },
  "wedding-luxury": { name: "Wedding — Luxury", price: 450000 },
  "event-half": { name: "Event — Half Day", price: 80000 },
  commercial: { name: "Commercial — Brand", price: 120000 },
};

export async function POST(req: NextRequest) {
  try {
    const { packageId, customerEmail, customerName, sessionDate } = await req.json();

    const pkg = PACKAGES[packageId];
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-11-18.endive",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Ashu Khan Photography — ${pkg.name}`,
              description: sessionDate ? `Session date: ${sessionDate}` : undefined,
              images: ["https://ashukhan.com/og-image.jpg"],
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId,
        customerName: customerName || "",
        sessionDate: sessionDate || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/portal?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/booking?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Payment session creation failed" }, { status: 500 });
  }
}
