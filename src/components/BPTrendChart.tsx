import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Translations } from '../i18n/translations';
import type { BPReading, Language } from '../types';
import { formatReadingDate, formatReadingTime, sortByDateAsc } from '../utils/bpCalculations';

interface Props {
  t: Translations;
  language: Language;
  readings: BPReading[];
}

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
  payload: BPReading & { dateLabel: string };
}

function CustomTooltip({
  active,
  payload,
  label,
  t,
  language,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  t: Translations;
  language: Language;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0]?.payload as (BPReading & { dateLabel: string }) | undefined;
  return (
    <div className="rounded-xl border border-ink-100 bg-surface p-3 text-sm shadow-lg">
      <p className="font-bold text-ink-900">{label}</p>
      {point && <p className="text-ink-500">{formatReadingTime(point.time, language)}</p>}
      {payload.map((entry) => (
        <p key={entry.dataKey} className="font-medium" style={{ color: entry.color }}>
          {entry.dataKey === 'systolic' ? t.dashboard.systolic : t.dashboard.diastolic}: {entry.value}
        </p>
      ))}
      {point && (
        <p className="text-ink-500">
          {t.dashboard.pulse}: {point.pulse} {t.dashboard.bpm}
        </p>
      )}
    </div>
  );
}

export default function BPTrendChart({ t, language, readings }: Props) {
  const sorted = sortByDateAsc(readings);
  const data = sorted.map((r) => ({
    ...r,
    dateLabel: formatReadingDate(r.date, language),
    timeLabel: formatReadingTime(r.time, language),
  }));

  return (
    <div className="rounded-2xl border border-ink-100 bg-surface p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-bold text-ink-900">{t.dashboard.trendChartTitle}</h3>
      <p className="text-sm text-ink-500">{t.dashboard.trendChartSub}</p>

      <div className="mt-4 h-64 w-full sm:h-80">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-ink-400">—</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink-100)" />
              <XAxis
                dataKey="dateLabel"
                tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                domain={[50, 160]}
                tick={{ fontSize: 12, fill: 'var(--color-ink-500)' }}
                label={{
                  value: t.dashboard.averageBP,
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: 'var(--color-ink-400)' },
                }}
              />
              <Tooltip content={<CustomTooltip t={t} language={language} />} />
              <Line
                type="monotone"
                dataKey="systolic"
                name={t.dashboard.systolic}
                stroke="var(--color-brand-600)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                name={t.dashboard.diastolic}
                stroke="var(--color-accent-blue)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-3 flex items-center gap-5 text-sm font-medium text-ink-600">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-600" aria-hidden="true" />
          {t.dashboard.systolic}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} aria-hidden="true" />
          {t.dashboard.diastolic}
        </span>
      </div>
    </div>
  );
}
