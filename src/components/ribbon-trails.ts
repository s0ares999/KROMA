const SVG_NS = "http://www.w3.org/2000/svg";

/** Layered lighting gives the continuous SVG curves a rounded, metallic surface. */
export function createRibbonTrail(index: number) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 1200 1000");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("section-trails");
  const defs = document.createElementNS(SVG_NS, "defs");
  const gradient = document.createElementNS(SVG_NS, "linearGradient");
  const gradientId = `ribbon-metal-${index}`;
  gradient.id = gradientId;
  gradient.setAttribute("gradientUnits", "userSpaceOnUse");
  gradient.setAttribute("x1", "0");
  gradient.setAttribute("x2", "1200");
  for (const [offset, color] of [["0%", "#35551c"], ["24%", "#7fae36"], ["45%", "#e9ffbb"], ["55%", "#c4f955"], ["78%", "#6a961f"], ["100%", "#dfff9a"]]) {
    const stop = document.createElementNS(SVG_NS, "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    gradient.appendChild(stop);
  }
  defs.appendChild(gradient);
  svg.appendChild(defs);
  for (let i = 2; i >= 0; i--) {
    const group = document.createElementNS(SVG_NS, "g");
    group.classList.add("ribbon", `ribbon-${i}`);
    const x = 550 + i * 42;
    const bend = index % 2 === 0 ? 1050 : 90;
    const d = `M${x} 0 C${x} 230 ${bend + i * 42} 180 ${bend + i * 42} 500 S${x} 770 ${x} 1000`;
    for (const layer of ["shadow", "rim", "body", "light", "edge", "glint"]) {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("vector-effect", "non-scaling-stroke");
      path.classList.add(`ribbon-${layer}`);
      if (layer === "body") path.setAttribute("stroke", `url(#${gradientId})`);
      group.appendChild(path);
    }
    svg.appendChild(group);
  }
  return svg;
}
