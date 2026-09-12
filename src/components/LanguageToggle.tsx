import type { Language } from '../types';

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
  compact?: boolean;
}

export default function LanguageToggle({ language, onChange, compact = false }: Props) {
  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex items-center rounded-full border-2 border-ink-200 bg-surface p-1 ${compact ? 'text-sm' : 'text-base'}`}
    >
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={language === 'en'}
        className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
          language === 'en' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:text-ink-900'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onChange('es')}
        aria-pressed={language === 'es'}
        className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
          language === 'es' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:text-ink-900'
        }`}
      >
        Español
      </button>
    </div>
  );
}
