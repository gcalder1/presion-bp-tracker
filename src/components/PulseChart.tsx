import { HeartPulse } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Translations } from '../i18n/translations';
import type { BPReading, Language } from '../types';
import { calculateAveragePulse, formatReadingDate, sortByDateAsc } from '../utils/bpCalculations';

interface Props {
  t: Translations;
  language: Language;
  readings: BPReading[];
}

export default function PulseChart({ t, language, readings }: Props) {
  const sorted = sortByDateAsc(readings);
  const data = sorted.map((r) => ({ ...r, dateLabel: formatReadingDate(r.date, language) }));
  const avgPulse = calculateAveragePulse(readings);

  return (
    <div className="rounded-2xl border border-ink-100 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink-900">{t.dashboard.pulseChartTitle}</h3>
          <p className="text-sm text-ink-500">{t.dashboard.pulseChartSub}</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-rose-700">
          <HeartPulse className="h-5 w-5" aria-hidden="true" />
          <div className="text-right">
            <p className="text-xs font-medium leading-none">{t.dashboard.averagePulse}</p>
            <p className="text-lg font-extrabold leading-tight">
              {readings.length ? avgPulse : '—'} {t.dashboard.bpm}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-48 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-ink-400">—</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink-100)" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} minTickGap={24} />
              <YAxis domain={[40, 110]} tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }} />
              <Tooltip
                formatter={(value) => [`${value} ${t.dashboard.bpm}`, t.dashboard.pulse]}
                labelStyle={{ fontWeight: 700, color: 'var(--color-ink-900)' }}
                contentStyle={{ borderRadius: 12, borderColor: 'var(--color-ink-100)' }}
              />
              <Area type="monotone" dataKey="pulse" stroke="#e11d48" strokeWidth={2.5} fill="url(#pulseGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
