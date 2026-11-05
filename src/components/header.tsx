"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./arrow";
import { Brand } from "./brand";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portefólio" },
  { href: "/sobre", label: "Sobre nós" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); }
    };
    const closeOnDesktop = () => { if (window.innerWidth > 800) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="header">
      <noscript><style>{`@media(max-width:800px){.header{flex-wrap:wrap}.menu-toggle{display:none}.navigation{display:flex;position:static;flex-direction:column;align-items:stretch;padding:12px 0 18px;box-shadow:none;border:0;gap:12px;width:100%}}`}</style></noscript>
      <Link href="/" className="brand-link" aria-label="KROMA — início" onClick={() => setOpen(false)}>
        <Brand light className="header-wordmark" />
        <span className="header-monogram"><Image src="/brand/monogram-white.svg" alt="KROMA" width={800} height={800} /></span>
      </Link>
      <button ref={button} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        {open ? "Fechar" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav id="main-nav" className={`navigation ${open ? "is-open" : ""}`} aria-label="Navegação principal">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={path === link.href ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Link className="nav-cta" href="/contacto" aria-current={path === "/contacto" ? "page" : undefined} onClick={() => setOpen(false)}>Vamos criar <Arrow /></Link>
      </nav>
    </header>
  );
}
