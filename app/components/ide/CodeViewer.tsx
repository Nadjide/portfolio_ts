"use client";

import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import type { FileLang } from "../../ide/fileSystem";

// On n'enregistre que les langages réellement utilisés (bundle léger).
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("markdown", markdown);

const LANG: Record<FileLang, string> = {
  typescript: "typescript",
  json: "json",
  yaml: "yaml",
  markdown: "markdown",
};

export default function CodeViewer({
  code,
  lang,
}: {
  code: string;
  lang: FileLang;
}) {
  return (
    <SyntaxHighlighter
      language={LANG[lang]}
      style={vscDarkPlus}
      showLineNumbers
      wrapLongLines
      customStyle={{
        margin: 0,
        padding: "16px 12px",
        background: "#0d1117",
        fontSize: "13px",
        minHeight: "100%",
      }}
      codeTagProps={{
        style: {
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        },
      }}
      lineNumberStyle={{
        minWidth: "2.5em",
        paddingRight: "1em",
        color: "#6e7681",
        userSelect: "none",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
