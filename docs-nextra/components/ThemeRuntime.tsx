import { useEffect } from 'react';
import { applyRuntimeThemeStylesheet, resolveStoredThemeId } from './siteTheme';

export function ThemeRuntime(): null {
  useEffect(() => {
    applyRuntimeThemeStylesheet(resolveStoredThemeId());
  }, []);

  return null;
}
