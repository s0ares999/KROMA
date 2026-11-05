import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { PortfolioBrowser } from "@/components/portfolio-browser";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Portefólio — KROMA",
  description: "Fotografia, vídeo, design e presença digital. Explora os diferentes formatos do olhar KROMA.",
};

export default function PortfolioPage() {
  return (
    <SiteShell>
      <section className="second-hero portfolio-hero section-pad" aria-labelledby="portfolio-title">
        <div className="second-marker" data-reveal><span>PORTEFÓLIO / KROMA</span><span>IMAGEM COM INTENÇÃO.</span></div>
        <div className="second-hero-layout" data-reveal>
          <h1 id="portfolio-title">Em foco.<br />Em <span className="second-underline">cada formato.</span></h1>
          <p>Fotografia, vídeo, design e digital. Diferentes formas de dar presença a uma ideia.</p>
        </div>
      </section>
      <section className="portfolio-index section-pad" aria-label="Projetos por serviço">
        <PortfolioBrowser projects={projects} />
      </section>
    </SiteShell>
  );
}
