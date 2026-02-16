# STARKE LOSUNG Website

Site institucional em `Next.js + TypeScript + TailwindCSS` com `next-intl`, SEO técnico, formulário de contato e layout premium dark graphite/silver.

## Requisitos

- Node.js 20+
- npm 10+

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_SITE_KEY`
- `WHATSAPP_NUMBER` (com DDI, ex.: `+5511979795088`)
- `CONTACT_EMAIL`

## Deploy na Vercel

1. Suba o projeto para GitHub.
2. Importe o repositório na Vercel.
3. Defina as env vars em `Project Settings > Environment Variables`.
4. Deploy com framework preset `Next.js`.

Comandos usados pela Vercel:

- Build: `npm run build`
- Start: `npm run start`

## Estrutura principal

- `app/[locale]/` páginas internacionalizadas
- `app/api/contact/route.ts` endpoint de contato (Resend + Turnstile fallback)
- `messages/` traduções `en` e `pt-BR`
- `components/` componentes reutilizáveis
- `site.config.ts` seções de campanha/CTA configuráveis
- `app/sitemap.ts` e `app/robots.ts` SEO técnico

## Observações

- Idioma é detectado por cookie (`NEXT_LOCALE`) e `Accept-Language` no servidor.
- No cliente, `LocaleSync` prioriza `localStorage`, depois `navigator.language`, com fallback `en`.
- Se `RESEND_API_KEY` não estiver definida, o formulário funciona em modo stub (log no servidor).
