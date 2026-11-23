type PathLabelProps = {
  path: string;
  dotColor?: string;
  tag?: string | null;
};

/**
 * The folder part is dim and truncates first; the file name stays bright and
 * whole, which is the part you read.
 */
export default function PathLabel({ path, dotColor, tag }: PathLabelProps) {
  const slash = path.lastIndexOf("/");
  const folder = slash === -1 ? "" : path.slice(0, slash + 1);
  const name = slash === -1 ? path : path.slice(slash + 1);

  return (
    <span
      title={path}
      className="flex min-w-0 flex-1 items-center gap-2 font-mono text-[12.5px] leading-5"
    >
      {dotColor && (
        <span
          className="h-2 w-2 shrink-0 rounded-[2px]"
          style={{ backgroundColor: dotColor }}
        />
      )}

      {folder && <span className="min-w-0 truncate text-subtle">{folder}</span>}

      <span className="shrink-0 text-foreground">{name}</span>

      {tag && (
        <span className="ml-auto shrink-0 pl-2 text-[11px] text-subtle">{tag}</span>
      )}
    </span>
  );
}
