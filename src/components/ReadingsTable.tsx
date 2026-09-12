import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { Translations } from '../i18n/translations';
import type { BPReading, Language } from '../types';
import { formatReadingDate, formatReadingTime, getRecentReadings, sortByDateDesc } from '../utils/bpCalculations';

interface Props {
  t: Translations;
  language: Language;
  readings: BPReading[];
}

function Row({ reading, t, language }: { reading: BPReading; t: Translations; language: Language }) {
  return (
    <tr className="border-b border-ink-100 last:border-0">
      <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-800">{formatReadingDate(reading.date, language)}</td>
      <td className="whitespace-nowrap px-4 py-3 text-ink-600">{formatReadingTime(reading.time, language)}</td>
      <td className="px-4 py-3 font-semibold text-ink-900">{reading.systolic}</td>
      <td className="px-4 py-3 font-semibold text-ink-900">{reading.diastolic}</td>
      <td className="px-4 py-3 text-ink-700">
        {reading.pulse} <span className="text-xs text-ink-400">{t.dashboard.bpm}</span>
      </td>
    </tr>
  );
}

export default function ReadingsTable({ t, language, readings }: Props) {
  const [showAll, setShowAll] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const recent = getRecentReadings(readings, 9);
  const all = sortByDateDesc(readings);

  useEffect(() => {
    if (showAll) closeButtonRef.current?.focus();
  }, [showAll]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowAll(false);
    }
    if (showAll) {
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
  }, [showAll]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-ink-900">{t.dashboard.tableTitle}</h3>
          <p className="text-sm text-ink-500">{t.dashboard.tableSub}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="rounded-full border-2 border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:border-brand-400"
        >
          {t.dashboard.viewAll}
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink-100 text-xs font-bold uppercase tracking-wide text-ink-400">
              <th scope="col" className="px-4 py-2">
                {t.dashboard.date}
              </th>
              <th scope="col" className="px-4 py-2">
                {t.dashboard.time}
              </th>
              <th scope="col" className="px-4 py-2">
                {t.dashboard.systolic}
              </th>
              <th scope="col" className="px-4 py-2">
                {t.dashboard.diastolic}
              </th>
              <th scope="col" className="px-4 py-2">
                {t.dashboard.pulse}
              </th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <Row key={r.id} reading={r} t={t} language={language} />
            ))}
          </tbody>
        </table>
      </div>

      {showAll && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-readings-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4"
          onClick={() => setShowAll(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
              <h4 id="all-readings-title" className="text-lg font-bold text-ink-900">
                {t.dashboard.allReadingsTitle}
              </h4>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setShowAll(false)}
                aria-label={t.dashboard.closeModal}
                className="rounded-full p-2 text-ink-500 hover:bg-ink-100"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto px-2 pb-4">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="sticky top-0 bg-surface">
                  <tr className="border-b-2 border-ink-100 text-xs font-bold uppercase tracking-wide text-ink-400">
                    <th scope="col" className="px-4 py-2">
                      {t.dashboard.date}
                    </th>
                    <th scope="col" className="px-4 py-2">
                      {t.dashboard.time}
                    </th>
                    <th scope="col" className="px-4 py-2">
                      {t.dashboard.systolic}
                    </th>
                    <th scope="col" className="px-4 py-2">
                      {t.dashboard.diastolic}
                    </th>
                    <th scope="col" className="px-4 py-2">
                      {t.dashboard.pulse}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {all.map((r) => (
                    <Row key={r.id} reading={r} t={t} language={language} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
