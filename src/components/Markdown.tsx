import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const base: Components = {
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ),
};

// Free text typed by the learner (notes, chat) may be in either language: let each paragraph pick its direction.
const auto: Components = {
  ...base,
  p: ({ children }) => <p dir="auto">{children}</p>,
  li: ({ children }) => <li dir="auto">{children}</li>,
};

/**
 * Markdown with GFM tables and KaTeX math. Works in server and client components.
 * Curriculum text inherits the page direction; pass autoDir for learner-written text.
 */
export function Markdown({ children, className = "prose-lesson", autoDir = false }: { children: string; className?: string; autoDir?: boolean }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[[rehypeKatex, { strict: "ignore", throwOnError: false }]]} components={autoDir ? auto : base}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Single-line markdown (options, labels): no surrounding paragraph margins. */
export function InlineMarkdown({ children }: { children: string }) {
  return <Markdown className="prose-compact [&_p]:my-0 md-inline">{children}</Markdown>;
}
