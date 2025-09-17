// Preview.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Code } from "bright";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

export const Preview = ({ content }: { content: string }) => {
  // 2) Decode entities properly (see below) — don’t strip backslashes!
  const formattedContent = decodeEntities(content);

  return (
    <section className="markdown prose break-words">
      <MDXRemote
        source={formattedContent}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        components={{
          pre: (props) => (
            <Code
              {...props}
              lineNumbers
              className="shadow-light-200 dark:shadow-dark-200"
            />
          ),
        }}
      />
    </section>
  );
};

// Minimal decoder for the entities you’re seeing.
// Prefer a library like `he` (see option B below) for full coverage.
function decodeEntities(s: string) {
  return (
    s
      // turn &#xA; into a real newline
      .replace(/&#x0*A;/gi, "\n")
      // turn &#x20; into a real space
      .replace(/&#x0*20;/gi, " ")
      // common non-breaking space
      .replace(/\u00A0/g, " ")
  );
}
