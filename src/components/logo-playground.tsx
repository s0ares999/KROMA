"use client";

import { useRef, useState } from "react";

const assembled = Array.from({ length: 9 }, (_, i) => ({ x: 23 + i % 3 * 18, y: 23 + Math.floor(i / 3) * 18 }));
const scattered = [{x:8,y:12},{x:43,y:5},{x:75,y:16},{x:17,y:42},{x:46,y:44},{x:78,y:49},{x:6,y:76},{x:39,y:78},{x:70,y:76}];

export function LogoPlayground() {
  const [pieces, setPieces] = useState(assembled);
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{index:number; x:number; y:number; left:number; top:number} | null>(null);
  const move = (index:number, x:number, y:number) => setPieces(previous => previous.map((p,i) => i === index ? {x:Math.max(0,Math.min(84,x)),y:Math.max(0,Math.min(84,y))} : p));
  return <section className="logo-playground section-pad" aria-labelledby="play-title">
    <div className="play-copy"><p className="eyebrow">A IDENTIDADE TAMBÉM SE MOVE.</p><h2 id="play-title">Fora da grelha.<br /><span className="highlight">Nas tuas mãos.</span></h2><p>Desmonta o símbolo. Arrasta cada quadrado e encontra a tua composição.</p><div className="play-actions"><button className="button button-lime" onClick={() => setPieces(scattered)}>Desmontar ↗</button><button className="button" onClick={() => setPieces(assembled)}>Repor grelha ↺</button></div><p id="play-help" className="play-help">Arrasta com o rato ou o dedo. Com o teclado, seleciona um quadrado e usa as setas.</p></div>
    <div className="play-board" ref={board} aria-label="Grelha KROMA interativa">
      {pieces.map((piece,index) => <button key={index} className="play-piece" aria-label={`Mover quadrado ${index+1}`} aria-describedby="play-help" style={{left:`${piece.x}%`,top:`${piece.y}%`}}
        onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); drag.current={index,x:event.clientX,y:event.clientY,left:piece.x,top:piece.y}; }}
        onPointerMove={event => { const d=drag.current; const rect=board.current?.getBoundingClientRect(); if(d?.index===index && rect) move(index,d.left+(event.clientX-d.x)/rect.width*100,d.top+(event.clientY-d.y)/rect.height*100); }}
        onPointerUp={() => {drag.current=null;}} onPointerCancel={() => {drag.current=null;}} onLostPointerCapture={() => {drag.current=null;}}
        onKeyDown={event => { const delta:Record<string,number[]>={ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]}; if(delta[event.key]) {event.preventDefault(); move(index,piece.x+delta[event.key][0],piece.y+delta[event.key][1]);} }} />)}
      <span className="play-board-label" aria-hidden="true">KROMA — PLAY / 09 ELEMENTOS</span>
    </div>
  </section>;
}
