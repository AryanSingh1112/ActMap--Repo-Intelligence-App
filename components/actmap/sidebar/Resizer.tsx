"use client";

import { useRef, type PointerEvent } from "react";

type ResizerProps = {
  side: "left" | "right";
  width: number;
  minWidth: number;
  maxWidth: number;
  onResize: (width: number) => void;
};

export default function Resizer({
  side,
  width,
  minWidth,
  maxWidth,
  onResize,
}: ResizerProps) {
  const drag = useRef<{ startX: number; startWidth: number } | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    drag.current = { startX: event.clientX, startWidth: width };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;

    const delta = event.clientX - drag.current.startX;
    const next =
      side === "left"
        ? drag.current.startWidth + delta
        : drag.current.startWidth - delta;

    onResize(Math.min(maxWidth, Math.max(minWidth, next)));
  }

  function handlePointerUp() {
    drag.current = null;
  }

  return (
    <div
      role="separator"
      aria-label={`Resize ${side} pane`}
      aria-orientation="vertical"
      aria-valuenow={width}
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="group z-20 flex cursor-col-resize touch-none justify-center"
    >
      <div className="h-full w-px bg-line transition-colors group-hover:bg-accent" />
    </div>
  );
}
