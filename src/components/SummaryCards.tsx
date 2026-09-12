import { Activity, ClipboardList, HeartPulse, TrendingUp } from 'lucide-react';
import type { Translations } from '../i18n/translations';
import type { BPReading } from '../types';
import {
  calculateAverageDiastolic,
  calculateAverageSystolic,
  getHighestReading,
  getLatestReading,
} from '../utils/bpCalculations';

interface Props {
  t: Translations;
  periodReadings: BPReading[];
}

interface CardDef {
  icon: typeof Activity;
  label: string;
  sub: string;
  value: string;
  accent: string;
}

export default function SummaryCards({ t, periodReadings }: Props) {
  const latest = getLatestReading(periodReadings);
  const highest = getHighestReading(periodReadings);
  const avgSys = calculateAverageSystolic(periodReadings);
  const avgDia = calculateAverageDiastolic(periodReadings);

  const cards: CardDef[] = [
    {
      icon: HeartPulse,
      label: t.dashboard.latestReading,
      sub: latest ? `${t.dashboard.latestReadingSub}: ${latest.pulse} ${t.dashboard.bpm}` : '—',
      value: latest ? `${latest.systolic}/${latest.diastolic}` : '—',
      accent: 'bg-brand-50 text-brand-700',
    },
    {
      icon: Activity,
      label: t.dashboard.averageBP,
      sub: t.dashboard.averageBPSub,
      value: periodReadings.length ? `${avgSys}/${avgDia}` : '—',
      accent: 'bg-sky-50 text-sky-700',
    },
    {
      icon: TrendingUp,
      label: t.dashboard.highestReading,
      sub: t.dashboard.highestReadingSub,
      value: highest ? `${highest.systolic}/${highest.diastolic}` : '—',
      accent: 'bg-amber-50 text-amber-700',
    },
    {
      icon: ClipboardList,
      label: t.dashboard.readingsRecorded,
      sub: t.dashboard.readingsRecordedSub,
      value: String(periodReadings.length),
      accent: 'bg-violet-50 text-violet-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-ink-100 bg-surface p-5 shadow-sm">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${card.accent}`}>
            <card.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-500">{card.label}</p>
          <p className="mt-0.5 text-2xl font-extrabold text-ink-900 sm:text-3xl">{card.value}</p>
          <p className="mt-0.5 text-xs font-medium text-ink-400">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
