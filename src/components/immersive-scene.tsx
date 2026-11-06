"use client";

import { useState } from "react";
import { BrandWorld } from "./brand-world";
import { Arrow } from "./arrow";

export function ImmersiveScene({ variant = "vision" }: { variant?: "vision" | "method" }) {
  const [paused, setPaused] = useState(false);
  const method = variant === "method";
  const id = method ? "visao-partilhada" : "universo-kroma";
  return <section id={id} className={`immersive-scene immersive-${variant}${paused ? " is-paused" : ""}`} aria-labelledby={`${id}-title`}>
    <BrandWorld ordered={method} paused={paused} />
    <div className="world-vignette" aria-hidden="true" />
    <div className="world-emblem" aria-hidden="true"><div className="world-emblem-float"><img src="/brand/grid-green.svg" alt="" width="800" height="800" /></div></div>
    <div className="immersive-content">
      <p className="eyebrow" data-world-reveal>{method ? "02 / UM OBJETIVO. UM OLHAR COMUM." : "01 / ENTRA NO UNIVERSO KROMA"}</p>
      <h2 id={`${id}-title`}><span className="world-title-window"><span data-world-line>{method ? "Tudo ligado." : "Damos forma"}</span></span><span className="world-title-window"><span data-world-line>{method ? "À tua visão" : "à tua ideia"}<span className="world-period">.</span></span></span></h2>
      <p className="world-description" data-world-reveal>{method ? "A tua visão é o ponto de partida. Ligamos fotografia, vídeo, design e digital para construir uma presença com a mesma intenção, em cada suporte." : "Uma marca, um evento, uma ideia por concretizar. Juntamos imagem, movimento e design para transformar o que imaginas em algo que se vê — e se sente."}</p>
      <a className="world-link" href={method ? "#processo" : "#servicos"} data-world-reveal>{method ? "Conhece o nosso processo" : "Descobre o que podemos criar"}<Arrow /></a>
    </div>
    <div className="world-caption"><span>{method ? "ALINHAR / CRIAR / DAR PRESENÇA" : "IMAGEM / MOVIMENTO / IDENTIDADE"}</span><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Retomar ambiente" : "Pausar ambiente"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></div>
  </section>;
}
