"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { offers } from "@/content/offers";
import { Arrow } from "./arrow";

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const offer = offers[active];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".console-art", { opacity: 0, scale: .92, rotate: -3 }, { opacity: 1, scale: 1, rotate: 0, duration: .55, ease: "power3.out" });
      gsap.fromTo(".console-description", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4 });
    }, scope);
    return () => context.revert();
  }, [active]);

  return (
    <div className="hero-console" ref={scope}>
      <div className="console-top"><span>O TEU PRÓXIMO PASSO</span><span>{offer.number} / 05</span></div>
      <div className={`console-stage stage-${offer.visual}`} aria-hidden="true">
        <div className="viewfinder-lines" />
        <span className="viewfinder-corner one" /><span className="viewfinder-corner two" /><span className="viewfinder-corner three" /><span className="viewfinder-corner four" />
        <div className="console-art" key={offer.slug}>
          {offer.visual === "photo" && <div className="lens"><span className="lens-orbit" /><span className="lens-core" /><span className="lens-target" /><span className="lens-caption">EM FOCO</span></div>}
          {offer.visual === "video" && <div className="video-art"><span className="play-triangle" /><span className="video-timeline">01:00 <i /><i /><i /><i /><i /><i /><i /><i /><i /> REC</span></div>}
          {offer.visual === "design" && <div className="type-art"><span>Aa</span><small>A TUA MARCA. A TUA EXPRESSÃO.</small><i /></div>}
          {offer.visual === "web" && <div className="browser-art"><div className="browser-top"><i /><i /><i /><span>o teu próximo website</span></div><div className="browser-body">O teu<br />próximo<br /><strong>clique.</strong><span className="browser-button">DESCOBRIR ↗</span></div></div>}
          {offer.visual === "social" && <div className="social-art"><div className="social-back" /><div className="social-card"><span>A TUA MARCA.</span><strong>NO<br />TEU<br />FEED.</strong><small>CONTEÚDO COM INTENÇÃO ↗</small></div></div>}
        </div>
        <div className="stage-caption"><span>{offer.note}</span><span>↗</span></div>
      </div>
      <div className="console-description" aria-live="polite" aria-atomic="true"><span className="eyebrow">{offer.title}</span><p>{offer.heading}</p></div>
      <noscript><style>{`.console-choices{display:none}`}</style></noscript>
      <div className="console-choices" role="group" aria-label="Explorar um serviço">
        {offers.map((item,index) => <button key={item.slug} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{item.number}</span>{item.title}</button>)}
      </div>
      <Link href={`/contacto?servico=${offer.slug}`} className="console-link">{offer.action} <Arrow /></Link>
    </div>
  );
}
