"use client";

import { useEffect, useRef } from "react";

type Point = [number, number, number];

/** Original perspective environments: a landscape and a translucent studio. */
export function BrandWorld({ ordered, paused }: { ordered: boolean; paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, frame = 0, visible = false, last = 0, time = 0;
    let pointer = 0, camera = 0;
    const terrain = (x: number, z: number) => -3 + (Math.sin(x * .42 + z * .17) * Math.cos(z * .31) + Math.sin(x * .19 - z * .27) * .8 + 1.5) * Math.min(1, Math.abs(x) / 12);
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const bounds = canvas.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, bounds.top / window.innerHeight));
      const focal = Math.max(width * .72, height * .65);
      const project = ([x, y, z]: Point): [number, number] => {
        const depth = z + 17 + (motion.matches || paused ? 0 : progress * 2);
        return [width * .5 + (x - camera) * focal / depth, height * .37 - (y - 4) * focal / depth];
      };
      const polygon = (points: Point[], fill: string | CanvasGradient) => {
        ctx.beginPath();
        points.forEach((point, i) => { const p = project(point); if (i) ctx.lineTo(...p); else ctx.moveTo(...p); });
        ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
      };
      if (ordered) {
        // Layered glass planes form a quiet studio around the central message.
        // This scene has no terrain or blocks, giving the method its own setting.
        const backdrop = ctx.createLinearGradient(0,0,width,height);
        backdrop.addColorStop(0,"#030706"); backdrop.addColorStop(.5,"#0b1513"); backdrop.addColorStop(1,"#020403");
        ctx.fillStyle=backdrop; ctx.fillRect(0,0,width,height);
        const lightX=width*(.45+Math.sin(time*.18)*.08);
        const halo=ctx.createRadialGradient(lightX,height*.35,0,lightX,height*.35,Math.max(width,height)*.6);
        halo.addColorStop(0,"#c4f95530"); halo.addColorStop(.4,"#668b3920"); halo.addColorStop(1,"#00000000");
        ctx.fillStyle=halo; ctx.fillRect(0,0,width,height);
        for(let layer=3;layer>=0;layer--) {
          for(const side of [-1,1]) {
            const z=layer*5+2;
            const x=side*(7+layer*.9);
            const outer=x+side*5.5;
            const float=Math.sin(time*.25+layer*.8)*.18;
            const base=-4+float, top=11+float;
            const p1=project([x,top,z]), p2=project([outer,base,z+4]);
            const glass=ctx.createLinearGradient(p1[0],p1[1],p2[0],p2[1]);
            glass.addColorStop(0,"#dfff9a65"); glass.addColorStop(.025,"#a9dc5c32");
            glass.addColorStop(.3,"#46664c38"); glass.addColorStop(.75,"#243b3538"); glass.addColorStop(1,"#02080675");
            polygon([[x,base,z],[outer,base+.8,z+4],[outer,top+1,z+4],[x,top,z]],glass);
            const rim=ctx.createLinearGradient(0,height*.15,0,height*.85);
            rim.addColorStop(0,"#e6ffb299"); rim.addColorStop(.4,"#c4f95560"); rim.addColorStop(1,"#678c2a00");
            polygon([[x,base,z],[x+side*.045,base,z],[x+side*.045,top,z],[x,top,z]],rim);
          }
        }
        ctx.save();
        ctx.translate(width*.5-camera*8,height*.79);ctx.scale(1,.14);
        const reflection=ctx.createRadialGradient(0,0,0,0,0,width*.46);
        reflection.addColorStop(0,"#c4f95535");reflection.addColorStop(.45,"#85b54c18");reflection.addColorStop(1,"#00000000");
        ctx.fillStyle=reflection;ctx.beginPath();ctx.arc(0,0,width*.46,0,Math.PI*2);ctx.fill();ctx.restore();
        return;
      }
      const glow = ctx.createRadialGradient(width * .5, height * .45, 0, width * .5, height * .45, width * .6);
      glow.addColorStop(0, "#849f2538"); glow.addColorStop(.45, "#32431620"); glow.addColorStop(1, "#00000000");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      for (let z = 70; z >= 0; z -= 3) {
        for (let x = -48; x < 48; x += 3) {
          const a: Point = [x, terrain(x,z),z], b: Point = [x+3,terrain(x+3,z),z];
          const c: Point = [x+3,terrain(x+3,z+3),z+3], d: Point = [x,terrain(x,z+3),z+3];
          const light = Math.max(5, 15 + (a[1]-c[1])*5) * (1-z/110);
          polygon([a,b,c], `rgb(${light*.8} ${light+4} ${light*.42})`);
          polygon([a,c,d], `rgb(${light*.65} ${light*.85+3} ${light*.3})`);
        }
      }
      // Architectural forms echo the square-based identity without replacing the logo.
      for (let row = 8; row >= 0; row--) {
        for (const side of [-1, 1]) {
          const z = row * 6 + 3;
          const x = side * (8 + Math.sin(row * 2.3) * 5);
          const y = terrain(x,z), size = 2 + (row % 3) * .7;
          const top = y + 1 + row % 4 * .7;
          polygon([[x,y,z],[x+size,y,z],[x+size,top,z],[x,top,z]], "#19230e");
          polygon([[x+size,y,z],[x+size,y,z+size],[x+size,top,z+size],[x+size,top,z]], "#0b1007");
          polygon([[x,top,z],[x+size,top,z],[x+size,top,z+size],[x,top,z+size]], row % 3 === 0 ? "#678534" : "#33451c");
        }
      }
      for (let i=0; i<32; i++) {
        const x = ((i * 137.51) % 100) / 100 * width;
        const y = height * (.14 + ((i * 37.7) % 55) / 100) + Math.sin(time*.3+i)*8;
        ctx.fillStyle = `rgba(196,249,85,${.08 + (i%4)*.045})`;
        ctx.fillRect(x,y,i%5===0 ? 2 : 1,i%5===0 ? 2 : 1);
      }
    };
    const tick = (stamp: number) => {
      frame = 0;
      if (!visible || document.hidden || paused || motion.matches) return;
      if (stamp-last > 32) { time += .033; camera += (pointer-camera)*.04; draw(); last=stamp; }
      frame=requestAnimationFrame(tick);
    };
    const sync = () => { cancelAnimationFrame(frame); frame=0; draw(); if (visible && !document.hidden && !paused && !motion.matches) frame=requestAnimationFrame(tick); };
    const resize = () => {
      const bounds=canvas.getBoundingClientRect(); width=bounds.width; height=bounds.height;
      const dpr=Math.min(window.devicePixelRatio || 1,1.5);
      canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0); sync();
    };
    const host=canvas.parentElement!;
    const onPointer = (event: PointerEvent) => { if(event.pointerType !== "touch") pointer=(event.clientX/window.innerWidth-.5)*1.6; };
    const resetPointer = () => { pointer=0; };
    const observer=new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); });
    const sizes=new ResizeObserver(resize);
    observer.observe(canvas); sizes.observe(canvas);
    host.addEventListener("pointermove",onPointer); host.addEventListener("pointerleave",resetPointer);
    document.addEventListener("visibilitychange",sync); motion.addEventListener("change",sync);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect(); host.removeEventListener("pointermove",onPointer); host.removeEventListener("pointerleave",resetPointer); document.removeEventListener("visibilitychange",sync); motion.removeEventListener("change",sync); };
  }, [ordered,paused]);
  return <canvas className="brand-world" ref={ref} aria-hidden="true" />;
}
