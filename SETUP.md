# Ashu Khan Photography — Setup & Deployment Guide

## 1. Set Up Your Service Accounts (15 min)

### Stripe (Payments)
1. Go to https://stripe.com and create a free account
2. Dashboard → Developers → API Keys → copy **Secret key** and **Publishable key**
3. Live mode toggle (top-right) → switch to Live when ready to accept real payments
4. Dashboard → Developers → Webhooks → "Add endpoint"
   - URL: `https://ashukhan.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`
   - Copy the **Signing secret**

### Supabase (Database + Client Auth)
1. Go to https://supabase.com and create a free project
2. Project Settings → API → copy **URL**, **anon/public key**, and **service_role key**
3. Run this SQL in Supabase SQL Editor to create the orders table:

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  package_id TEXT NOT NULL,
  session_date DATE,
  amount_paid INTEGER,
  paid_at TIMESTAMPTZ NOT NULL,
  photos_delivered BOOLEAN DEFAULT false,
  cloudinary_folder TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow clients to read their own orders by email
CREATE POLICY "Clients can view own orders"
  ON orders FOR SELECT
  USING (customer_email = current_setting('request.jwt.claim.email', true));
```

### Cloudinary (Photo Storage + Watermarking)
1. Go to https://cloudinary.com and create a free account
2. Dashboard → copy **Cloud name**, **API Key**, and **API Secret**
3. Upload watermarked versions to a `portfolio/watermarked/` folder
4. Upload original full-res photos to `portfolio/originals/` folder
5. Cloudinary auto-applies watermarks via URL transformations

### Resend (Email Notifications)
1. Go to https://resend.com and create a free account
2. Add your domain (ashukhan.com) → verify DNS records
3. API Keys → create a key → copy it

---

## 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Then fill in all values in `.env.local` using the credentials from Step 1.

---

## 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# After first deploy, set environment variables in Vercel dashboard:
# Project → Settings → Environment Variables
# Add all variables from .env.local
```

Or connect via GitHub:
1. Push this project to GitHub
2. Go to https://vercel.com → "Import Project" → select your repo
3. Add environment variables in the Vercel dashboard
4. Deploy

---

## 4. Connect Your Domain (ashukhan.com)

### In Vercel:
1. Project → Settings → Domains
2. Click "Add Domain" → type `ashukhan.com`
3. Also add `www.ashukhan.com`
4. Vercel shows you DNS records to add

### In Your Domain Registrar (wherever you bought ashukhan.com):
5. Go to your registrar's DNS settings
6. **Delete** any existing A record for `@`
7. Add these records from Vercel:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

8. Wait 10–60 minutes for DNS to propagate
9. Vercel will automatically issue an SSL certificate

### For the Games Subdomain (games.ashukhan.com):
- In Vercel: add `games.ashukhan.com` as another domain for the same project
- In DNS: add `CNAME games cname.vercel-dns.com`
- The `/games` route will be accessible at both `ashukhan.com/games` and `games.ashukhan.com`

---

## 5. Add Your Photos

Replace placeholder content by updating these areas:

1. **Portfolio Gallery** (`components/portfolio/PortfolioClient.tsx`):
   - Replace the `photos` array with your real Cloudinary image URLs
   - For watermarked previews: use Cloudinary URL with `l_text:Arial_40_bold:© ASHU KHAN` transformation
   - Example: `https://res.cloudinary.com/YOUR_CLOUD/image/upload/l_text:Arial_40_bold:©_Ashu_Khan,co_white,o_30/v1/portfolio/IMG_001.jpg`

2. **Client Portal** (`app/portal/page.tsx`):
   - Replace `SAMPLE_PHOTOS` with real Cloudinary download URLs for each order

3. **About Page** (`app/about/page.tsx`):
   - Replace the camera icon placeholder with your actual photo

4. **Home Hero** (`components/home/Hero.tsx`):
   - Optionally add a background image

---

## 6. Update Your Contact Info

Search and replace across the project:
- `hello@ashukhan.com` → your real email
- `+1 (555) 000-0000` → your real phone number
- `New York, NY` → your actual location

---

## 7. Test Before Going Live

```bash
npm run dev
```

Open http://localhost:3000 and test:
- [ ] Home page loads
- [ ] Portfolio gallery shows and filters work
- [ ] Booking form submits (check email in Resend dashboard)
- [ ] Stripe checkout redirects correctly (use test keys first)
- [ ] Client portal login works
- [ ] Games page and memory match work

Switch to Stripe test mode (use `sk_test_...` key) to test payments without real charges.

---

## Support

For questions or custom work: hello@ashukhan.com
