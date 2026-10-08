import { IconArrowDown, IconArrowRight } from "@/components/icons";
import type { Project } from "@/lib/content";

type DiagramData = Project["diagrams"][number];

function nodeLabel(diagram: DiagramData, id: string) {
  return diagram.nodes.find((node) => node.id === id)?.label ?? id;
}

export function Diagram({ diagram }: { diagram: DiagramData }) {
  return (
    <figure className="card mt-6 overflow-hidden">
      <figcaption className="flex items-center justify-between border-b border-line bg-sunken px-5 py-3">
        <span className="font-mono text-meta tracking-[0.1em] text-muted uppercase">
          {diagram.title}
        </span>
        <span className="font-mono text-2xs text-subtle">
          {diagram.kind === "pipeline" ? `${diagram.nodes.length} steps` : "graph model"}
        </span>
      </figcaption>
      <div className="bg-grid relative p-5 [mask-image:none] md:p-6">
        {diagram.kind === "pipeline" ? (
          <ol className="relative grid list-none gap-0 p-0">
            {diagram.nodes.map((node, index) => (
              <li key={node.id}>
                <div className="flex items-start gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 shadow-sm">
                  <span className="inline-grid size-7 shrink-0 place-items-center rounded-lg bg-accent/12 font-mono text-meta font-semibold text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-body leading-snug font-medium text-ink">{node.label}</p>
                    {node.detail ? (
                      <p className="mt-0.5 text-caption leading-[1.5] text-muted">
                        {node.detail}
                      </p>
                    ) : null}
                  </div>
                </div>
                {index < diagram.nodes.length - 1 ? (
                  <div aria-hidden="true" className="flex justify-start py-1 pl-[1.35rem] text-subtle">
                    <IconArrowDown width={16} height={16} />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="grid list-none gap-2.5 p-0">
            {diagram.edges.map((edge) => (
              <li
                key={`${edge.from}-${edge.to}`}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-small"
              >
                <span className="rounded-lg border border-line bg-surface px-3 py-2 text-center font-medium shadow-sm">
                  {nodeLabel(diagram, edge.from)}
                </span>
                <span className="flex flex-col items-center gap-0.5 font-mono text-2xs text-accent">
                  {edge.label}
                  <IconArrowRight width={16} height={16} />
                </span>
                <span className="rounded-lg border border-line bg-surface px-3 py-2 text-center font-medium shadow-sm">
                  {nodeLabel(diagram, edge.to)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </figure>
  );
}
