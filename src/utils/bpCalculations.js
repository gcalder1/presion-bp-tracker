function toTimestamp(r) {
  return new Date(`${r.date}T${r.time}:00`).getTime();
}

export function sortByDateAsc(readings) {
  return [...readings].sort((a, b) => toTimestamp(a) - toTimestamp(b));
}

export function sortByDateDesc(readings) {
  return [...readings].sort((a, b) => toTimestamp(b) - toTimestamp(a));
}

export function getReadingsForPeriod(readings, days) {
  const sorted = sortByDateAsc(readings);
  if (sorted.length === 0) return [];
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (days - 1));
  return sorted.filter((r) => new Date(`${r.date}T00:00:00`).getTime() >= cutoff.getTime());
}

/** The period of equal length immediately preceding the given period, for comparison. */
export function getPreviousPeriod(readings, days) {
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

function average(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

export function calculateAverageSystolic(readings) {
  return Math.round(average(readings.map((r) => r.systolic)));
}

export function calculateAverageDiastolic(readings) {
  return Math.round(average(readings.map((r) => r.diastolic)));
}

export function calculateAveragePulse(readings) {
  return Math.round(average(readings.map((r) => r.pulse)));
}

export function getHighestReading(readings) {
  if (readings.length === 0) return null;
  return readings.reduce((max, r) => (r.systolic > max.systolic ? r : max), readings[0]);
}

export function getLowestReading(readings) {
  if (readings.length === 0) return null;
  return readings.reduce((min, r) => (r.systolic < min.systolic ? r : min), readings[0]);
}

export function getRecentReadings(readings, count = 10) {
  return sortByDateDesc(readings).slice(0, count);
}

export function getLatestReading(readings) {
  const sorted = sortByDateDesc(readings);
  return sorted[0] ?? null;
}

/** Compares the average of `current` against `previous` for a simple trend description. */
export function calculateTrend(current, previous) {
  const curSys = calculateAverageSystolic(current);
  const prevSys = calculateAverageSystolic(previous);
  const systolicDelta = curSys - prevSys;
  const diastolicDelta = calculateAverageDiastolic(current) - calculateAverageDiastolic(previous);

  let direction = 'flat';
  if (previous.length > 0) {
    if (systolicDelta >= 2) direction = 'up';
    else if (systolicDelta <= -2) direction = 'down';
  }

  return { systolicDelta, diastolicDelta, direction };
}

/**
 * Buckets readings into simple, non-diagnostic ranges based on systolic pressure:
 * lower (<115), typical (115–129), higher (130+).
 */
export function getReadingDistribution(readings) {
  const dist = { lower: 0, typical: 0, higher: 0 };
  for (const r of readings) {
    if (r.systolic < 115) dist.lower += 1;
    else if (r.systolic < 130) dist.typical += 1;
    else dist.higher += 1;
  }
  return dist;
}

export function formatReadingDate(dateStr, locale) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatReadingTime(timeStr, locale) {
  const [h, m] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString(locale === 'es' ? 'es-ES' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}
