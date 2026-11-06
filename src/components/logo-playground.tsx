"use client";

import { useEffect, useRef, useState } from "react";

type Vec = [number, number, number];
type Axis = 0 | 1 | 2;
type Cubie = { position: Vec; basis: [Vec, Vec, Vec]; stickers: boolean[] };
const normals: Vec[] = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
const turns: { axis: Axis; layer: number; direction: number }[] = [
  {axis:1,layer:1,direction:1},{axis:0,layer:1,direction:-1},
  {axis:2,layer:1,direction:1},{axis:1,layer:-1,direction:-1},
  {axis:0,layer:-1,direction:1},{axis:2,layer:-1,direction:-1},
];
const rotate = (v: Vec, axis: Axis, angle: number): Vec => {
  const a = (axis+1)%3, b = (axis+2)%3, out: Vec = [...v];
  out[a]=v[a]*Math.cos(angle)-v[b]*Math.sin(angle);
  out[b]=v[a]*Math.sin(angle)+v[b]*Math.cos(angle);
  return out;
};
const orient = (v: Vec, basis: Cubie["basis"]): Vec => [0,1,2].map(i => v[0]*basis[0][i]+v[1]*basis[1][i]+v[2]*basis[2][i]) as Vec;
const createCube = (): Cubie[] => Array.from({length:27},(_,i) => {
  const position: Vec = [i%3-1,Math.floor(i/3)%3-1,Math.floor(i/9)-1];
  return {position,basis:[[1,0,0],[0,1,0],[0,0,1]],stickers:normals.map(n => n.some((value,axis) => value!==0 && position[axis]===value))};
});

