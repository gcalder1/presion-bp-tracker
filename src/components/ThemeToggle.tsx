import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';
import type { Translations } from '../i18n/translations';

interface Props {
  t: Translations;
  theme: Theme;
  onToggle: () => void;
  compact?: boolean;
}

export default function ThemeToggle({ t, theme, onToggle, compact = false }: Props) {
  const isDark = theme === 'dark';
  const size = compact ? 'h-10 w-10' : 'h-12 w-12';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? t.nav.switchToLight : t.nav.switchToDark}
      title={isDark ? t.nav.switchToLight : t.nav.switchToDark}
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border-2 border-ink-200 bg-surface text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-700`}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
