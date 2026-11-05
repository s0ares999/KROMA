# Proveniência dos assets KROMA

Os originais foram apenas lidos e preservados. A seleção provém de:
`/Users/pedrodsoares/Documents/Codex/2026-10-31/referenced-chatgpt-conversation-this-is-an/outputs/`.

## Marca vetorial

Todos os SVG em `brand/` são cópias binárias dos SVG fornecidos, sem reconstrução do lettering, alteração de geometria, cor ou grelha. A assinatura horizontal já integra uma grelha: nunca juntar outra grelha à sua direita.

| Ficheiro web | Original |
| --- | --- |
| `logo-dark.svg` | `KROMA-biblioteca/01-Logotipos-SVG/logo-secundario.svg` |
| `logo-light.svg` | `KROMA-biblioteca/01-Logotipos-SVG/logo-principal.svg` |
| `signature-horizontal.svg` | `KROMA-biblioteca/01-Logotipos-SVG/assinatura-horizontal-com-grelha.svg` |
| `monogram.svg` | `KROMA-biblioteca/01-Logotipos-SVG/monograma-cor.svg` |
| `monogram-black.svg` | `KROMA-biblioteca/01-Logotipos-SVG/monograma-preto.svg` |
| `monogram-white.svg` | `KROMA-biblioteca/01-Logotipos-SVG/monograma-branco.svg` |
| `grid-green.svg` | `KROMA-biblioteca/01-Logotipos-SVG/simbolo-grelha-cor.svg` |
| `grid-black.svg` | `KROMA-biblioteca/01-Logotipos-SVG/simbolo-grelha-preto.svg` |
| `grid-white.svg` | `KROMA-biblioteca/01-Logotipos-SVG/simbolo-grelha-branco.svg` |
| `signature-vertical.svg` | `KROMA-assinatura-vertical.svg` (versão corrigida) |

As caixas dos SVG contêm transparência exterior. O relatório `asset-report.json` nesta pasta regista limites visuais rasterizados à escala 1:1 (tolerância ~1px). Os limites não correspondem ao resguardo de marca recomendado, que deve ser acrescentado na composição.

- Logo dark/light: viewBox 1600×500; conteúdo em x=140–1537, y=140–366; proporção visual ~6,18:1.
- Assinatura horizontal: viewBox 1800×600; conteúdo em x=100–1322, y=220–418; proporção ~6,17:1. Possui margem direita substancial; preferir logo-dark/light ou gerir a caixa com CSS sem esticar.
- Monogramas: viewBox 800×800; conteúdo em x=96–704, y=212–588; proporção visual ~1,62:1.
- Grelhas: viewBox 800×800; conteúdo quadrado em x=100–700, y=100–700. Nove células com intervalos transparentes.

## Imagens

| Ficheiro web | Original | Dimensões | Tamanho |
| --- | --- | --- | --- |
| `images/kroma-stationery.webp` | `Mockups KROMA/01-papelaria.png` | 1536×1024 | 138 518 bytes |
| `images/kroma-signage.webp` | `Mockups KROMA/08-logo-fisico.png` | 1536×1024 | 88 624 bytes |

Exportação WebP qualidade 78, sem reenquadramento ou alteração visual. Inspeção visual: não contêm pessoas, manequins ou partes do corpo.

São mockups gerados que ilustram aplicações da identidade da própria KROMA. Não são fotografias de trabalhos executados para clientes, de instalações reais do estúdio, ou portefólio de fotografia. Identificar este contexto junto das imagens. A lettering nestas simulações é parte da imagem gerada; para logótipos de interface usar sempre os SVG originais.

## Tipografia

`src/fonts/ArchivoBlack-Regular.ttf` é cópia da fonte instalada em `/Users/pedrodsoares/Library/Fonts/ArchivoBlack-Regular.ttf`. Usar apenas para títulos, nunca para recompor o logótipo. A licença OFL oficial acompanha a distribuição em `public/fonts/ArchivoBlack-OFL.txt`, obtida de https://github.com/google/fonts/blob/main/ofl/archivoblack/OFL.txt.

Helvetica Neue não foi copiada nem redistribuída. Utilizar como fonte de sistema com alternativas sans-serif até existir licença web adequada.
