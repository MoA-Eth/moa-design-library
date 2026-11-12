import { useEffect, useState } from 'react';

export function useShikiHtml(code: string, language: string): string {
  const [highlightedCodeHtml, setHighlightedCodeHtml] = useState('');

  useEffect(() => {
    let isCancelled = false;

    async function highlightCode(): Promise<void> {
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        });

        if (!isCancelled) {
          setHighlightedCodeHtml(html);
        }
      } catch {
        if (!isCancelled) {
          setHighlightedCodeHtml('');
        }
      }
    }

    void highlightCode();

    return () => {
      isCancelled = true;
    };
  }, [code, language]);

  return highlightedCodeHtml;
}
