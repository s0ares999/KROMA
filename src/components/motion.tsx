"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Motion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        if (root.current?.querySelector("[data-hero-line]")) {
          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from("[data-hero-line]", { yPercent: 110, duration: 1, stagger: 0.12 })
            .from(".hero-console", { opacity: 0, y: 35, duration: .85 }, .25)
            .from(".hero-meta", { opacity: 0, y: 12, duration: .6, stagger: .06 }, .6);
          gsap.to(".hero-watermark", { xPercent: -9, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .6 } });
        }
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
          gsap.from(element, { opacity: 0, y: 28, duration: .75, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 96%", once: true } });
        });
      }, root);
      const refresh = () => ScrollTrigger.refresh();
      const details = root.current?.querySelectorAll("details") ?? [];
      details.forEach(el => el.addEventListener("toggle", refresh));
      let active = true;
      document.fonts.ready.then(() => { if (active) refresh(); });
      const observer = new ResizeObserver(refresh);
      if (root.current) observer.observe(root.current);
      return () => { active = false; observer.disconnect(); details.forEach(el => el.removeEventListener("toggle", refresh)); context.revert(); };
    });
    return () => media.revert();
  }, [pathname]);
  return <div ref={root}>{children}</div>;
}
