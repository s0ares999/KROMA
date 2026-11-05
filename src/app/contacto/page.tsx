import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contacto — Vamos criar | KROMA",
  description: "Prepara o teu próximo projeto de fotografia, vídeo, design, websites ou redes sociais com a KROMA.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ servico?: string | string[] }> }) {
  const query = await searchParams;
  const initialService = typeof query.servico === "string" ? query.servico : undefined;
  return <SiteShell>
    <section className="second-hero contact-hero section-pad" aria-labelledby="contact-title">
      <div className="second-marker"><span>CONTACTO / O TEU PRÓXIMO PROJETO</span><span>O PRIMEIRO PASSO É UMA IDEIA.</span></div>
      <div className="second-hero-layout"><h1 id="contact-title">Vamos criar<br /><span className="second-underline">contigo.</span></h1><p>Um evento, uma marca ou uma ideia que ainda está a ganhar forma. Escolhe por onde queres começar e prepara o teu pedido.</p></div>
    </section>
    <section className="contact-flow-section section-pad" aria-label="Preparar pedido de projeto">
      <aside className="contact-aside"><span className="eyebrow">O QUE AJUDA A COMEÇAR</span><p>O objetivo.<br />O contexto.<br />A tua visão.</p><span>Não precisas de ter tudo definido.<br />O enquadramento faz-se em conjunto.</span><div>Data e disponibilidade<br />sujeitas a confirmação.</div></aside>
      <BookingFlow key={initialService ?? "default"} initialService={initialService} />
    </section>
  </SiteShell>;
}
