# Shiftly Landing Page

Marketing landing page for Shiftly — healthcare staff scheduling SaaS. Deployed on Vercel. No backend.

## Stack
Next.js 15, React 19, TypeScript, Tailwind CSS 4, Shadcn/ui (Button + Sheet), next-intl (en/it/de/fr), Framer Motion, Lucide icons.

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Structure
- `src/app/[locale]/` — pages with locale routing
- `src/components/` — one component per section + shared (CTAButton, SectionWrapper, LanguageSwitcher)
- `src/messages/` — translation JSONs (en.json, it.json, de.json, fr.json)
- `src/i18n/` — next-intl config
- `src/lib/` — utils.ts, animations.ts, constants.ts
- `middleware.ts` — locale detection

## Conventions
- Translation keys namespaced by component (e.g. `Hero.title`)
- CTA URL in `src/lib/constants.ts`
- Animations in `src/lib/animations.ts`
- All section components are client components (Framer Motion)

## Design rules
- NO: "AI powered", "revolutionizing", "in seconds", "instantly"
- USE: "in a few clicks", "quickly"
- Primary: indigo-600. White bg. Inter font. Minimalist.
