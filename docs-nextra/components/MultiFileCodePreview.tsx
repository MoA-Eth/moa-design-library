import { useMemo, useState, type JSX } from 'react';
import { FileTree, type FileTreeNode } from './FileTree';

export type MultiFileCodePreviewFile = Readonly<{
  path: string;
  content: string;
  language?: 'tsx' | 'ts' | 'css' | 'json' | 'jsx' | 'js' | 'md';
  html?: string;
}>;

type MultiFileCodePreviewProps = Readonly<{
  files: readonly MultiFileCodePreviewFile[];
  defaultPath?: string;
  rootLabel?: string;
}>;

type CopyState = 'idle' | 'done' | 'error';

function getCopyLabel(copyState: CopyState): string {
  if (copyState === 'done') return 'Copied';
  if (copyState === 'error') return 'Failed';
  return 'Copy';
}

export function MultiFileCodePreview({ files, defaultPath, rootLabel }: MultiFileCodePreviewProps): JSX.Element {
  const fileTreeNodes = useMemo<readonly FileTreeNode[]>(() => files.map((file) => ({ path: file.path })), [files]);

  const initialPath = useMemo<string>(() => {
    if (files.length === 0) return '';
    if (defaultPath) {
      const match = files.find((file) => file.path === defaultPath);
      if (match) return match.path;
    }
    return files[0]?.path ?? '';
  }, [files, defaultPath]);

  const [activePath, setActivePath] = useState<string>(initialPath);

  const clampedActivePath = useMemo<string>(() => {
    if (files.some((file) => file.path === activePath)) return activePath;
    return initialPath;
  }, [files, activePath, initialPath]);

  const activeFile = useMemo<MultiFileCodePreviewFile | undefined>(
    () => files.find((file) => file.path === clampedActivePath),
    [files, clampedActivePath],
  );

  const activeContent = activeFile?.content ?? '';
  const highlightedCodeHtml = activeFile?.html ?? '';
  const [copyState, setCopyState] = useState<CopyState>('idle');

  async function copyActiveFile(): Promise<void> {
    if (!activeFile) return;

    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopyState('done');
    } catch {
      setCopyState('error');
    }

    setTimeout(() => {
      setCopyState('idle');
    }, 1500);
  }

  return (
    <div className="multi-file-code">
      <FileTree files={fileTreeNodes} activePath={clampedActivePath} onSelect={setActivePath} rootLabel={rootLabel} />

      <div className="multi-file-code__pane">
        <div className="multi-file-code__path">
          <span className="multi-file-code__path-text">{clampedActivePath}</span>
          <button
            type="button"
            className="multi-file-code__copy"
            onClick={() => void copyActiveFile()}
            disabled={!activeFile}
            aria-label="Copy current file"
          >
            {getCopyLabel(copyState)}
          </button>
        </div>

        <div className="multi-file-code__scroll">
          {highlightedCodeHtml ? (
            <div className="component-example-tabs__shiki" dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }} />
          ) : (
            <pre className="component-doc-code-block">
              <code>{activeContent}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
