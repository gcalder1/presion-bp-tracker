import type { Translations } from '../i18n/translations';
import type { PeriodFilter } from '../types';

interface Props {
  t: Translations;
  value: PeriodFilter;
  onChange: (value: PeriodFilter) => void;
}

const options: { value: PeriodFilter; labelKey: 'filter7' | 'filter30' | 'filter60' }[] = [
  { value: 7, labelKey: 'filter7' },
  { value: 30, labelKey: 'filter30' },
  { value: 60, labelKey: 'filter60' },
];

export default function PeriodFilterTabs({ t, value, onChange }: Props) {
  return (
    <div role="group" aria-label="Date range" className="inline-flex rounded-full border-2 border-ink-200 bg-ink-50 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            value === opt.value ? 'bg-surface text-brand-700 shadow-sm' : 'text-ink-500 hover:text-ink-800'
          }`}
        >
          {t.dashboard[opt.labelKey]}
        </button>
      ))}
    </div>
  );
}
