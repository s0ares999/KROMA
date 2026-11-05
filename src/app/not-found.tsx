import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Arrow } from "@/components/arrow";
export default function NotFound() {
  return <SiteShell><section className="second-hero section-pad missing-page"><p className="eyebrow">404 / FORA DO ENQUADRAMENTO</p><h1>Por aqui,<br />ainda não.</h1><p>Esta página não está disponível. Vamos encontrar outro ponto de partida.</p><Link href="/" className="button button-lime">Voltar ao início <Arrow /></Link></section></SiteShell>;
}
