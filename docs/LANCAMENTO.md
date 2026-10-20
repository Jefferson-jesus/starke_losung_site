# Prontidão para lançamento — STARKE LOSUNG

Revisão de 20/10/2026. Objetivo: prestar serviços de desenvolvimento de sistemas e sites para empresas no Brasil, EUA, Europa e outros mercados, com atendimento remoto em português e inglês.

## Base técnica preparada

- Formulários da página inicial e de contato abrem o WhatsApp com nome, e-mail, país, tipo de projeto e descrição. A confirmação do envio pertence ao visitante.
- Sistemas sob medida incluídos nos serviços, no formulário e no sitemap.
- Documento HTML com idioma correto, links alternativos PT/EN e navegação sem redirecionamento forçado pelo idioma do navegador.
- Páginas comerciais geradas no build, fonte local de 48 KB e somente as traduções necessárias aos componentes de cliente enviadas ao navegador.
- Modo visual aplicado no navegador, sem leitura de cookies que torne as páginas dinâmicas.
- Propostas por escopo; modelos de portfólio identificados como demonstração; depoimentos e estudos de caso genéricos desativados.
- Exportação do template sem configurações privadas, caches ou dependências instaladas.

## Pendências que precisam de dados reais

| Prioridade | Pendência | Critério para encerrar |
| --- | --- | --- |
| Antes de publicar | Confirmar número do WhatsApp e e-mail de atendimento | Abrir o formulário no celular e computador e conferir o destinatário e todos os campos; enviar uma solicitação real de teste |
| Antes de publicar | Confirmar domínio e hospedagem | Domínio próprio apontando para produção com HTTPS e `NEXT_PUBLIC_SITE_URL` correto |
| Antes de publicar | Identificar o prestador | Informar identidade comercial, responsável e meios de contato nos textos aplicáveis |
| Antes de publicar | Revisar privacidade e condições da prestação de serviço | Textos coerentes com a operação real, fornecedores, retenção de conversas, escopo, suporte e responsabilidades |
| Antes de anunciar | Validar oferta comercial | Definir escopo, preço, prazo, moeda e forma de pagamento em cada proposta; português ou inglês conforme o cliente |
| Antes de anunciar | Fortalecer o portfólio | Substituir imagens “Project 01…” por demos completas ou entregas autorizadas, com links e descrição do trabalho |
| Antes de anunciar | Conferir a experiência publicada | Navegação no celular, formulário, links, contraste, carregamento e nenhum erro no console |
| Após publicar | Medir desempenho real | Testar PageSpeed/Lighthouse em celular e acompanhar LCP, INP e CLS em tráfego real; o build estático não substitui essa medição |
| Após publicar | Liberar descoberta | Conferir `robots.txt`, canonical e sitemap no domínio final; cadastrar sitemap no mecanismo de busca escolhido |

## Operação internacional

O inglês permite receber contatos de diferentes países, sem pressupor que todos os clientes europeus usem o mesmo idioma. Propostas devem explicitar moeda, escopo, integrações, critérios de aceite, etapas de pagamento e suporte. A disponibilidade real de atendimento em inglês e os meios de recebimento precisam ser confirmados pelo prestador.

Não há checkout nem conversão automática de moedas. O site inicia uma conversa comercial pelo WhatsApp; valores e condições são acordados na proposta. A viabilidade comercial depende também da oferta, portfólio, atendimento e prospecção.

## Verificação reproduzível

Execute `npm.cmd run check`, `npm.cmd run build` e, com o servidor em produção aberto, `npm.cmd run smoke`. Execute `npm.cmd audit` para acompanhar os avisos atuais das bibliotecas. Não use `npm audit fix --force` sem revisar as mudanças de versão principal.

Na consulta de 20/10/2026, `npm audit --omit=dev` não reportou vulnerabilidades nas dependências de produção. A auditoria completa ainda reportou 9 avisos (7 altos e 2 moderados) na cadeia de ferramentas de desenvolvimento, incluindo Tailwind 3 e ferramentas de análise. A atualização dessas ferramentas para novas versões principais exige uma migração própria e uma nova validação do CSS e da análise de código.

A validação automatizada do projeto cobre tipos, lint, testes e páginas HTTP da versão de produção. A inspeção visual no navegador e o envio real no aplicativo devem ser realizados no notebook/celular antes dos anúncios.

Resultados desta revisão: `npm.cmd run check` passou com 7 testes; `npm.cmd run build` concluiu com 26 páginas localizadas estáticas; o smoke test passou nas 26 páginas, detecção inicial de idioma, sitemap e respostas 404. O ZIP foi conferido com 80 entradas, lockfile atual e sem arquivos privados. As traduções serializadas para componentes cliente passaram de aproximadamente 8,6–8,9 KB para 1,2–1,3 KB por idioma, redução de 86%.

Para encerrar o lançamento, conclua os itens da tabela no ambiente publicado, incluindo o teste real do atendimento e o domínio definitivo.
