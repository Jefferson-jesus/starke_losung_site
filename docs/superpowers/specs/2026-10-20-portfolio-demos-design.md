# Portfólio real e demonstrações autorais

Data: 20/10/2026. Estado: proposta para revisão do usuário; implementação ainda não iniciada.

## Objetivo e entendimento

O usuário quer preencher o portfólio da STARKE LOSUNG com exemplos que ajudem a vender desenvolvimento de sistemas e sites no Brasil e no exterior. Autorizou a criação de modelos e informou ser autor do site publicado da JRD Soluções e Manutenções.

A proposta aproveita a aprovação conversacional dos exemplos de site empresarial, landing page e sistema simples. Acrescenta o projeto real fornecido e detalha como integrar essas experiências ao repositório existente. A revisão deste arquivo precede o plano de implementação.

Critério principal de sucesso: o visitante distingue um projeto publicado de uma demonstração autoral, abre cada exemplo, experimenta as funções anunciadas e encontra uma chamada clara para solicitar um projeto semelhante à STARKE LOSUNG.

## Abordagens consideradas

| Abordagem | Benefício | Custo |
| --- | --- | --- |
| Demonstrações como rotas deste projeto — recomendada | Um repositório, um deploy e inclusão automática no template local | Exige separar o layout comercial dos layouts das demonstrações |
| Projetos em repositórios e publicações separados | Cada modelo tem ciclo de vida independente | Exige mais configurações, hospedagens e manutenção inicial |

A abordagem recomendada atende ao pedido de completar o portfólio e manter uma base reutilizável no notebook. Não há nova infraestrutura de servidor ou serviços externos para as demonstrações.

## Projetos apresentados

| Projeto | Classificação e destino | Conteúdo e funções |
| --- | --- | --- |
| JRD Soluções e Manutenções | Projeto publicado; `https://www.jrdsolucoesemanutencoes.com.br/` | Descrição factual do site de serviços e contato por WhatsApp; link externo para o trabalho real |
| Atlas Consulting | Modelo autoral; `/{locale}/demos/atlas-consulting` | Landing page B2B com apresentação, serviços, processo, FAQ acessível e chamada para um projeto semelhante |
| Forma Studio | Modelo autoral; `/{locale}/demos/forma-studio` | Site de arquitetura/interiores com apresentação, serviços, galeria navegável por categoria e chamada para um projeto semelhante |
| FlowDesk | Sistema demonstrativo; `/{locale}/demos/flowdesk` | Painel, cadastro e edição de clientes, busca, criação e edição de orçamentos com itens, cálculo de totais e alteração de status |

Os nomes e dados dos três modelos são fictícios. Não serão publicados depoimentos, resultados comerciais, faturamento de clientes ou entregas que não tenham sido informados pelo usuário. O contato comercial das demonstrações deve encaminhar à STARKE LOSUNG, com a referência do modelo, usando o fluxo de WhatsApp já existente.

O site da JRD foi consultado em 20/10/2026, respondeu HTTP 200 e apresenta crédito de desenvolvimento à STARKE LOSUNG. Essa consulta não constitui auditoria nem autorização para alterar o site externo. Ele permanece intacto.

## Estrutura e integração

1. `app/[locale]/layout.tsx` mantém a validação de idioma, `setRequestLocale`, o documento HTML e a preferência de idioma.
2. Um grupo `(marketing)` reúne as páginas comerciais existentes e um layout com cabeçalho, rodapé, modo visual, contato e dados estruturados da STARKE LOSUNG. As URLs atuais permanecem iguais.
3. Um grupo `(demos)` contém as rotas `demos/[slug]`, com uma barra de demonstração que permite voltar ao portfólio, trocar idioma e solicitar um projeto parecido. Cada modelo tem seu próprio layout visual, sem duplicar os menus comerciais ao redor dele.
4. Um catálogo tipado em `lib/portfolio.ts` define os quatro projetos, classificação, destino e prévia. A página de portfólio e a seção da página inicial consomem esse mesmo catálogo.
5. `PortfolioGrid` passa a mostrar descrição, classificação, prévia local e link funcional. O conteúdo deixa de depender de imagens numeradas ou da posição do item na lista.
6. Componentes e estilos das demonstrações ficam em unidades próprias, com estilos limitados a cada modelo. O modo standard/premium do site comercial não altera as cores das demonstrações.
7. Textos em português e inglês seguem o padrão atual do projeto. As traduções do sistema interativo são enviadas apenas à sua rota; o site comercial mantém o envio reduzido de traduções.

As páginas das demonstrações são geradas estaticamente para `pt-BR` e `en`. Slugs desconhecidos retornam 404. Elas recebem metadados próprios e `noindex`, e ficam fora do sitemap comercial para evitar indexação de empresas fictícias. O portfólio comercial continua indexável conforme a configuração de produção existente.

