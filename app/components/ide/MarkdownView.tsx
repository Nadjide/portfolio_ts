"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

/* Rendu markdown stylé VS Code Dark+. */

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8 text-[15px] leading-7 text-[#d4d4d4]">
      <ReactMarkdown
        components={{
          h1: (props) => (
            <h1 className="mb-4 mt-2 border-b border-[#1c222b] pb-2 text-2xl font-bold text-white" {...props} />
          ),
          h2: (props) => (
            <h2 className="mb-3 mt-6 text-xl font-semibold text-sky-300" {...props} />
          ),
          h3: (props) => (
            <h3 className="mb-2 mt-4 text-base font-semibold text-sky-200" {...props} />
          ),
          p: (props) => <p className="my-3" {...props} />,
          ul: (props) => <ul className="my-3 list-disc space-y-1 pl-6" {...props} />,
          ol: (props) => <ol className="my-3 list-decimal space-y-1 pl-6" {...props} />,
          li: (props) => <li className="text-[#cccccc]" {...props} />,
          a: (props) => (
            <a
              className="text-sky-400 underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              className="my-3 border-l-2 border-sky-500/40 pl-4 italic text-[#9da5b4]"
              {...props}
            />
          ),
          strong: (props) => <strong className="font-semibold text-white" {...props} />,
          code: (props) => (
            <code
              className="rounded bg-[#11151c] px-1.5 py-0.5 font-mono text-[13px] text-[#ce9178]"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="my-4 overflow-x-auto rounded-md border border-[#1c222b] bg-[#0d1117] p-4 font-mono text-[13px] text-[#d4d4d4]"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
