const box = "fill-surface-2 stroke-line";
const bar = "fill-muted/50";

function Node({ x, y, w = 150, h = 56, active = false }: { x: number; y: number; w?: number; h?: number; active?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} className={active ? "fill-surface-2 stroke-accent" : box} strokeWidth={active ? 1.5 : 1} />
      <rect x={x + 16} y={y + 16} width={w * 0.5} height={6} rx={3} className={bar} />
      <rect x={x + 16} y={y + 32} width={w * 0.3} height={5} rx={2.5} className={bar} />
    </g>
  );
}

/** The whole product in one picture: folders, imports, a selected folder, and the written explanation. */
export function HeroFigure() {
  return (
    <svg viewBox="0 0 960 440" aria-hidden="true" className="h-auto w-full">
      <g fill="none" className="stroke-line" strokeWidth={1.4}>
        <path d="M190 78 C 270 78, 260 150, 330 150" />
        <path d="M190 178 C 260 178, 270 190, 330 190" />
        <path d="M190 278 C 270 278, 260 230, 330 230" />
        <path d="M190 378 C 270 378, 260 270, 330 270" />
        <path d="M540 215 C 580 215, 590 215, 636 215" strokeDasharray="4 5" />
      </g>
      <path d="M190 178 C 260 178, 270 190, 330 190" fill="none" className="stroke-accent" strokeWidth={2} />

      <Node x={40} y={50} />
      <Node x={40} y={150} active />
      <Node x={40} y={250} />
      <Node x={40} y={350} />

      <rect x={330} y={100} width={210} height={230} rx={12} className="fill-surface-2 stroke-accent" strokeWidth={1.6} />
      <rect x={350} y={120} width={80} height={7} rx={3.5} className="fill-foreground/70" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          {i === 2 && <rect x={342} y={156 + i * 28} width={186} height={24} rx={6} className="fill-accent/15" />}
          <rect x={354} y={164 + i * 28} width={8} height={8} rx={2} className={i === 2 ? "fill-accent" : "fill-muted/60"} />
          <rect x={372} y={165 + i * 28} width={96 - (i % 3) * 16} height={6} rx={3} className={bar} />
          <rect x={496} y={165 + i * 28} width={20} height={6} rx={3} className="fill-muted/30" />
        </g>
      ))}

      <rect x={636} y={50} width={284} height={340} rx={14} className={box} />
      <rect x={658} y={76} width={110} height={8} rx={4} className="fill-foreground/70" />
      <rect x={658} y={96} width={70} height={6} rx={3} className="fill-muted/40" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i}>
          <rect x={658} y={128 + i * 26} width={i % 4 === 3 ? 120 : 240} height={6} rx={3} className={i === 1 || i === 5 ? "fill-accent/60" : bar} />
        </g>
      ))}
      <rect x={658} y={348} width={90} height={20} rx={10} className="fill-none stroke-line" />
    </svg>
  );
}

/** Files sorted into groups, with a count for each. */
export function CategoriesFigure() {
  const rows = [210, 140, 180, 100, 160];
  return (
    <svg viewBox="0 0 520 300" aria-hidden="true" className="h-auto w-full">
      {rows.map((width, i) => (
        <g key={i}>
          <rect x={0} y={i * 58} width={520} height={46} rx={10} className={i === 2 ? "fill-accent/10 stroke-accent" : box} strokeWidth={i === 2 ? 1.4 : 1} />
          <rect x={20} y={i * 58 + 18} width={width} height={8} rx={4} className={i === 2 ? "fill-accent" : bar} />
          <rect x={456} y={i * 58 + 13} width={44} height={20} rx={10} className="fill-none stroke-line" />
        </g>
      ))}
    </svg>
  );
}

/** Folders as nodes, imports as edges. */
export function ImportsFigure() {
  return (
    <svg viewBox="0 0 300 220" aria-hidden="true" className="h-auto w-full">
      <g fill="none" className="stroke-line" strokeWidth={1.3}>
        <path d="M70 40 C 120 40, 110 110, 150 110" />
        <path d="M70 180 C 120 180, 110 110, 150 110" />
        <path d="M210 110 C 240 110, 232 60, 250 60" />
        <path d="M210 110 C 240 110, 232 160, 250 160" />
      </g>
      <path d="M70 40 C 120 40, 110 110, 150 110" fill="none" className="stroke-accent" strokeWidth={1.8} />
      <Node x={10} y={18} w={80} h={44} />
      <Node x={10} y={158} w={80} h={44} />
      <Node x={150} y={84} w={80} h={52} active />
      <Node x={230} y={38} w={64} h={44} />
      <Node x={230} y={138} w={64} h={44} />
    </svg>
  );
}

/** A file, its neighbours, and the text written from them. */
export function ExplainFigure() {
  return (
    <svg viewBox="0 0 300 220" aria-hidden="true" className="h-auto w-full">
      <g fill="none" className="stroke-line" strokeWidth={1.3}>
        <path d="M70 50 C 100 50, 96 110, 120 110" />
        <path d="M70 170 C 100 170, 96 110, 120 110" />
      </g>
      <Node x={6} y={28} w={70} h={44} />
      <Node x={6} y={148} w={70} h={44} />
      <rect x={120} y={84} width={50} height={52} rx={8} className="fill-surface-2 stroke-accent" strokeWidth={1.5} />
      <rect x={186} y={20} width={108} height={180} rx={12} className={box} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={200} y={42 + i * 26} width={i % 3 === 2 ? 52 : 80} height={6} rx={3} className={i === 1 ? "fill-accent/70" : bar} />
      ))}
    </svg>
  );
}