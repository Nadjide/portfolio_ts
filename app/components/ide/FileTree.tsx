"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import type { FileNode, TreeNode } from "../../ide/fileSystem";
import { FileIcon, FolderIcon } from "./FileIcon";

function Chevron({ open }: { open: boolean }) {
  return (
    <Icon
      aria-hidden
      icon="lucide:chevron-right"
      className={`shrink-0 text-[14px] text-[#8b949e] transition-transform ${open ? "rotate-90" : ""}`}
    />
  );
}

function Folder({
  node,
  depth,
  activePath,
  onOpenFile,
}: {
  node: Extract<TreeNode, { type: "folder" }>;
  depth: number;
  activePath: string | null;
  onOpenFile: (f: FileNode) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        role="treeitem"
        aria-expanded={open}
        aria-selected={false}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-1 py-[3px] pr-2 text-[13px] text-[#cccccc] hover:bg-white/[0.06]"
        style={{ paddingLeft: depth * 12 + 4 }}
      >
        <Chevron open={open} />
        <FolderIcon name={node.name} open={open} />
        <span className="truncate">{node.name}</span>
      </button>
      {open ? (
        <div role="group">
          {node.children.map((child) => (
            <Node
              key={child.path}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onOpenFile={onOpenFile}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Node({
  node,
  depth,
  activePath,
  onOpenFile,
}: {
  node: TreeNode;
  depth: number;
  activePath: string | null;
  onOpenFile: (f: FileNode) => void;
}) {
  if (node.type === "folder") {
    return (
      <Folder node={node} depth={depth} activePath={activePath} onOpenFile={onOpenFile} />
    );
  }
  const active = activePath === node.path;
  return (
    <button
      type="button"
      role="treeitem"
      aria-selected={active}
      onClick={() => onOpenFile(node)}
      className={`flex w-full items-center gap-1.5 py-[3px] pr-2 text-left text-[13px] hover:bg-white/[0.06] ${
        active ? "bg-[#1c2a3d] text-white" : "text-[#cccccc]"
      }`}
      style={{ paddingLeft: depth * 12 + 16 }}
    >
      <FileIcon icon={node.icon} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export default function FileTree({
  nodes,
  activePath,
  onOpenFile,
}: {
  nodes: TreeNode[];
  activePath: string | null;
  onOpenFile: (f: FileNode) => void;
}) {
  return (
    <div className="py-1" role="tree" aria-label="Explorateur de fichiers">
      {nodes.map((n) => (
        <Node
          key={n.path}
          node={n}
          depth={0}
          activePath={activePath}
          onOpenFile={onOpenFile}
        />
      ))}
    </div>
  );
}
