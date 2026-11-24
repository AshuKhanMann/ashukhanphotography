# Ashu Khan Photography

A full-featured professional photography business website built with **Next.js 16**, **Stripe**, **Supabase**, and **Cloudinary**.

**Live site:** [ashukhan.com](https://ashukhan.com)

---

## Features

| Feature | Details |
|---------|---------|
| **Portfolio Gallery** | Category-filtered masonry grid with watermarked photo previews and lightbox |
| **Services & Pricing** | 6 photography packages (Portraits, Weddings, Events, Commercial) |
| **Online Booking** | Full booking form with auto-confirmation emails to client and photographer |
| **Secure Payments** | Stripe Checkout — clients pay for sessions and photo packages |
| **Client Portal** | Password-free, email-based access for clients to download unwatermarked full-resolution photos |
| **Games Section** | Photography-themed mini-games (Memory Match, more coming) — deployable as `games.ashukhan.com` |
| **Contact Form** | Contact form with email notifications via Resend |
| **SEO Ready** | Open Graph metadata, optimized images via Cloudinary |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, TypeScript) |
| Styling | Tailwind CSS + inline styles |
| Payments | [Stripe](https://stripe.com) (Checkout + Webhooks) |
| Database | [Supabase](https://supabase.com) (PostgreSQL + Row Level Security) |
| Image Storage | [Cloudinary](https://cloudinary.com) (auto-watermarking + CDN delivery) |
| Email | [Resend](https://resend.com) |
| Deployment | [Vercel](https://vercel.com) |

---

## Project Structure

```
ashu-khan-photography/
├── app/
│   ├── page.tsx                  # Home
│   ├── portfolio/page.tsx        # Portfolio gallery
│   ├── services/page.tsx         # Services & pricing
│   ├── booking/page.tsx          # Booking form
│   ├── about/page.tsx            # About Ashu Khan
│   ├── contact/page.tsx          # Contact form
│   ├── portal/page.tsx           # Client photo download portal
│   ├── games/
│   │   ├── page.tsx              # Games hub
│   │   └── memory-match/page.tsx # Playable memory match game
│   └── api/
│       ├── booking/route.ts      # Booking form handler + email
│       ├── checkout/route.ts     # Stripe Checkout session creator
│       ├── contact/route.ts      # Contact form handler + email
│       └── webhooks/stripe/route.ts  # Stripe webhook (records payments)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── Testimonials.tsx
│   │   └── CallToAction.tsx
│   └── portfolio/
│       ├── PortfolioClient.tsx
│       ├── WatermarkedPhoto.tsx
│       └── LightboxModal.tsx
├── lib/
│   ├── stripe.ts
│   └── supabase.ts
├── .env.local.example            # Copy to .env.local and fill in keys
├── SETUP.md                      # Detailed setup guide
└── next.config.ts
```

---

## Step-by-Step Setup Guide

### Prerequisites

- [Node.js 18+](https://nodejs.org) (or install via `brew install node`)
- A terminal / command prompt
- Accounts at: Stripe, Supabase, Cloudinary, Resend (all free tiers available)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/AshuKhanMann/ashukhanphotography.git
cd ashukhanphotography
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

---

### Step 3 — Set Up External Services

#### 3a. Stripe (Payments)
1. Create a free account at [stripe.com](https://stripe.com)
2. Dashboard → Developers → API Keys
3. Copy your **Secret key** (`sk_live_...`) and **Publishable key** (`pk_live_...`)
4. Dashboard → Developers → Webhooks → **Add endpoint**
   - Endpoint URL: `https://ashukhan.com/api/webhooks/stripe`
   - Events to listen to: `checkout.session.completed`
   - Copy the **Signing secret** (`whsec_...`)
5. For testing, use `sk_test_...` / `pk_test_...` keys first

#### 3b. Supabase (Database)
1. Create a free project at [supabase.com](https://supabase.com)
2. Project Settings → API → copy **URL**, **anon key**, and **service_role key**
3. Go to SQL Editor and run:

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

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own orders"
  ON orders FOR SELECT
  USING (customer_email = current_setting('request.jwt.claim.email', true));
```

#### 3c. Cloudinary (Photo Storage)
1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Dashboard → copy **Cloud name**, **API Key**, **API Secret**
3. Upload your photos:
   - Watermarked previews → folder `portfolio/watermarked/`
   - Original full-resolution photos → folder `portfolio/originals/`
4. Cloudinary can auto-apply watermarks via URL transformations:
   ```
   https://res.cloudinary.com/YOUR_CLOUD/image/upload/l_text:Arial_40_bold:©_Ashu_Khan,co_white,o_30/portfolio/IMG_001.jpg
   ```

#### 3d. Resend (Emails)
1. Create a free account at [resend.com](https://resend.com)
2. Add your domain `ashukhan.com` → verify the DNS records they give you
3. API Keys → create a key → copy it (`re_...`)

---

### Step 4 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in all the values:

```env
NEXT_PUBLIC_URL=https://ashukhan.com

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=000000000000
CLOUDINARY_API_SECRET=xxxxxxxxxxxx

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

### Step 5 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Test everything:
- [ ] Home page, portfolio gallery, service cards all display
- [ ] Booking form submits (check Resend dashboard for emails)
- [ ] Stripe Checkout redirects (use test keys: `sk_test_...`)
- [ ] Client portal login shows photo gallery
- [ ] Memory Match game works

---

### Step 6 — Deploy to Vercel

#### Option A — Via CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked for environment variables, add them from `.env.local`.

#### Option B — Via GitHub (Recommended)

1. Push this repo to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import from GitHub → select `ashukhanphotography`
4. **Environment Variables** — add all 11 variables from your `.env.local`
5. Click **Deploy**

---

### Step 7 — Connect Your Domain (ashukhan.com)

#### In Vercel:
1. Project → **Settings** → **Domains**
2. Click **Add Domain** → type `ashukhan.com` → Add
3. Also add `www.ashukhan.com`
4. Vercel shows you the DNS records you need

#### In Your Domain Registrar (wherever you bought the domain):
5. Go to your registrar's **DNS settings**
6. Delete any existing `A` record for `@` (root domain)
7. Add these two records:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

8. Wait 10–60 minutes for DNS propagation
9. Vercel automatically issues a free SSL certificate (HTTPS)

✅ Your site is live at **https://ashukhan.com**

#### Optional — Games Subdomain (games.ashukhan.com)
- In Vercel: add `games.ashukhan.com` as another domain for the same project
- In DNS: add `CNAME games cname.vercel-dns.com`

---

### Step 8 — Add Your Photos

Replace placeholder content by updating these files:

**Portfolio** (`components/portfolio/PortfolioClient.tsx`):
- Replace the `photos` array with your real photos from Cloudinary

**Client Portal** (`app/portal/page.tsx`):
- Replace `SAMPLE_PHOTOS` with real Cloudinary download URLs

**About Page** (`app/about/page.tsx`):
- Replace the camera icon with your actual photo

**Contact Info** — search and replace across the project:
- `hello@ashukhan.com` → your real email
- `+1 (555) 000-0000` → your real phone number
- `New York, NY` → your actual location

---

## Customization

### Colors
The brand colors are defined in `app/globals.css`:
```css
:root {
  --accent: #c8a97e;      /* Gold accent */
  --background: #0a0a0a;  /* Near-black background */
  --foreground: #ededed;  /* Off-white text */
}
```

### Pricing Packages
Edit the `packages` array in `app/services/page.tsx` to change pricing, features, and package names.

### Social Media Links
Update the social media links in `components/layout/Footer.tsx` and `app/contact/page.tsx`.

---

## Payment Flow

```
Client browses portfolio (watermarked previews)
       ↓
Client selects package + clicks "Book"
       ↓
Booking form → email sent to Ashu + client
       ↓
Ashu confirms availability → sends Stripe payment link
       ↓
Client pays via Stripe Checkout
       ↓
Stripe webhook fires → order recorded in Supabase
       ↓
Client visits portal → enters email → sees download links
       ↓
Client downloads full-resolution unwatermarked photos
```

---

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Run ESLint
```

---

## Support

For questions or custom work, contact: **hello@ashukhan.com**

---

*Built with ❤️ for Ashu Khan Photography*
