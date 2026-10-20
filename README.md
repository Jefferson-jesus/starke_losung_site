# STARKE LOSUNG — sistemas e sites

Site de prestação de serviços de desenvolvimento de sistemas e sites, em português e inglês. Next.js 15, React 19, TypeScript e Tailwind CSS. As páginas são geradas estaticamente; a detecção inicial de idioma fica no middleware.

## Rodar no notebook

Requisitos: Node.js 22 LTS ou versão compatível e npm. No PowerShell, use `npm.cmd` se a política do Windows bloquear `npm.ps1`.

```powershell
npm.cmd ci
if (!(Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm.cmd run dev
```

Abra `http://localhost:3000/pt-BR` ou `http://localhost:3000/en`.

## Contato pelo WhatsApp

O visitante preenche nome, e-mail, país, tipo de projeto e descrição. **Continuar no WhatsApp** abre `wa.me` com todos os campos organizados na mensagem, no idioma selecionado. O visitante revisa e confirma o envio no WhatsApp. Em computadores, o serviço pode oferecer WhatsApp Web ou o aplicativo instalado.

Os campos não são enviados para uma API deste site. Não são necessárias chaves de Resend ou Turnstile. O link de e-mail abre o cliente de e-mail do visitante.

## Configuração

Edite `.env.local` para desenvolvimento e configure as mesmas variáveis na hospedagem:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Endereço público definitivo, com `https://` |
| `WHATSAPP_NUMBER` | Número de atendimento com DDI e DDD |
| `CONTACT_EMAIL` | E-mail público de atendimento |
| `NEXT_PUBLIC_SITE_MODE` | `standard` ou `premium` |
| `NEXT_PUBLIC_SHOW_MODE_TOGGLE` | Mostrar seletor visual; recomendado `false` na publicação |
| `SITE_INDEXABLE` | `true` na produção fora da Vercel; `false` em desenvolvimento |
| `SOCIAL_INSTAGRAM_URL`, `SOCIAL_LINKEDIN_URL`, `SOCIAL_FACEBOOK_URL` | Perfis reais; deixe vazios para ocultar |

Na Vercel, a indexação é liberada apenas quando `VERCEL_ENV=production`. Previews permanecem bloqueados. Fora da Vercel, use `SITE_INDEXABLE=true` na produção. Alterações nessas variáveis exigem **novo build**, pois o contato e o conteúdo ficam nas páginas estáticas.

## Verificar e publicar

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd start
```

Com o servidor de produção aberto, em outro terminal:

```powershell
npm.cmd run smoke
```

Para outra porta, defina `SMOKE_BASE_URL` antes de executar. O smoke test verifica as 26 páginas PT/EN, idioma do HTML, detecção inicial, sitemap e rotas inexistentes.

Na Vercel: importe o repositório, selecione Next.js, configure as variáveis e publique. Em outra hospedagem compatível com Node.js: `npm ci`, `npm run build` e `npm start`, atrás de HTTPS. A fonte Inter está incluída localmente com a licença em `public/fonts/OFL.txt`.

## Template reutilizável

```powershell
npm.cmd run template
```

O pacote fica em `dist/starke-losung-template.zip`. A exportação usa uma lista explícita de arquivos e inclui o código, dependências travadas, testes e instruções. Não inclui `.env.local`, credenciais, histórico Git, `node_modules`, caches ou arquivos de build.

Para um novo projeto: extraia em uma pasta nova, execute `npm.cmd ci`, crie `.env.local` a partir do exemplo e personalize:

- `site.config.ts`: nome, contatos, chamadas e seções;
- `messages/`: textos em português e inglês;
- `lib/services.ts`: serviços e suas páginas;
- `lib/metadata.ts` e `app/[locale]/root-document.tsx`: títulos e descrição;
- `components/header.tsx`, `components/footer.tsx`: identificação da marca;
- `public/`: logotipo e imagens reais dos projetos.

Consulte [o checklist de lançamento](docs/LANCAMENTO.md) antes da publicação comercial.
