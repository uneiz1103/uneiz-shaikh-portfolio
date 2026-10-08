import type { ReactNode } from "react";
import { Diagram } from "@/components/projects/diagram";

type Figure = { title: string; caption?: string; children: ReactNode };

function FigureFrame({ title, caption, children }: Figure) {
  return (
    <figure className="not-prose card my-8 overflow-hidden">
      <div className="border-b border-line bg-sunken px-5 py-3 font-mono text-meta tracking-[0.1em] text-muted uppercase">
        {title}
      </div>
      <div className="p-3 sm:p-6">{children}</div>
      {caption ? (
        <figcaption className="border-t border-line px-5 py-3 text-caption leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

type PipelineProps = { title: string; steps: (string | { label: string; detail?: string })[] };

export function Pipeline({ title, steps }: PipelineProps) {
  return (
    <div className="not-prose my-8">
      <Diagram
        diagram={{
          title,
          kind: "pipeline",
          nodes: steps.map((step, index) =>
            typeof step === "string"
              ? { id: String(index), label: step }
              : { id: String(index), label: step.label, detail: step.detail },
          ),
          edges: [],
        }}
      />
    </div>
  );
}

type RelationsProps = { title: string; relations: [from: string, label: string, to: string][] };

export function Relations({ title, relations }: RelationsProps) {
  const labels = Array.from(new Set(relations.flatMap(([from, , to]) => [from, to])));
  return (
    <div className="not-prose my-8">
      <Diagram
        diagram={{
          title,
          kind: "graph",
          nodes: labels.map((label) => ({ id: label, label })),
          edges: relations.map(([from, label, to]) => ({ from, to, label })),
        }}
      />
    </div>
  );
}

type GraphNode = { id: string; label: string; x: number; y: number; primary?: boolean };
type GraphEdge = { from: string; to: string; label: string };

export function GraphDiagram({
  title,
  caption,
  nodes,
  edges,
  height = 260,
}: {
  title: string;
  caption?: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  height?: number;
}) {
  const width = 340;
  const position = (id: string) => {
    const node = nodes.find((item) => item.id === id);
    return node ? { x: (node.x / 100) * width, y: (node.y / 100) * height } : { x: 0, y: 0 };
  };
  const nodeWidth = (label: string) => Math.max(64, label.length * 9.2 + 28);
  const labelWidth = (label: string) => label.length * 7.4 + 14;

  return (
    <FigureFrame title={title} caption={caption}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={edges
          .map((edge) => {
            const from = nodes.find((node) => node.id === edge.from)?.label;
            const to = nodes.find((node) => node.id === edge.to)?.label;
            return `${from} ${edge.label} ${to}`;
          })
          .join(", ")}
        className="mx-auto block h-auto w-full max-w-[520px]"
      >
        <defs>
          <marker
            id="note-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" className="fill-subtle" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const a = position(edge.from);
          const b = position(edge.to);
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const length = Math.hypot(dx, dy) || 1;
          const ux = Math.abs(dx / length) || 1e-6;
          const uy = Math.abs(dy / length) || 1e-6;
          const edgeDistance = (id: string) => {
            const label = nodes.find((node) => node.id === id)?.label ?? "";
            return Math.min(nodeWidth(label) / 2 / ux, 18 / uy);
          };
          const trimStart = edgeDistance(edge.from) + 4;
          const trimEnd = edgeDistance(edge.to) + 6;
          const start = { x: a.x + (dx / length) * trimStart, y: a.y + (dy / length) * trimStart };
          const end = { x: b.x - (dx / length) * trimEnd, y: b.y - (dy / length) * trimEnd };
          const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                className="stroke-line-strong"
                strokeWidth="1.5"
                markerEnd="url(#note-arrow)"
              />
              <rect
                x={mid.x - labelWidth(edge.label) / 2}
                y={mid.y - 10}
                width={labelWidth(edge.label)}
                height="20"
                rx="10"
                className="fill-surface stroke-line"
              />
              <text
                x={mid.x}
                y={mid.y + 4}
                textAnchor="middle"
                className="fill-accent font-mono"
                fontSize="12"
              >
                {edge.label}
              </text>
            </g>
          );
        })}
        {nodes.map((node) => {
          const { x, y } = position(node.id);
          const w = nodeWidth(node.label);
          return (
            <g key={node.id}>
              <rect
                x={x - w / 2}
                y={y - 18}
                width={w}
                height="36"
                rx="10"
                className={node.primary ? "fill-accent/15 stroke-accent" : "fill-surface stroke-line-strong"}
                strokeWidth="1.25"
              />
              <text
                x={x}
                y={y + 5.5}
                textAnchor="middle"
                className="fill-ink font-sans"
                fontSize="15"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </FigureFrame>
  );
}

type Cluster = { label: string; points: string[]; x: number; y: number; muted?: boolean };

export function MeaningMap({ title, caption, clusters }: { title: string; caption?: string; clusters: Cluster[] }) {
  const width = 360;
  const height = 230;
  const offsets = [
    [-22, -12],
    [18, -18],
    [4, 16],
    [-14, 22],
    [26, 10],
  ];

  return (
    <FigureFrame title={title} caption={caption}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={clusters
          .map((cluster) => `${cluster.label}: ${cluster.points.join("; ")}`)
          .join(". ")}
        className="mx-auto block h-auto w-full max-w-[520px]"
      >
        <line x1="20" y1={height - 20} x2={width - 16} y2={height - 20} className="stroke-line" />
        <line x1="20" y1="14" x2="20" y2={height - 20} className="stroke-line" />
        {clusters.map((cluster) => {
          const cx = (cluster.x / 100) * width;
          const cy = (cluster.y / 100) * height;
          return (
            <g key={cluster.label}>
              <circle
                cx={cx}
                cy={cy}
                r="42"
                className={cluster.muted ? "fill-accent-2/8 stroke-accent-2/40" : "fill-accent/10 stroke-accent/50"}
                strokeDasharray="4 4"
              />
              {cluster.points.map((point, index) => {
                const [ox, oy] = offsets[index % offsets.length];
                return (
                  <circle
                    key={point}
                    cx={cx + ox}
                    cy={cy + oy}
                    r="5"
                    className={cluster.muted ? "fill-accent-2" : "fill-accent"}
                  >
                    <title>{point}</title>
                  </circle>
                );
              })}
              <text
                x={cx}
                y={cy + 60}
                textAnchor="middle"
                className="fill-ink font-sans"
                fontSize="14"
                fontWeight="600"
              >
                {cluster.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {clusters.map((cluster) => (
          <li key={cluster.label} className="rounded-xl border border-line bg-bg p-3.5">
            <p className="flex items-center gap-2 text-caption font-semibold">
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full ${cluster.muted ? "bg-accent-2" : "bg-accent"}`}
              />
              {cluster.label}
            </p>
            <ul className="mt-2 grid gap-1 text-caption leading-snug text-muted">
              {cluster.points.map((point) => (
                <li key={point}>&ldquo;{point}&rdquo;</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </FigureFrame>
  );
}

type ComparisonProps = {
  title: string;
  columns: [string, string];
  rows: [label: string, left: string, right: string][];
};

export function Comparison({ title, columns, rows }: ComparisonProps) {
  return (
    <FigureFrame title={title}>
      <dl className="grid gap-4 sm:hidden">
        {rows.map(([label, left, right]) => (
          <div key={label} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
            <dt className="font-mono text-2xs tracking-[0.08em] text-subtle uppercase">{label}</dt>
            <dd className="mt-2 grid gap-1.5 text-small leading-snug">
              <p>
                <span className="font-semibold text-accent">{columns[0]}:</span> {left}
              </p>
              <p>
                <span className="font-semibold text-accent">{columns[1]}:</span> {right}
              </p>
            </dd>
          </div>
        ))}
      </dl>
      <table className="hidden w-full table-fixed border-collapse text-left text-small leading-snug sm:table">
        <caption className="sr-only">{title}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[26%] pb-3 font-mono text-2xs font-normal tracking-[0.08em] text-subtle uppercase">
              <span className="sr-only">Aspect</span>
            </th>
            {columns.map((column) => (
              <th key={column} scope="col" className="pb-3 pl-3 text-body font-semibold text-accent">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, left, right]) => (
            <tr key={label} className="border-t border-line align-top">
              <th scope="row" className="py-3 pr-2 font-mono text-meta font-normal tracking-[0.06em] text-subtle uppercase">
                {label}
              </th>
              <td className="py-3 pl-3">{left}</td>
              <td className="py-3 pl-3">{right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </FigureFrame>
  );
}

export function KeyIdea({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-accent/30 bg-accent/[0.07] px-5 py-4 text-md leading-relaxed font-medium text-ink">
      {children}
    </aside>
  );
}

export function Questions({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.question} className="card p-5">
          <p className="text-md leading-snug font-semibold">&ldquo;{item.question}&rdquo;</p>
          <p className="mt-2 font-mono text-meta tracking-[0.08em] text-accent uppercase">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export const noteComponents = {
  Pipeline,
  Relations,
  GraphDiagram,
  MeaningMap,
  Comparison,
  KeyIdea,
  Questions,
};
