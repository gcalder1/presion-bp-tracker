import type { BPReading } from '../types';

// Deterministic pseudo-random generator so the "realistic" dataset is stable
// across re-renders instead of reshuffling every time React re-runs this module.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(19700101);

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

/**
 * Generates ~60 days of realistic, gently-trending blood pressure readings.
 * One or two readings per day (morning always, occasional evening reading),
 * with a slow underlying drift plus daily noise so charts show real movement.
 */
export function generateMockReadings(days = 60): BPReading[] {
  const readings: BPReading[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Slow oscillating baseline so the last ~2 weeks trend visibly up or down.
  let sysBaseline = 122;
  let diaBaseline = 78;
  let pulseBaseline = 70;

  for (let dayOffset = days - 1; dayOffset >= 0; dayOffset--) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    // Gentle drift, mean-reverting toward a healthy-ish baseline.
    sysBaseline += (rand() - 0.5) * 2.4 + (122 - sysBaseline) * 0.03;
    diaBaseline += (rand() - 0.5) * 1.6 + (78 - diaBaseline) * 0.03;
    pulseBaseline += (rand() - 0.5) * 1.8 + (70 - pulseBaseline) * 0.04;

    // A mild "recent two weeks trending up" bump for the insight card to describe.
    const recentBump = dayOffset < 14 ? 3.5 * (1 - dayOffset / 14) : 0;

    const morningSys = clamp(Math.round(sysBaseline + recentBump + (rand() - 0.5) * 10), 108, 152);
    const morningDia = clamp(Math.round(diaBaseline + recentBump * 0.5 + (rand() - 0.5) * 7), 64, 96);
    const morningPulse = clamp(Math.round(pulseBaseline + (rand() - 0.5) * 9), 54, 96);

    const morningHour = 7 + Math.floor(rand() * 2);
    const morningMinute = Math.floor(rand() * 60);

    readings.push({
      id: `${dateStr}-am`,
      date: dateStr,
      time: `${pad(morningHour)}:${pad(morningMinute)}`,
      systolic: morningSys,
      diastolic: morningDia,
      pulse: morningPulse,
    });

    // ~55% chance of a second, evening reading that day for natural variation.
    if (rand() < 0.55) {
      const eveningSys = clamp(Math.round(sysBaseline + recentBump + (rand() - 0.5) * 11), 108, 152);
      const eveningDia = clamp(Math.round(diaBaseline + recentBump * 0.5 + (rand() - 0.5) * 8), 64, 96);
      const eveningPulse = clamp(Math.round(pulseBaseline + (rand() - 0.5) * 10), 54, 96);
      const eveningHour = 18 + Math.floor(rand() * 3);
      const eveningMinute = Math.floor(rand() * 60);

      readings.push({
        id: `${dateStr}-pm`,
        date: dateStr,
        time: `${pad(eveningHour)}:${pad(eveningMinute)}`,
        systolic: eveningSys,
        diastolic: eveningDia,
        pulse: eveningPulse,
      });
    }
  }

  return readings;
}

export const mockReadings: BPReading[] = generateMockReadings(60);
