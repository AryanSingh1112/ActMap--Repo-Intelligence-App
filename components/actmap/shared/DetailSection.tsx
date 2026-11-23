import type { ReactNode } from "react";

type DetailSectionProps = {
  title: string;
  caption?: string;
  count?: ReactNode;
  children: ReactNode;
};

/** A titled block in the right pane: title, a quiet caption, a count on the right. */
export default function DetailSection({
  title,
  caption,
  count,
  children,
}: DetailSectionProps) {
  return (
    <section className="border-t border-line px-6 py-5">
      <div className="mb-3 flex items-baseline gap-3">
        <h3 className="text-[16px] text-foreground">{title}</h3>
        {caption && <span className="text-[14px] text-muted">{caption}</span>}
        {count !== undefined && (
          <span className="ml-auto font-mono text-[15px] tabular-nums text-good">
            {count}
          </span>
        )}
      </div>

      {children}
    </section>
  );
}
