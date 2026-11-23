"use client";

import PathLabel from "./PathLabel";

type PathButtonProps = {
  path: string;
  dotColor?: string;
  tag?: string | null;
  hovered: boolean;
  trailing?: React.ReactNode;
  onSelect: (path: string) => void;
  onHover: (path: string | null) => void;
};

/**
 * A clickable path. Clicking moves the map's selection to it; hovering it
 * lights it up on the map, and hovering it on the map lights it up here.
 */
export default function PathButton({
  path,
  dotColor,
  tag,
  hovered,
  trailing,
  onSelect,
  onHover,
}: PathButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(path)}
      onPointerEnter={() => onHover(path)}
      onPointerLeave={() => onHover(null)}
      className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors ${
        hovered ? "bg-surface-2" : "hover:bg-surface-2"
      }`}
    >
      <PathLabel path={path} dotColor={dotColor} tag={tag} />
      {trailing}
    </button>
  );
}
