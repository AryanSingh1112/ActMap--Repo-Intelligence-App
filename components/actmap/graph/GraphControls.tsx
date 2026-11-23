"use client";

type GraphControlsProps = {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
};

export default function GraphControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onFit,
}: GraphControlsProps) {
  const button =
    "rounded-md px-3 py-1.5 text-[14px] text-muted transition-colors hover:bg-surface-2 hover:text-foreground";

  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-0.5 rounded-lg border border-line bg-surface p-1 shadow-lg">
      <button type="button" aria-label="Zoom out" onClick={onZoomOut} className={button}>
        −
      </button>

      <span className="min-w-12 text-center text-[13px] tabular-nums text-muted">
        {Math.round(zoom * 100)}%
      </span>

      <button type="button" aria-label="Zoom in" onClick={onZoomIn} className={button}>
        +
      </button>

      <button type="button" onClick={onFit} className={button}>
        Fit
      </button>
    </div>
  );
}
