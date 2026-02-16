# STARKE LOSUNG Website

Site institucional em `Next.js + TypeScript + TailwindCSS` com `next-intl`, SEO tecnico, formulario de contato e layout premium dark graphite/silver.

## Requisitos

- Node.js 20+
- npm 10+

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

No PowerShell:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Variaveis de ambiente

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_SITE_KEY`
- `WHATSAPP_NUMBER` (com DDI, ex.: `+5511979795088`)
- `CONTACT_EMAIL`

## Deploy na Vercel

1. Suba o projeto no GitHub.
2. Importe o repositorio na Vercel.
3. Defina as env vars em `Project Settings > Environment Variables`.
4. Faça deploy com preset `Next.js`.

Comandos usados pela Vercel:

- Build: `npm run build`
- Start: `npm run start`

## Estrutura principal

- `app/[locale]/` paginas internacionalizadas
- `app/api/contact/route.ts` endpoint de contato (Resend + rate-limit + Turnstile placeholder)
- `messages/` traducoes `en` e `pt-BR`
- `components/` componentes reutilizaveis
- `site.config.ts` secoes de campanha/CTA configuraveis
- `app/sitemap.ts` e `app/robots.ts` SEO tecnico

## Observacoes

- Idioma e detectado por cookie (`NEXT_LOCALE`) e `Accept-Language` no servidor.
- No cliente, `LocaleSync` prioriza `localStorage`, depois `navigator.language`, com fallback `en`.
- Em preview/staging, `robots` bloqueia indexacao.
- Em producao (`VERCEL_ENV=production`), indexacao e sitemap sao liberados.
- Se `RESEND_API_KEY` nao estiver definida, o formulario funciona em modo stub (log no servidor).