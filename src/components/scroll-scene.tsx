export function ScrollScene() {
  return <section className="scroll-scene" aria-labelledby="motion-title">
    <div className="scroll-scene-stage">
      <div className="motion-trails" aria-hidden="true">
        <svg viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice">
          <path data-draw d="M-100 600C180 600 130 100 440 100S720 600 1300 50" />
          <path data-draw d="M-100 630C210 630 160 130 470 130S750 630 1300 80" />
          <path data-draw d="M-100 660C240 660 190 160 500 160S780 660 1300 110" />
        </svg>
      </div>
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
