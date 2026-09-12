import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Translations } from '../i18n/translations';
import type { BPReading } from '../types';
import { getReadingDistribution } from '../utils/bpCalculations';

interface Props {
  t: Translations;
  readings: BPReading[];
}

const COLORS = {
  lower: 'var(--color-accent-blue)',
  typical: 'var(--color-brand-500)',
  higher: 'var(--color-accent-amber)',
};

export default function BPDistribution({ t, readings }: Props) {
  const dist = getReadingDistribution(readings);
  const total = dist.lower + dist.typical + dist.higher;

  const data = [
    { key: 'lower', label: t.dashboard.distributionLower, value: dist.lower, color: COLORS.lower },
    { key: 'typical', label: t.dashboard.distributionTypical, value: dist.typical, color: COLORS.typical },
    { key: 'higher', label: t.dashboard.distributionHigher, value: dist.higher, color: COLORS.higher },
  ];

  return (
    <div className="rounded-2xl border border-ink-100 bg-surface p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-bold text-ink-900">{t.dashboard.distributionTitle}</h3>
      <p className="text-sm text-ink-500">{t.dashboard.distributionSub}</p>

      <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-48 w-48 shrink-0">
          {total === 0 ? (
            <div className="flex h-full items-center justify-center text-ink-400">—</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="label" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  contentStyle={{ borderRadius: 12, borderColor: 'var(--color-ink-100)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <ul className="w-full space-y-3">
          {data.map((entry) => {
            const pct = total > 0 ? Math.round((entry.value / total) * 100) : 0;
            return (
              <li key={entry.key} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-medium text-ink-700">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} aria-hidden="true" />
                  {entry.label}
                </span>
                <span className="font-bold text-ink-900">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