## Experiência visual

- **Portfólio:** quatro cartões com identificação visível de projeto publicado ou demonstração autoral. Título sugerido: “Projetos e demonstrações”.
- **Atlas Consulting:** azul profundo, fundo claro e hierarquia editorial para apresentar uma oferta de serviços B2B.
- **Forma Studio:** tons claros e quentes, tipografia de destaque e galeria com imagens ou ilustrações locais que representem os modelos fictícios.
- **FlowDesk:** interface clara com navegação própria, tabelas legíveis, indicadores derivados dos registros e formulários de cliente e orçamento.

As prévias precisam representar o que cada link realmente abre. Para JRD, usar captura real quando houver recurso disponível; qualquer representação ilustrativa deve ser identificada como tal. Os modelos autorais terão prévias coerentes com suas interfaces. Fontes e recursos visuais serão locais, com licenças preservadas quando aplicável.

A navegação precisa funcionar por teclado e em telas a partir de 360 px. Filtros, abas e formulários devem ter rótulos e estados compreensíveis. Controles devem executar a função anunciada; não haverá botões de funcionalidades indisponíveis.

## Dados e comportamento do FlowDesk

- Dados iniciais fictícios permitem experimentar o sistema imediatamente.
- Clientes contêm nome, empresa e e-mail. Orçamentos contêm cliente, título, itens com quantidade e valor unitário e status `rascunho`, `enviado` ou `aprovado`.
- Totais são derivados dos itens usando valores monetários em centavos. O painel reflete os registros e os status atuais.
- Alterações ficam neste navegador e podem ser restauradas por “Restaurar demonstração”. A interface informa que se trata de dados demonstrativos salvos localmente.
- O estado usa uma chave própria por idioma, separada das preferências do site. Conjuntos iniciais e moeda são BRL em português e USD em inglês, sem conversão entre moedas.
- Na indisponibilidade de armazenamento, a interação continua em memória durante a sessão. Conteúdo salvo inválido volta ao estado inicial, sem quebrar a página.
- Dados digitados no sistema não são transmitidos a uma API ou a terceiros. A solicitação comercial é uma ação separada que abre o WhatsApp da STARKE LOSUNG e depende de confirmação do visitante.

Autenticação, contas reais, pagamentos, emissão fiscal, integrações empresariais e armazenamento de produção ficam fora deste sistema demonstrativo. Essas capacidades podem ser propostas posteriormente em projetos de clientes.

## Verificação e aceite

1. JRD e os três modelos aparecem com a mesma identificação e destinos na página inicial e no portfólio. O link da JRD é externo e o destino é o domínio fornecido pelo usuário.
2. As três rotas de demonstração respondem em português e inglês, preservam o idioma ao navegar e oferecem retorno ao portfólio.
3. Atlas permite navegar nas seções e abrir o FAQ. Forma permite filtrar a galeria. Seus CTAs chegam ao contato da STARKE LOSUNG com referência ao modelo.
4. FlowDesk permite criar e editar um cliente, criar e editar um orçamento, calcular seus totais, buscar registros, alterar status e restaurar os dados iniciais.
5. Testes exercitam cálculos, validação dos dados salvos, atualizações de estado e destinos do catálogo. Os sete testes atuais permanecem passando.
6. `npm.cmd run check` e `npm.cmd run build` passam. A geração estática das páginas comerciais é preservada.
7. O smoke test cobre as 26 páginas comerciais e as seis páginas de demonstração, além de idiomas, metadados das demos, sitemap e 404. As demos não entram no sitemap comercial.
8. Realizar inspeção visual e interação em navegador nos tamanhos de celular e desktop quando o ambiente disponibilizar esse recurso. Registrar qualquer limitação de verificação, sem alegar testes não realizados.
9. Atualizar README e checklist de lançamento e gerar novamente `dist/starke-losung-template.zip`, incluindo os modelos e excluindo arquivos privados, caches e dependências instaladas.

## Continuidade

Após a revisão deste desenho, produzir o plano de implementação com os arquivos, etapas e verificações. A execução será proposta no ambiente atual. Commit e push da implementação ocorrerão ao final da validação, conforme a autorização do usuário para finalizar o trabalho no repositório.

## Estado de aceite — 21/10/2026

Critérios 1–9 implementados e verificados localmente: catálogo com 1 projeto publicado e 3 demos, seis rotas de modelos em PT/EN, fluxos interativos, 22 testes de unidade, 50 testes de navegador, build estático, smoke de 32 páginas, inspeção visual desktop/360 px, documentação e template. As capturas são reais; o site externo JRD foi acessado somente para leitura. Revisão independente final e push permanecem sob responsabilidade do controlador. Os testes não acionam envio real de contato; validação comercial no aparelho físico continua no checklist de lançamento.
