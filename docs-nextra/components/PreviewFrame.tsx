import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type JSX,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { ExternalLink, Laptop, Monitor, Smartphone, Tablet, type LucideIcon } from 'lucide-react';
import { MODE_STORAGE_KEY, PREVIEW_MESSAGE_READY, PREVIEW_MESSAGE_SET_THEME, resolveStoredThemeId } from './siteTheme';

export type ViewportPreset = Readonly<{
  id: string;
  label: string;
  width: number | 'full';
  Icon: LucideIcon;
}>;

export const DEFAULT_VIEWPORT_PRESETS: readonly ViewportPreset[] = [
  { id: 'mobile', label: 'SM', width: 390, Icon: Smartphone },
  { id: 'tablet', label: 'MD', width: 768, Icon: Tablet },
  { id: 'laptop', label: 'LG', width: 1024, Icon: Laptop },
  { id: 'full', label: 'Full', width: 'full', Icon: Monitor },
];

type Width = number | 'full';

const MIN_WIDTH = 320;

function getSimFrameModifier(width: Width): string {
  if (width === 'full') return '';
  if (width <= 480) return ' component-example-tabs__sim-frame--mobile';
  if (width <= 900) return ' component-example-tabs__sim-frame--tablet';
  return ' component-example-tabs__sim-frame--laptop';
}

type PreviewFrameProps = Readonly<{
  id: string;
  previewSrc: string;
  iframeHeight?: string;
  initialWidth?: Width;
  presets?: readonly ViewportPreset[];
  titlePrefix?: string;
}>;

export function PreviewFrame({
  id,
  previewSrc,
  iframeHeight = 'min(82vh, 760px)',
  initialWidth = 'full',
  presets = DEFAULT_VIEWPORT_PRESETS,
  titlePrefix = 'Preview',
}: PreviewFrameProps): JSX.Element {
  const [width, setWidth] = useState<Width>(initialWidth);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeWrapperRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setContainerWidth(Math.floor(el.getBoundingClientRect().width));
    };

    update();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleReady = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: unknown; id?: unknown } | undefined;
      if (!data || data.type !== PREVIEW_MESSAGE_READY || data.id !== id) return;

      const storedMode = globalThis.localStorage !== undefined ? globalThis.localStorage.getItem(MODE_STORAGE_KEY) : null;
      const rootDark = document.documentElement.classList.contains('dark');
      const mode = storedMode === 'dark' || rootDark ? 'dark' : 'light';

      iframeRef.current?.contentWindow?.postMessage(
        {
          type: PREVIEW_MESSAGE_SET_THEME,
          themeId: resolveStoredThemeId(),
          mode,
        },
        window.location.origin,
      );
    };

    window.addEventListener('message', handleReady);
    return () => window.removeEventListener('message', handleReady);
  }, [id]);

  const handleResizePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const wrapper = iframeWrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    event.preventDefault();
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);

    const startX = event.clientX;
    const startWidth = wrapper.getBoundingClientRect().width;
    const maxWidth = container.getBoundingClientRect().width;

    setIsDragging(true);

    const handleMove = (moveEvent: PointerEvent) => {
      const next = Math.max(MIN_WIDTH, Math.min(maxWidth, startWidth + (moveEvent.clientX - startX)));
      setWidth(next);
    };

    const handleUp = () => {
      setIsDragging(false);

      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }

      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
  }, []);

  const resolvedNumericWidth = width === 'full' ? containerWidth || null : Math.round(width);

  const widthLabel = width === 'full' ? (resolvedNumericWidth ? `Full · ${resolvedNumericWidth}px` : 'Full') : `${Math.round(width)}px`;

  const wrapperStyle: CSSProperties = {
    width: width === 'full' ? '100%' : `${Math.min(width, containerWidth || width)}px`,
    maxWidth: '100%',
    transition: isDragging ? 'none' : 'width 0.18s ease',
  };

  const iframeStyle: CSSProperties = {
    width: '100%',
    height: iframeHeight,
    border: 0,
    background: 'var(--background)',
    display: 'block',
    pointerEvents: isDragging ? 'none' : undefined,
  };

  const simFrameClass = `component-example-tabs__sim-frame${getSimFrameModifier(width)}`;

  return (
    <div className="flow-preview-frame">
      <div className="flow-preview-frame__toolbar" role="toolbar" aria-label="Preview viewport">
        <div className="component-example-tabs__viewport-group" role="radiogroup" aria-label="Preview width">
          {presets.map((preset) => {
            const isActive =
              (preset.width === 'full' && width === 'full') ||
              (typeof preset.width === 'number' && typeof width === 'number' && Math.round(width) === preset.width);

            return (
              <button
                key={preset.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={preset.width === 'full' ? 'Full width preview' : `Preview at ${preset.width}px`}
                className={`component-example-tabs__viewport-toggle${isActive ? ' is-active' : ''}`}
                onClick={() => setWidth(preset.width)}
              >
                <preset.Icon aria-hidden size={12} />
                <span className="component-example-tabs__viewport-toggle-label">{preset.label}</span>
              </button>
            );
          })}
        </div>
        <span className="flow-preview-frame__width-badge" aria-live="polite">
          {widthLabel}
        </span>
        <a href={previewSrc} target="_blank" rel="noreferrer" className="flow-preview-frame__open-link">
          <ExternalLink aria-hidden size={12} />
          <span>Open</span>
        </a>
      </div>

      <div className="flow-preview-frame__breakout">
        <div ref={containerRef} className={`flow-preview-frame__stage${isDragging ? ' flow-preview-frame__stage--dragging' : ''}`}>
          <div ref={iframeWrapperRef} className={`flow-preview-frame__sizer ${simFrameClass}`} style={wrapperStyle}>
            <iframe
              ref={iframeRef}
              src={previewSrc}
              title={`${titlePrefix}: ${id}`}
              data-moa-preview="true"
              data-moa-preview-id={id}
              loading="lazy"
              style={iframeStyle}
              aria-labelledby={titleId}
            />
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Drag to resize preview"
              className="flow-preview-frame__resize-handle"
              onPointerDown={handleResizePointerDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
