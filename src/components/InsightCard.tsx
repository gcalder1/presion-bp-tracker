import { Lightbulb } from 'lucide-react';
import type { Translations } from '../i18n/translations';
import type { BPReading, PeriodFilter } from '../types';
import {
  calculateAverageDiastolic,
  calculateAverageSystolic,
  calculateTrend,
  getPreviousPeriod,
} from '../utils/bpCalculations';

interface Props {
  t: Translations;
  allReadings: BPReading[];
  periodReadings: BPReading[];
  period: PeriodFilter;
}

export default function InsightCard({ t, allReadings, periodReadings, period }: Props) {
  const avgSys = calculateAverageSystolic(periodReadings);
  const avgDia = calculateAverageDiastolic(periodReadings);
  const previous = getPreviousPeriod(allReadings, period);
  const trend = calculateTrend(periodReadings, previous);

  let changeText = t.dashboard.insightChangeFlat;
  if (trend.direction === 'up') changeText = t.dashboard.insightChangeUp(Math.abs(trend.systolicDelta));
  if (trend.direction === 'down') changeText = t.dashboard.insightChangeDown(Math.abs(trend.systolicDelta));

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-brand-600" aria-hidden="true" />
        <h3 className="text-lg font-bold text-ink-900">{t.dashboard.insightTitle}</h3>
      </div>
      <p className="mt-2 text-ink-700">
        {periodReadings.length > 0 ? t.dashboard.insightBody(`${avgSys}/${avgDia}`) : '—'}
      </p>

      <p className="mt-4 font-bold text-ink-900">{t.dashboard.insightWhatChanged}</p>
      <p className="mt-1 text-ink-700">{changeText}</p>
    </div>
  );
}
