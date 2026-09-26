# MySaaS Boilerplate

A production-ready SaaS starter template built with Next.js, Supabase, and Stripe.

## 🚀 Live Demo
[View Live](https://my-saas-five-iota.vercel.app)

## ✨ Features
- 🔐 Authentication (Email + Google OAuth)
- 💳 Stripe Billing & Subscription Management
- 📊 User Dashboard
- 👑 Admin Panel
- ⚙️ User Settings
- 🗄️ PostgreSQL Database with Row Level Security
- 🚀 Deploy Ready

## 🛠️ Tech Stack
- **Framework** - Next.js 14 App Router
- **Database** - Supabase (PostgreSQL)
- **Auth** - Supabase Auth
- **Payments** - Stripe
- **Styling** - Tailwind CSS
- **Deployment** - Vercel

## 📦 Getting Started

1. Clone the repo
```bash
git clone https://github.com/TwishaPatel24/my-saas.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
npm run dev
```


## 📁 Project Structure

```
├── app/
│   ├── (auth)/        # Login, Signup, Forgot Password
│   ├── (dashboard)/   # Protected dashboard pages
│   ├── (admin)/       # Admin only pages
│   └── api/           # API routes & Stripe webhooks
├── components/
│   └── dashboard/     # Dashboard components
└── lib/
    ├── supabase/      # Supabase clients
    └── stripe/        # Stripe integration

## 🔑 Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```