/* MDX compiles to a component function. Evaluating that function is the render step. */
/* eslint-disable react-hooks/static-components */

import * as runtime from "react/jsx-runtime";
import type { AnchorHTMLAttributes, ComponentType, HTMLAttributes } from "react";
import { IconLink } from "@/components/icons";
import { CodeBlock } from "@/components/writing/code-block";
import { noteComponents } from "@/components/writing/note-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MdxComponent = ComponentType<{ components?: Record<string, ComponentType<any>> }>;

function compileMdx(code: string): MdxComponent {
  const fn = new Function(code) as (args: typeof runtime) => { default: MdxComponent };
  return fn({ ...runtime }).default;
}

function anchoredHeading(Tag: "h2" | "h3") {
  return function Heading({ id, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    if (!id) return <Tag {...props}>{children}</Tag>;
    return (
      <Tag id={id} className="group" {...props}>
        {children}
        <a
          href={`#${id}`}
          className="ml-2 inline-flex translate-y-[0.1em] align-baseline text-subtle opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="Link to this section"
        >
          <IconLink width={16} height={16} />
        </a>
      </Tag>
    );
  };
}

const components = {
  ...noteComponents,
  h2: anchoredHeading("h2"),
  h3: anchoredHeading("h3"),
  pre: CodeBlock,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} rel={props.target === "_blank" ? "noopener noreferrer" : props.rel} />
  ),
};

export function MdxContent({ code }: { code: string }) {
  const Component = compileMdx(code);
  return (
    <div className="prose">
      <Component components={components} />
    </div>
  );
}
