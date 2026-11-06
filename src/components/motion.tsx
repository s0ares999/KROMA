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
        const scene = root.current?.querySelector<HTMLElement>(".scroll-scene");
        if (scene) {
          const paths = scene.querySelectorAll<SVGPathElement>("[data-draw]");
          paths.forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          });
          const timeline = gsap.timeline({ scrollTrigger: {
            trigger: scene, start: "top 65%", end: "bottom 85%", scrub: .7,
          } });
          timeline.from("[data-scene-word]", { yPercent: 65, opacity: .15, stagger: .18, duration: 1, ease: "power2.out" }, 0)
            .to(paths, { strokeDashoffset: 0, duration: 1.6, stagger: .12, ease: "none" }, 0)
            .fromTo(".motion-brand", { rotate: -65, scale: .55, yPercent: 20 }, { rotate: 0, scale: 1, yPercent: -12, duration: 2, ease: "none" }, 0);
        }
        // Keep the stronger parallax on spacious layouts, away from mobile controls.
        if (window.matchMedia("(min-width: 901px)").matches && root.current?.querySelector(".hero-console")) {
          gsap.to(".hero-console", { y: -45, rotate: 2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8 } });
        }
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
