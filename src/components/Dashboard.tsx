import { useMemo, useState } from 'react';
import { Pencil, ShieldAlert } from 'lucide-react';
import type { Translations } from '../i18n/translations';
import type { BPReading, Language, PeriodFilter, UserProfile } from '../types';
import { getReadingsForPeriod } from '../utils/bpCalculations';
import SummaryCards from './SummaryCards';
import PeriodFilterTabs from './PeriodFilterTabs';
import BPTrendChart from './BPTrendChart';
import PulseChart from './PulseChart';
import BPDistribution from './BPDistribution';
import ReadingsTable from './ReadingsTable';
import InsightCard from './InsightCard';
import AIChat from './AIChat';

interface Props {
  t: Translations;
  language: Language;
  profile: UserProfile;
  allReadings: BPReading[];
  onEditProfile: () => void;
}

function getGreetingKey(): 'greetingMorning' | 'greetingAfternoon' | 'greetingEvening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'greetingMorning';
  if (hour < 18) return 'greetingAfternoon';
  return 'greetingEvening';
}

export default function Dashboard({ t, language, profile, allReadings, onEditProfile }: Props) {
  const [period, setPeriod] = useState<PeriodFilter>(30);
  const periodReadings = useMemo(() => getReadingsForPeriod(allReadings, period), [allReadings, period]);
  const greetingKey = useMemo(getGreetingKey, []);

  return (
    <section id="dashboard" className="scroll-mt-16 bg-ink-50 py-10 sm:py-12">
      <div className="container-page">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            {t.dashboard.demoNotice}
          </span>
          <button
            type="button"
            onClick={onEditProfile}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink-200 bg-surface px-4 py-1.5 text-sm font-semibold text-ink-700 hover:border-brand-400 hover:text-brand-700"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            {t.dashboard.editProfile}
          </button>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">{t.dashboard[greetingKey]}</h1>
        <p className="mt-1 text-lg text-ink-600">{t.dashboard.subtitle}</p>
        {profile.age && <p className="mt-1 text-sm font-medium text-brand-700">{t.dashboard.profileSummary(profile.age)}</p>}

        <div className="mt-6">
          <SummaryCards t={t} periodReadings={periodReadings} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="min-w-0 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-ink-900">
                {language === 'es' ? 'Tus datos' : 'Your data'}
              </h2>
              <PeriodFilterTabs t={t} value={period} onChange={setPeriod} />
            </div>

            <InsightCard t={t} allReadings={allReadings} periodReadings={periodReadings} period={period} />
            <BPTrendChart t={t} language={language} readings={periodReadings} />

            <div className="grid gap-6 sm:grid-cols-2">
              <PulseChart t={t} language={language} readings={periodReadings} />
              <BPDistribution t={t} readings={periodReadings} />
            </div>

            <ReadingsTable t={t} language={language} readings={allReadings} />
          </div>

          <div className="lg:sticky lg:top-20">
            <div className="h-[600px] lg:h-[calc(100vh-6rem)]">
              <AIChat t={t} language={language} allReadings={allReadings} period={period} profile={profile} />
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-ink-400">{t.dashboard.disclaimer}</p>
      </div>
    </section>
  );
}
