import type { BPReading, PeriodFilter } from '../types';

function toTimestamp(r: BPReading): number {
  return new Date(`${r.date}T${r.time}:00`).getTime();
}

export function sortByDateAsc(readings: BPReading[]): BPReading[] {
  return [...readings].sort((a, b) => toTimestamp(a) - toTimestamp(b));
}

export function sortByDateDesc(readings: BPReading[]): BPReading[] {
  return [...readings].sort((a, b) => toTimestamp(b) - toTimestamp(a));
}

export function getReadingsForPeriod(readings: BPReading[], days: PeriodFilter): BPReading[] {
  const sorted = sortByDateAsc(readings);
  if (sorted.length === 0) return [];
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (days - 1));
  return sorted.filter((r) => new Date(`${r.date}T00:00:00`).getTime() >= cutoff.getTime());
}

/** The period of equal length immediately preceding the given period, for comparison. */
export function getPreviousPeriod(readings: BPReading[], days: PeriodFilter): BPReading[] {
  const sorted = sortByDateAsc(readings);
  if (sorted.length === 0) return [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));
  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - days);
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  return sorted.filter((r) => {
    const t = new Date(`${r.date}T00:00:00`).getTime();
    return t >= prevStart.getTime() && t <= prevEnd.getTime();
  });
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

export function calculateAverageSystolic(readings: BPReading[]): number {
  return Math.round(average(readings.map((r) => r.systolic)));
}

export function calculateAverageDiastolic(readings: BPReading[]): number {
  return Math.round(average(readings.map((r) => r.diastolic)));
}

export function calculateAveragePulse(readings: BPReading[]): number {
  return Math.round(average(readings.map((r) => r.pulse)));
}

export function getHighestReading(readings: BPReading[]): BPReading | null {
  if (readings.length === 0) return null;
  return readings.reduce((max, r) => (r.systolic > max.systolic ? r : max), readings[0]);
}

export function getLowestReading(readings: BPReading[]): BPReading | null {
  if (readings.length === 0) return null;
  return readings.reduce((min, r) => (r.systolic < min.systolic ? r : min), readings[0]);
}

export function getRecentReadings(readings: BPReading[], count = 10): BPReading[] {
  return sortByDateDesc(readings).slice(0, count);
}

export function getLatestReading(readings: BPReading[]): BPReading | null {
  const sorted = sortByDateDesc(readings);
  return sorted[0] ?? null;
}

export interface Trend {
  systolicDelta: number;
  diastolicDelta: number;
  direction: 'up' | 'down' | 'flat';
}

/** Compares the average of `current` against `previous` for a simple trend description. */
export function calculateTrend(current: BPReading[], previous: BPReading[]): Trend {
  const curSys = calculateAverageSystolic(current);
  const prevSys = calculateAverageSystolic(previous);
  const systolicDelta = curSys - prevSys;
  const diastolicDelta = calculateAverageDiastolic(current) - calculateAverageDiastolic(previous);

  let direction: Trend['direction'] = 'flat';
  if (previous.length > 0) {
    if (systolicDelta >= 2) direction = 'up';
    else if (systolicDelta <= -2) direction = 'down';
  }

  return { systolicDelta, diastolicDelta, direction };
}

export interface Distribution {
  lower: number;
  typical: number;
  higher: number;
}

/**
 * Buckets readings into simple, non-diagnostic ranges based on systolic pressure:
 * lower (<115), typical (115–129), higher (130+).
 */
export function getReadingDistribution(readings: BPReading[]): Distribution {
  const dist: Distribution = { lower: 0, typical: 0, higher: 0 };
  for (const r of readings) {
    if (r.systolic < 115) dist.lower += 1;
    else if (r.systolic < 130) dist.typical += 1;
    else dist.higher += 1;
  }
  return dist;
}

export function formatReadingDate(dateStr: string, locale: 'en' | 'es'): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatReadingTime(timeStr: string, locale: 'en' | 'es'): string {
  const [h, m] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString(locale === 'es' ? 'es-ES' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}
