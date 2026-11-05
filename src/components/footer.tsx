import Link from "next/link";
import { Arrow } from "./arrow";
import { Brand } from "./brand";

export function Footer() {
  return (
    <footer className="footer section-pad">
      <div className="footer-top"><p>Olhar. Enquadrar. Criar.</p><nav aria-label="Navegação de rodapé"><Link href="/portfolio">Portefólio</Link><Link href="/sobre">Sobre nós</Link><Link href="/contacto">Contacto <Arrow /></Link></nav></div>
      <Link className="footer-brand" href="/" aria-label="KROMA — início"><Brand light /></Link>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} KROMA</span><span>Fotografia / Vídeo / Design / Digital</span></div>
    </footer>
  );
}
