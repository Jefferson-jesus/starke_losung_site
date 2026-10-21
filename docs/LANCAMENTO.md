# Prontidão para lançamento — STARKE LOSUNG

Revisão de 21/10/2026. Objetivo: prestar serviços de desenvolvimento de sistemas e sites para empresas no Brasil, EUA, Europa e outros mercados, com atendimento remoto em português e inglês.

## Base técnica preparada

- Formulários da página inicial e de contato abrem o WhatsApp com nome, e-mail, país, tipo de projeto e descrição. A confirmação do envio pertence ao visitante.
- Sistemas sob medida incluídos nos serviços, no formulário e no sitemap.
- Documento HTML com idioma correto, links alternativos PT/EN e navegação sem redirecionamento forçado pelo idioma do navegador.
- Páginas comerciais geradas no build, fonte local de 48 KB e somente as traduções necessárias aos componentes de cliente enviadas ao navegador.
- Modo visual aplicado no navegador, sem leitura de cookies que torne as páginas dinâmicas.
- Propostas por escopo; modelos de portfólio identificados como demonstração; depoimentos e estudos de caso genéricos desativados.
- Página inicial e portfólio com um projeto publicado (JRD) e três demonstrações autorais, com capturas reais em `public/portfolio/`. JRD abre no domínio externo fornecido; o site externo permanece intacto.
- Atlas Consulting (`/{locale}/demos/atlas-consulting`), Forma Studio (`/{locale}/demos/forma-studio`) e FlowDesk (`/{locale}/demos/flowdesk`) disponíveis em `pt-BR` e `en`, com retorno ao portfólio, cores próprias, `noindex` e exclusão do sitemap comercial.
- FlowDesk permite cadastrar/editar clientes e orçamentos, buscar, calcular totais em centavos e alterar status. Os registros são fictícios, locais ao navegador e independentes por idioma (BRL/USD, sem conversão). Restaurar pede confirmação; armazenamento bloqueado mantém a interação só na sessão. Não há API, autenticação ou integração de produção.
- Solicitação comercial das demos separada dos registros locais: WhatsApp configurado em `site.config.ts`, com referência ao modelo e confirmação do envio pelo visitante.
- Exportação do template sem configurações privadas, caches ou dependências instaladas.

## Pendências que precisam de dados reais

| Prioridade | Pendência | Critério para encerrar |
| --- | --- | --- |
| Antes de publicar | Confirmar número do WhatsApp e e-mail de atendimento | Abrir o formulário no celular e computador e conferir o destinatário e todos os campos; enviar uma solicitação real de teste |
| Antes de publicar | Confirmar domínio e hospedagem | Domínio próprio apontando para produção com HTTPS e `NEXT_PUBLIC_SITE_URL` correto |
| Antes de publicar | Identificar o prestador | Informar identidade comercial, responsável e meios de contato nos textos aplicáveis |
| Antes de publicar | Revisar privacidade e condições da prestação de serviço | Textos coerentes com a operação real, fornecedores, retenção de conversas, escopo, suporte e responsabilidades |
| Antes de anunciar | Validar oferta comercial | Definir escopo, preço, prazo, moeda e forma de pagamento em cada proposta; português ou inglês conforme o cliente |
| Após publicar | Manter o portfólio atualizado | Conferir a JRD e as três demos; adicionar futuras entregas autorizadas e renovar capturas com `scripts/capture-previews.mjs` |
| Antes de anunciar | Conferir a experiência publicada | Navegação no celular, formulário, links, contraste, carregamento e nenhum erro no console |
| Após publicar | Medir desempenho real | Testar PageSpeed/Lighthouse em celular e acompanhar LCP, INP e CLS em tráfego real; o build estático não substitui essa medição |
| Após publicar | Liberar descoberta | Conferir `robots.txt`, canonical e sitemap no domínio final; cadastrar sitemap no mecanismo de busca escolhido |

## Operação internacional

O inglês permite receber contatos de diferentes países, sem pressupor que todos os clientes europeus usem o mesmo idioma. Propostas devem explicitar moeda, escopo, integrações, critérios de aceite, etapas de pagamento e suporte. A disponibilidade real de atendimento em inglês e os meios de recebimento precisam ser confirmados pelo prestador.

Não há checkout nem conversão automática de moedas. O site inicia uma conversa comercial pelo WhatsApp; valores e condições são acordados na proposta. A viabilidade comercial depende também da oferta, portfólio, atendimento e prospecção.

## Verificação reproduzível

Execute `npm.cmd run check`, `npm.cmd run build` e, com o servidor em produção aberto, `npm.cmd run smoke` e `npm.cmd run test:e2e` com `PLAYWRIGHT_BASE_URL` apontando para esse servidor. A instalação inicial do navegador usa `npx.cmd playwright install chromium`. Execute `npm.cmd audit` para acompanhar os avisos atuais das bibliotecas. Não use `npm audit fix --force` sem revisar as mudanças de versão principal.

Na consulta de 21/10/2026, `npm audit --omit=dev` não reportou vulnerabilidades nas dependências de produção. A auditoria completa ainda reportou 9 avisos (7 altos e 2 moderados) na cadeia de ferramentas de desenvolvimento, incluindo Tailwind 3 e ferramentas de análise. A atualização dessas ferramentas para novas versões principais exige uma migração própria e uma nova validação do CSS e da análise de código.

A validação automatizada cobre tipos, lint, domínio, catálogo e fluxos de navegador em desktop e 360 px. As capturas de produção foram inspecionadas localmente; a conferência no aparelho físico e o envio real no aplicativo permanecem no checklist antes dos anúncios.

Resultados desta revisão: `npm.cmd run check` passou com 22 testes, lint e tipos; `npm.cmd run build` gerou 37 páginas, incluindo 26 comerciais e seis demos localizadas estáticas. Em produção, os 50 testes de navegador e o smoke das 32 páginas passaram, incluindo idioma, `noindex`, sitemap e 404. O ZIP foi regenerado e conferido com lockfile idêntico ao atual e sem arquivos privados, caches ou evidências de navegador. As traduções de FlowDesk permanecem restritas à sua rota.

Para encerrar o lançamento, conclua os itens da tabela no ambiente publicado, incluindo o teste real do atendimento e o domínio definitivo.
