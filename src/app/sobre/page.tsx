import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Arrow } from "@/components/arrow";

export const metadata: Metadata = {
  title: "Sobre nós — KROMA",
  description: "Um estúdio criativo que liga fotografia, vídeo, design e presença digital. Conhece o olhar e o conceito por trás da KROMA.",
};

const principles = [
  { number: "01", title: "Olhar.", text: "Começar por perceber. O projeto, as pessoas, o contexto e aquilo que queres comunicar." },
  { number: "02", title: "Enquadrar.", text: "Encontrar o essencial. Dar direção à ideia e escolher a linguagem, o formato e os detalhes certos." },
  { number: "03", title: "Criar.", text: "Transformar a intenção em imagem. Fazer com que fotografia, vídeo, design e digital comuniquem em conjunto." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="second-hero about-hero section-pad" aria-labelledby="about-title">
        <div className="second-marker" data-reveal><span>SOBRE NÓS / KROMA</span><span>UM ESTÚDIO. UM OLHAR COMUM.</span></div>
        <div className="second-hero-layout" data-reveal>
          <h1 id="about-title">Tudo começa<br />com um <span className="second-underline">olhar.</span></h1>
          <p>A KROMA junta fotografia e vídeo a design e presença digital. Criamos imagens e linguagens visuais para marcas, negócios e projetos que querem comunicar com intenção.</p>
        </div>
        <div className="about-capabilities" data-reveal><span>FOTOGRAFIA</span><span>VÍDEO</span><span>IDENTIDADE & DESIGN</span><span>WEBSITES</span><span>REDES SOCIAIS</span></div>
      </section>

      <section className="about-origin section-pad" aria-labelledby="origin-title">
        <div className="second-marker" data-reveal><span>A ORIGEM DO CONCEITO</span><span>COR / COMPOSIÇÃO / EXPRESSÃO</span></div>
        <div className="about-origin-layout">
          <h2 id="origin-title" data-reveal>O nome vem<br />da <span className="second-underline">cor.</span><br />A intenção<br />vem do olhar.</h2>
          <div className="about-origin-copy" data-reveal>
            <div className="about-symbol"><Image src="/brand/grid-green.svg" alt="Símbolo KROMA: nove células quadradas numa grelha três por três, com intervalos." width={800} height={800} /></div>
            <p>No conceito da marca, KROMA liga-se a <em>chroma</em>: cor. Uma forma de pensar a expressão, a personalidade e aquilo que faz uma imagem ser reconhecida.</p>
            <p>A grelha 3×3 aproxima o pixel da imagem digital da regra dos terços na fotografia e no vídeo. Liga a forma de enquadrar à forma de construir uma identidade.</p>
            <p>É deste encontro que parte a nossa linguagem: clara, próxima e intencional. Com espaço para a luz real, a cor natural e as ideias ganharem presença.</p>
          </div>
        </div>
      </section>

      <section className="about-principles section-pad" aria-labelledby="principles-title">
        <div className="second-marker" data-reveal><span>A NOSSA ABORDAGEM</span><span>DA PRIMEIRA IDEIA AO CONJUNTO.</span></div>
        <h2 id="principles-title" className="about-principles-title" data-reveal>Três verbos.<br />Uma forma de criar.</h2>
        <div className="about-principles-list">
          {principles.map((principle) => <article className="about-principle" key={principle.number} data-reveal><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}
        </div>
      </section>

      <section className="about-invite section-pad" aria-labelledby="about-invite-title">
        <span className="second-marker" data-reveal>AGORA, O TEU PROJETO.</span>
        <div className="about-invite-layout" data-reveal><h2 id="about-invite-title">O que vamos<br />criar <span className="second-underline">contigo?</span></h2><div><p>Conta-nos a ideia, o contexto e o que precisas. O primeiro enquadramento começa aí.</p><Link className="second-link second-link-black" href="/contacto">Preparar um pedido <Arrow /></Link></div></div>
      </section>
    </SiteShell>
  );
}
