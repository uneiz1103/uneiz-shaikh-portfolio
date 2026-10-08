"use client";

import { useRef, useState, type HTMLAttributes } from "react";
import { IconCheck, IconCopy } from "@/components/icons";

type PreProps = HTMLAttributes<HTMLPreElement> & { "data-language"?: string };

export function CodeBlock(props: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-block not-prose overflow-hidden rounded-xl border border-line bg-sunken">
      <div className="flex items-center justify-between border-b border-line py-1 pr-1 pl-4">
        <span className="label">{language && language !== "plaintext" ? language : "text"}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 font-mono text-xs text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          {copied ? <IconCheck width={14} height={14} /> : <IconCopy width={14} height={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} {...props} />
      <span aria-live="polite" className="sr-only">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </div>
  );
}