export function LogoPlayground() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const stageRef=useRef<HTMLDivElement>(null);
  const controls=useRef<{pause:()=>void;view:()=>void}|null>(null);
  const [paused,setPaused]=useState(false);
  const [reduced,setReduced]=useState(false);
  useEffect(() => {
    const canvas=canvasRef.current, stage=stageRef.current;
    const ctx=canvas?.getContext("2d");
    if(!canvas || !ctx || !stage) return;
    const cube=createCube();
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    let width=1,height=1,frame=0,last=0,visible=false,stopped=false;
    let yaw=.62,pitch=.42,elapsed=0,turnIndex=0,turnAngle=0,dragging=false;
    let pointerX=0,pointerY=0,pointerId:number|null=null;
    const camera = (v:Vec) => rotate(rotate(v,1,yaw),0,pitch);
    const draw = () => {
      ctx.clearRect(0,0,width,height);
      const scale=Math.min(width,height)*1.2;
      const project=(v:Vec):[number,number] => [width*.5+v[0]*scale/(8-v[2]),height*.46-v[1]*scale/(8-v[2])];
      const move=turns[turnIndex%turns.length];
      const faces:{points:Vec[];normal:Vec;sticker:boolean;depth:number}[]=[];
      for(const cubie of cube) {
        const selected=cubie.position[move.axis]===move.layer;
        const transform=(v:Vec):Vec => {
          const local=orient(v,cubie.basis).map((value,i)=>value+cubie.position[i]*1.025) as Vec;
          return camera(selected ? rotate(local,move.axis,turnAngle) : local);
        };
        normals.forEach((normal,index) => {
          const basisNormal=orient(normal,cubie.basis);
          const n=camera(selected ? rotate(basisNormal,move.axis,turnAngle):basisNormal);
          const center=transform(normal.map(value=>value*.49) as Vec);
          // Perspective-aware backface culling, including partially turned slices.
          if(n[0]*-center[0]+n[1]*-center[1]+n[2]*(8-center[2])<=0) return;
          const axis=normal.findIndex(value=>value!==0), a=(axis+1)%3,b=(axis+2)%3;
          const points=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,v])=>{
            const p:Vec=[0,0,0];p[axis]=normal[axis]*.49;p[a]=u*.49;p[b]=v*.49;return transform(p);
          });
          faces.push({points,normal:n,sticker:cubie.stickers[index],depth:center[2]});
        });
      }
      faces.sort((a,b)=>a.depth-b.depth);
      const radius=Math.min(width,height);
      const path=(points:Vec[],inset=1) => {
        const center=points.reduce((sum,p)=>sum.map((v,i)=>v+p[i]/4) as Vec,[0,0,0] as Vec);
        ctx.beginPath();points.forEach((p,i)=>{const q=project(p.map((v,k)=>center[k]+(v-center[k])*inset) as Vec);if(i)ctx.lineTo(...q);else ctx.moveTo(...q);});ctx.closePath();
      };
      for(const face of faces) {
        path(face.points);ctx.fillStyle="#080b05";ctx.fill();
        if(!face.sticker) continue;
        const light=Math.max(.88,Math.min(1,.95+face.normal[1]*.04+face.normal[2]*.03-face.normal[0]*.02));
        path(face.points,.88);
        const top=project(face.points[0]),bottom=project(face.points[2]);
        const paint=ctx.createLinearGradient(top[0],top[1],bottom[0],bottom[1]);
        paint.addColorStop(0,"#c4f955");
        paint.addColorStop(1,`rgb(${Math.round(196*light)} ${Math.round(249*light)} ${Math.round(85*light)})`);
        ctx.fillStyle=paint;ctx.fill();
        // Diffused bloom, a saturated lime tube and a fine luminous core.
        ctx.lineJoin="round";
        ctx.strokeStyle="rgba(196,249,85,.16)";
        ctx.shadowColor="#c4f955";ctx.shadowBlur=radius*.055;
        ctx.lineWidth=Math.max(4,radius*.016);ctx.stroke();
        ctx.strokeStyle="#c4f955";ctx.shadowBlur=radius*.022;
        ctx.lineWidth=Math.max(2,radius*.007);ctx.stroke();
        ctx.shadowBlur=radius*.006;ctx.strokeStyle="#eeffc7";
        ctx.lineWidth=Math.max(.8,radius*.0025);ctx.stroke();
        ctx.shadowBlur=0;
      }
    };
    const advance = (delta:number) => {
      elapsed+=delta;
      const move=turns[turnIndex%turns.length];
      const progress=Math.min(1,Math.max(0,(elapsed-.9)/1.35));
      const eased=progress<.5?4*progress**3:1-(-2*progress+2)**3/2;
      turnAngle=eased*Math.PI/2*move.direction;
      if(progress===1) {
        cube.filter(c=>c.position[move.axis]===move.layer).forEach(c=>{
          c.position=rotate(c.position,move.axis,Math.PI/2*move.direction).map(Math.round) as Vec;
          c.basis=c.basis.map(v=>rotate(v,move.axis,Math.PI/2*move.direction).map(Math.round) as Vec) as Cubie["basis"];
        });
        turnIndex++;elapsed=0;turnAngle=0;
      }
      yaw+=delta*.055;
    };
    const tick = (stamp:number) => {
      frame=0;
      if(!visible || document.hidden || stopped || preference.matches || dragging) return;
      if(!last) last=stamp;
      const delta=(stamp-last)/1000;
      if(delta>=1/40) { advance(Math.min(delta,.06));draw();last=stamp; }
      frame=requestAnimationFrame(tick);
    };
    const sync = () => {cancelAnimationFrame(frame);frame=0;last=0;draw();if(visible&&!document.hidden&&!stopped&&!preference.matches&&!dragging)frame=requestAnimationFrame(tick);};
    const resize = () => {
      width=stage.clientWidth;height=stage.clientHeight;
      const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);sync();
    };
    const down=(e:PointerEvent)=>{if(e.button!==0 || pointerId!==null)return;pointerId=e.pointerId;stage.setPointerCapture(e.pointerId);pointerX=e.clientX;pointerY=e.clientY;dragging=true;sync();};
    const movePointer=(e:PointerEvent)=>{if(e.pointerId!==pointerId)return;yaw+=(e.clientX-pointerX)*.008;pitch=Math.max(-1.1,Math.min(1.1,pitch+(e.clientY-pointerY)*.008));pointerX=e.clientX;pointerY=e.clientY;draw();};
    const up=(e:PointerEvent)=>{if(e.pointerId!==pointerId)return;pointerId=null;dragging=false;sync();};
    const keys=(e:KeyboardEvent)=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key))return;e.preventDefault();if(e.key==="ArrowLeft")yaw-=.15;if(e.key==="ArrowRight")yaw+=.15;if(e.key==="ArrowUp")pitch-=.15;if(e.key==="ArrowDown")pitch+=.15;pitch=Math.max(-1.1,Math.min(1.1,pitch));draw();};
    const preferenceChanged=()=>{setReduced(preference.matches);sync();};
    controls.current={pause:()=>{stopped=!stopped;setPaused(stopped);sync();},view:()=>{yaw=.62;pitch=.42;draw();}};
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});
    const sizes=new ResizeObserver(resize);intersection.observe(stage);sizes.observe(stage);
    stage.addEventListener("pointerdown",down);stage.addEventListener("pointermove",movePointer);
    stage.addEventListener("pointerup",up);stage.addEventListener("pointercancel",up);stage.addEventListener("lostpointercapture",up);stage.addEventListener("keydown",keys);
    document.addEventListener("visibilitychange",sync);preference.addEventListener("change",preferenceChanged);
    preferenceChanged();resize();
    return()=>{cancelAnimationFrame(frame);controls.current=null;intersection.disconnect();sizes.disconnect();stage.removeEventListener("pointerdown",down);stage.removeEventListener("pointermove",movePointer);stage.removeEventListener("pointerup",up);stage.removeEventListener("pointercancel",up);stage.removeEventListener("lostpointercapture",up);stage.removeEventListener("keydown",keys);document.removeEventListener("visibilitychange",sync);preference.removeEventListener("change",preferenceChanged);};
  },[]);

  return <section id="cubo-kroma" className="logo-playground section-pad" aria-labelledby="play-title">
    <div className="play-copy"><p className="eyebrow">A IDENTIDADE EM OUTRA DIMENSÃO.</p><h2 id="play-title">Novas voltas.<br /><span className="highlight">A mesma essência.</span></h2><p>O nosso símbolo ganha profundidade. Cada face, uma grelha. Cada movimento, uma nova perspetiva. Sempre KROMA.</p><div className="play-actions"><button type="button" className="button button-lime" aria-pressed={paused} disabled={reduced} onClick={()=>controls.current?.pause()}>{reduced ? "Movimento reduzido" : paused ? "Retomar animação ▷" : "Pausar animação Ⅱ"}</button><button type="button" className="button" onClick={()=>controls.current?.view()}>Repor vista ↺</button></div><p id="play-help" className="play-help">Arrasta para rodar o cubo. Também podes usar as setas do teclado.</p></div>
    <div className="cube-display"><div className="cube-aura" aria-hidden="true"/><div ref={stageRef} className="cube-stage" role="group" tabIndex={0} aria-label="Cubo KROMA em 3D, com faces lima e camadas rotativas" aria-describedby="play-help"><canvas ref={canvasRef} aria-hidden="true"/><noscript><img src="/brand/grid-green.svg" alt="Símbolo KROMA" width="800" height="800"/></noscript></div><div className="cube-ground" aria-hidden="true"/><div className="cube-caption" aria-hidden="true"><span>KROMA / DIMENSÃO 03</span><span>UMA COR. INFINITAS PERSPETIVAS.</span></div></div>
  </section>;
}
