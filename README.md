# KROMA — website

Website local em Next.js App Router, TypeScript, GSAP/ScrollTrigger e CSS à medida. Sem deploy, integração de alojamento ou automatismos de publicação.

## Executar

Node.js 22+ e npm.

```sh
npm ci
npm run dev -- --port 3001
```

Abrir http://localhost:3001. A porta 3000 está ocupada por outro projeto neste computador.

```sh
npm run build
npm run typecheck
npm start -- --port 3001
```

## Páginas

- `/`: landing comercial com herói preto, seletor interativo de serviços, abordagem, processo e chamadas para preparar um pedido. Sem galeria de identidade visual.
- `/sobre`: apresentação do estúdio e conceito da marca (chroma/cor e grelha 3×3), sem histórias de fundadores inventadas.
- `/portfolio`: categorias e estrutura prontas; a seleção de projetos está vazia e explicitamente em preparação.
- `/portfolio/[slug]`: template de projeto com contexto, abordagem, imagens e créditos, servido apenas para projetos reais da coleção.
- `/contacto?servico=fotografia`: pedido em três etapas com seleção de serviço prévia, contexto/contacto, revisão e exportação TXT/cópia.

O formulário não envia dados, confirma reservas nem simula disponibilidade. Não há email público ou transporte de envio configurados. A indisponibilidade de envio é indicada antes do formulário e na revisão. Dados apenas em memória durante a utilização, sem persistência automática; guardar/copiar depende de ação explícita.

## Editar

- `src/content/offers.ts`: serviços, mensagens e slugs de ligação ao pedido.
- `src/content/projects.ts`: tipo e coleção de projetos, intencionalmente vazia.
- `src/components/service-explorer.tsx`: cena interativa da abertura; visuais abstratos ilustram áreas de serviço, não trabalhos de clientes.
- `src/components/booking-flow.tsx`: fluxo local do pedido.
- `src/components/motion.tsx`: animações com limpeza de contexto, atualização por rota e movimento reduzido.
- `src/components/immersive-scene.tsx` e `brand-world.tsx`: duas secções KROMA com cenário original em perspetiva, símbolo aprovado, texto animado e controlo para pausar o ambiente. O canvas limita a resolução e a frequência de desenho, e suspende a animação fora do ecrã ou com movimento reduzido.
- `src/app/immersive.css`: composição, iluminação e adaptação móvel das cenas. A referência NK Studio orienta a escala tipográfica, as entradas por linhas e a profundidade; não são usados assets, textos ou código da referência.
- `src/app/globals.css`: layout, tokens de marca, landing e componentes partilhados.
- `src/app/secondary.css` e `booking-flow.css`: páginas secundárias e pedido.

## Identidade e conteúdo

Verde `#C4F955`, preto e branco. Archivo Black local sob OFL; Helvetica Neue de sistema com fallback Helvetica/Arial. SVG originais aprovados, sem reconstrução de lettering ou duplicação de grelha. `docs/ASSETS.md` documenta a proveniência. As imagens de mockups herdadas não são usadas na landing ou no portefólio.

Não há contactos, clientes, preços, métricas, testemunhos ou projetos fictícios. O site de Lando Norris foi usado como referência de escala, camadas e movimento; nenhum asset ou código foi reutilizado.

## Antes da publicação

- Confirmar textos e canal público para pedidos.
- Implementar transporte real, validação no servidor e informação de privacidade antes de ativar envio de dados.
- Tratar data como preferência até existir confirmação de disponibilidade/reserva.
- Adicionar apenas projetos autorizados com imagens, créditos e papel da KROMA.
- Definir domínio e metadados finais; remover `robots: { index: false, follow: false }` só quando a publicação for aprovada.
- Definir licença web Helvetica Neue ou aprovar o fallback final.
- Configurar Vercel apenas quando for solicitado deploy.
