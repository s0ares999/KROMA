import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { ServiceExplorer } from "@/components/service-explorer";
import { ServiceList } from "@/components/service-list";
import { SiteShell } from "@/components/site-shell";
import { ImmersiveScene } from "@/components/immersive-scene";
import { LogoPlayground } from "@/components/logo-playground";

export default function Home() {
  return <SiteShell>
    <section className="hero section-pad" aria-labelledby="hero-title">
      <div className="hero-watermark" aria-hidden="true">CRIAR.</div>
      <div className="hero-heading">
        <p className="eyebrow hero-meta"><span className="status-dot" /> ESTÚDIO CRIATIVO / FOTOGRAFIA + VÍDEO + DESIGN</p>
        <h1 id="hero-title"><span className="word-window"><span data-hero-line>Feita para</span></span><span className="word-window"><span data-hero-line>ser <span className="lime-underline">vista.</span></span></span></h1>
        <p className="hero-intro hero-meta">A tua marca. O teu evento. A tua próxima ideia.<br />Damos-lhes imagem, movimento e presença.</p>
        <div className="hero-actions hero-meta"><Link className="button button-lime" href="/contacto">Vamos criar a tua ideia <Arrow /></Link><a className="text-link" href="#servicos">Descobrir serviços <Arrow direction="down" /></a></div>
        <p className="hero-footnote hero-meta">DO PRIMEIRO ENQUADRAMENTO AO PRÓXIMO CLIQUE.</p>
      </div>
      <ServiceExplorer />
      <div className="hero-bottom hero-meta"><span>UM ESTÚDIO. DIFERENTES FORMAS DE TE FAZER VER.</span><a href="#servicos" aria-label="Continuar para os serviços"><span>SCROLL PARA DESCOBRIR</span><Arrow direction="down" /></a></div>
    </section>

    <ImmersiveScene />
    <LogoPlayground />

    <section className="intro-strip section-pad" aria-labelledby="intro-title">
      <span className="eyebrow" data-reveal>BOAS IDEIAS PEDEM PRESENÇA.</span>
      <h2 id="intro-title" data-reveal>Não basta estar.<br />É preciso <span className="highlight">fazer sentir.</span></h2>
      <p data-reveal>Uma imagem pode apresentar a tua marca. Um filme pode contar a tua história. Uma identidade pode ligar tudo. Escolhemos contigo a forma de comunicar o que tens para mostrar.</p>
    </section>

    <section id="servicos" className="services section-pad" aria-labelledby="services-title">
      <div className="section-marker" data-reveal><span>01 / O QUE PODEMOS CRIAR</span><span>ESCOLHE O TEU PONTO DE PARTIDA.</span></div>
      <div className="section-heading" data-reveal><h2 id="services-title">A tua ideia.<br />O nosso <span className="highlight">olhar.</span></h2><p>Um serviço ou várias peças do mesmo projeto.<br />Começamos pelo que precisas.</p></div>
      <ServiceList />
    </section>

    <ImmersiveScene variant="method" />

    <section id="processo" className="process section-pad" aria-labelledby="process-title">
      <div className="section-marker" data-reveal><span>02 / DO OLÁ À ENTREGA</span><span>UM PERCURSO CLARO.</span></div>
      <div className="section-heading" data-reveal><h2 id="process-title">Menos complicar.<br />Mais <span className="lime-underline">criar.</span></h2><p>Objetivo, âmbito e entregáveis alinhados.<br />Espaço para a tua ideia ganhar forma.</p></div>
      <div className="process-grid">{[
        {number:"01",title:"Conta-nos a ideia.",text:"O que queres comunicar, a quem e quando. Não precisas de ter todas as respostas para começar."},
        {number:"02",title:"Enquadramos contigo.",text:"Definimos abordagem, formatos, calendário e proposta. Para saberes o que vamos criar e o que vais receber."},
        {number:"03",title:"Damos-lhe forma.",text:"Da criação à entrega, mantemos o projeto alinhado com o objetivo e os suportes onde vai viver."},
      ].map(step=><article key={step.number} data-reveal><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <section className="work-teaser section-pad" aria-labelledby="work-title">
      <div className="section-marker" data-reveal><span>03 / ESPAÇO PARA O TRABALHO</span><span>POR TRÁS DE CADA IMAGEM, UMA INTENÇÃO.</span></div>
      <div className="work-teaser-body" data-reveal><h2 id="work-title">O que fazemos<br />vai <span className="highlight">ganhar espaço.</span></h2><div><p>Estamos a preparar a seleção de projetos para o portefólio. Entretanto, podemos começar pela tua ideia.</p><div className="work-links"><Link className="button button-dark" href="/contacto">Preparar um pedido <Arrow /></Link><Link className="text-link" href="/portfolio">Explorar o portefólio <Arrow /></Link></div></div></div>
    </section>

    <section className="conversion section-pad" aria-labelledby="conversion-title">
      <p className="eyebrow" data-reveal>O PRÓXIMO PASSO É TEU.</p>
      <Link className="conversion-link" href="/contacto" data-reveal><h2 id="conversion-title">Vamos fazer<br />a tua ideia <span>acontecer.</span></h2><span className="conversion-arrow"><Arrow /></span></Link>
      <div className="conversion-bottom" data-reveal><p>Escolhe o serviço. Conta-nos o essencial.<br />Começa a preparar o teu próximo projeto.</p><Link href="/contacto" className="text-link">Preparar pedido <Arrow /></Link></div>
    </section>
  </SiteShell>;
}
