import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const components: Components = {
  p: ({ children }) => <p dir="auto">{children}</p>,
  li: ({ children }) => <li dir="auto">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ),
};

/** Markdown with GFM tables and KaTeX math. Works in server and client components. */
export function Markdown({ children, className = "prose-lesson" }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[[rehypeKatex, { strict: "ignore", throwOnError: false }]]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Single-line markdown (options, labels): no surrounding paragraph margins. */
export function InlineMarkdown({ children }: { children: string }) {
  return <Markdown className="prose-compact [&_p]:my-0 inline-md">{children}</Markdown>;
}
