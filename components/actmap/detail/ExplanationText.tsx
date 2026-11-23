"use client";

import { useMemo } from "react";

import { makeResolver, parseExplanation, type Inline } from "../../../lib/ai/render";

type Props = {
  text: string;
  /** The paths the model was shown, used to resolve a bare file name. */
  shown: string[];
  files: { has(path: string): boolean };
  onSelectFile: (path: string) => void;
  onHover: (path: string | null) => void;
};

/** Renders the three permitted pieces of formatting. Every repository path is a link that moves the map. */
export default function ExplanationText({ text, shown, files, onSelectFile, onHover }: Props) {
  const blocks = useMemo(
    () => parseExplanation(text, makeResolver(files, shown)),
    [text, shown, files],
  );

  function inline(nodes: Inline[]): React.ReactNode {
    return nodes.map((node, index) => {
      switch (node.type) {
        case "text":
          return node.text;
        case "code":
          return (
            <code key={index} className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.88em]">
              {node.text}
            </code>
          );
        case "bold":
          return (
            <strong key={index} className="font-semibold text-foreground">
              {inline(node.children)}
            </strong>
          );
        case "link":
          return (
            <button
              key={index}
              type="button"
              title={node.path}
              onClick={() => onSelectFile(node.path)}
              onPointerEnter={() => onHover(node.path)}
              onPointerLeave={() => onHover(null)}
              className="rounded bg-accent/10 px-1.5 py-0.5 text-left font-mono text-[0.88em] text-accent underline-offset-2 hover:underline"
            >
              {node.label}
            </button>
          );
      }
    });
  }

  return (
    <div className="space-y-4 text-[16px] leading-7 text-foreground">
      {blocks.map((block, index) =>
        block.type === "paragraph" ? (
          <p key={index}>{inline(block.children)}</p>
        ) : (
          <ul key={index} className="list-disc space-y-1.5 pl-5">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{inline(item)}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
