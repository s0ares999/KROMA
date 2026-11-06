export function ScrollScene() {
  return <section className="scroll-scene" aria-labelledby="motion-title">
    <div className="scroll-scene-stage">
      <div className="motion-scene-copy">
        <p className="eyebrow">DA IDEIA À EXPRESSÃO.</p>
        <h2 id="motion-title"><span data-scene-word>Imagem.</span><span data-scene-word>Movimento.</span><span data-scene-word>Presença.</span></h2>
        <p>É aqui que tudo ganha forma.</p>
      </div>
      {/* Preserve the approved brand artwork; animate its container only. */}
      <div className="motion-brand" aria-hidden="true"><img src="/brand/grid-green.svg" alt="" width="800" height="800" /></div>
      <div className="motion-scene-footer" aria-hidden="true"><span>KROMA / EM MOVIMENTO</span><span>CONTINUA A DESCOBRIR ↓</span></div>
    </div>
  </section>;
}
