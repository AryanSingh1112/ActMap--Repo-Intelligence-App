"use client";

import { frameworkLabel } from "../../../parser/taxonomy/categories";
import { useMemo } from "react";

import DetailSection from "../shared/DetailSection";
import Metric from "../shared/Metric";
import PathButton from "../shared/PathButton";

import { getExtensionColor } from "../../../lib/actmap/colors";
import type { RepositoryModel } from "../../../lib/actmap/model";
import type { RepositoryData } from "../../../types/actmap";

type RepositoryOverviewProps = {
  data: RepositoryData;
  model: RepositoryModel;
  hoverFile: string | null;
  onHover: (path: string | null) => void;
  onSelectFile: (path: string) => void;
};

const LIST_LIMIT = 10;


/**
 * What the pane shows when nothing is selected, which is the first thing
 * anyone sees: what this repository is, what the rest leans on, and where
 * reading starts.
 */
export default function RepositoryOverview({
  data,
  model,
  hoverFile,
  onHover,
  onSelectFile,
}: RepositoryOverviewProps) {
  const { mostDepended, startingPoints, unconnected } = useMemo(() => {
    const depended = model.files
      .filter((file) => file.fanIn > 0)
      .sort((a, b) => b.fanIn - a.fanIn || a.path.localeCompare(b.path));

    const starts = model.files
      .filter((file) => file.fanIn === 0 && file.fanOut > 0)
      .sort((a, b) => b.fanOut - a.fanOut || a.path.localeCompare(b.path));

    const isolated = model.files.filter(
      (file) => file.fanIn === 0 && file.fanOut === 0,
    ).length;

    return { mostDepended: depended, startingPoints: starts, unconnected: isolated };
  }, [model.files]);

  const unresolved = data.coverage?.unresolved ?? 0;

  return (
    <div>
      <div className="px-6 pb-5 pt-6">
        <h2 className="break-all font-mono text-[26px] font-semibold leading-8 tracking-tight text-foreground">
          {data.name}
        </h2>

        <p className="mt-3 text-[15px]">
          <span className="text-muted">Framework</span>
          <span className="ml-4 text-foreground">{frameworkLabel(data.adapter)}</span>
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-y border-line">
        <Metric label="Files" value={model.files.length} />
        <Metric
          label="Imports"
          value={model.edges.length}
          note={unresolved > 0 ? `${unresolved.toLocaleString()} unresolved` : undefined}
        />
        <Metric label="Routes" value={data.routes.length} />
      </div>

      <div className="mt-1" />

      <DetailSection
        title="Most depended on"
        caption="by files importing it"
        count={mostDepended.length}
      >
        {mostDepended.length === 0 ? (
          <p className="text-[14px] text-muted">No file in this map imports another.</p>
        ) : (
          <div className="-mx-2 space-y-0.5">
            {mostDepended.slice(0, LIST_LIMIT).map((file) => (
              <PathButton
                key={file.path}
                path={file.path}
                dotColor={getExtensionColor(file.extension)}
                hovered={hoverFile === file.path}
                onSelect={onSelectFile}
                onHover={onHover}
                trailing={
                  <span className="shrink-0 font-mono text-[14px] tabular-nums text-good">
                    ←{file.fanIn}
                  </span>
                }
              />
            ))}
          </div>
        )}

        {mostDepended.length > LIST_LIMIT && (
          <p className="mt-2 text-[14px] text-muted">
            {mostDepended.length - LIST_LIMIT} more not listed
          </p>
        )}
      </DetailSection>

      <DetailSection
        title="Imported by nothing"
        caption="where reading starts"
        count={startingPoints.length}
      >
        {startingPoints.length === 0 ? (
          <p className="text-[14px] text-muted">
            Every file with imports is itself imported by something.
          </p>
        ) : (
          <div className="-mx-2 space-y-0.5">
            {startingPoints.slice(0, LIST_LIMIT).map((file) => (
              <PathButton
                key={file.path}
                path={file.path}
                dotColor={getExtensionColor(file.extension)}
                hovered={hoverFile === file.path}
                onSelect={onSelectFile}
                onHover={onHover}
                trailing={
                  <span className="shrink-0 font-mono text-[14px] tabular-nums text-warn">
                    {file.fanOut}→
                  </span>
                }
              />
            ))}
          </div>
        )}

        {startingPoints.length > LIST_LIMIT && (
          <p className="mt-2 text-[14px] text-muted">
            {startingPoints.length - LIST_LIMIT} more not listed
          </p>
        )}
      </DetailSection>

      <section className="space-y-1.5 border-t border-line px-6 py-5 text-[14px] text-muted">
        <p>
          <span className="font-mono tabular-nums text-foreground">
            {model.files.length.toLocaleString()}
          </span>{" "}
          files no convention could identify
        </p>

        {unconnected > 0 && (
          <p>
            <span className="font-mono tabular-nums text-foreground">
              {unconnected.toLocaleString()}
            </span>{" "}
            files neither import nor are imported
          </p>
        )}
      </section>
    </div>
  );
}