import { useMemo, useState, type JSX } from 'react';
import { ChevronDown, ChevronRight, FileCode, FileText, Folder, FolderOpen } from 'lucide-react';

export type FileTreeNode = Readonly<{
  path: string;
}>;

export type FileTreeProps = Readonly<{
  files: readonly FileTreeNode[];
  activePath: string;
  onSelect: (path: string) => void;
  rootLabel?: string;
}>;

type InternalFolderNode = {
  readonly kind: 'folder';
  readonly name: string;
  readonly path: string;
  readonly children: InternalNode[];
};

type InternalFileNode = {
  readonly kind: 'file';
  readonly name: string;
  readonly path: string;
};

type InternalNode = InternalFolderNode | InternalFileNode;

const CODE_EXTENSIONS = new Set(['tsx', 'ts', 'jsx', 'js']);

function getFileExtension(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
}

function buildTree(files: readonly FileTreeNode[]): InternalNode[] {
  const root: InternalFolderNode = { kind: 'folder', name: '', path: '', children: [] };

  for (const file of files) {
    const segments = file.path.split('/').filter(Boolean);
    let cursor = root;

    segments.forEach((segment, idx) => {
      const isLast = idx === segments.length - 1;
      if (isLast) {
        cursor.children.push({ kind: 'file', name: segment, path: file.path });
        return;
      }

      const folderPath = segments.slice(0, idx + 1).join('/');
      let existing = cursor.children.find((child): child is InternalFolderNode => child.kind === 'folder' && child.path === folderPath);
      if (!existing) {
        existing = { kind: 'folder', name: segment, path: folderPath, children: [] };
        cursor.children.push(existing);
      }
      cursor = existing;
    });
  }

  return root.children;
}

export function FileTree({ files, activePath, onSelect, rootLabel }: FileTreeProps): JSX.Element {
  const nodes = useMemo(() => buildTree(files), [files]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderPath: string) => {
    setCollapsed((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  const renderNodes = (items: InternalNode[]): JSX.Element[] =>
    items.map((node) => {
      if (node.kind === 'folder') {
        const isCollapsed = Boolean(collapsed[node.path]);
        return (
          <li key={node.path}>
            <div
              role="button"
              tabIndex={0}
              className="multi-file-code__tree-node multi-file-code__tree-node--folder"
              onClick={() => toggleFolder(node.path)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleFolder(node.path);
                }
              }}
            >
              {isCollapsed ? (
                <ChevronRight className="multi-file-code__tree-chevron" />
              ) : (
                <ChevronDown className="multi-file-code__tree-chevron" />
              )}
              {isCollapsed ? (
                <Folder className="multi-file-code__tree-icon" size={14} />
              ) : (
                <FolderOpen className="multi-file-code__tree-icon" size={14} />
              )}
              <span className="multi-file-code__tree-label">{node.name}</span>
            </div>
            {!isCollapsed ? <ul className="multi-file-code__tree-children">{renderNodes(node.children)}</ul> : null}
          </li>
        );
      }

      const ext = getFileExtension(node.name);
      const isCode = CODE_EXTENSIONS.has(ext);
      const isActive = node.path === activePath;

      return (
        <li key={node.path}>
          <div
            role="button"
            tabIndex={0}
            className={`multi-file-code__tree-node${isActive ? ' multi-file-code__tree-node--active' : ''}`}
            onClick={() => onSelect(node.path)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(node.path);
              }
            }}
          >
            <span className="multi-file-code__tree-chevron multi-file-code__tree-chevron--spacer" />
            {isCode ? (
              <FileCode className={`multi-file-code__tree-icon multi-file-code__tree-icon--${ext}`} size={14} />
            ) : (
              <FileText className={`multi-file-code__tree-icon multi-file-code__tree-icon--${ext}`} size={14} />
            )}
            <span className="multi-file-code__tree-label">{node.name}</span>
          </div>
        </li>
      );
    });

  return (
    <div className="multi-file-code__tree">
      {rootLabel ? <div className="multi-file-code__tree-header">{rootLabel}</div> : null}
      <ul className="multi-file-code__tree-root">{renderNodes(nodes)}</ul>
    </div>
  );
}
