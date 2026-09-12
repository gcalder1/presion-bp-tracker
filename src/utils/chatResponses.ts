import type { BPReading, Language, PeriodFilter, UserProfile } from '../types';
import {
  calculateAverageDiastolic,
  calculateAveragePulse,
  calculateAverageSystolic,
  calculateTrend,
  getHighestReading,
  getLowestReading,
  getPreviousPeriod,
  getReadingsForPeriod,
  formatReadingDate,
} from './bpCalculations';

interface ChatContext {
  allReadings: BPReading[];
  period: PeriodFilter;
  profile: UserProfile;
  language: Language;
}

interface Intent {
  id: string;
  keywords: { en: string[]; es: string[] };
  respond: (ctx: ChatContext) => string;
}

const intents: Intent[] = [
  {
    id: 'average',
    keywords: {
      en: ['average', 'avg', 'typical', 'usual', 'normal'],
      es: ['promedio', 'media', 'habitual', 'normal'],
    },
    respond: ({ allReadings, period, language }) => {
      const current = getReadingsForPeriod(allReadings, period);
      const sys = calculateAverageSystolic(current);
      const dia = calculateAverageDiastolic(current);
      const pulse = calculateAveragePulse(current);
      return language === 'es'
        ? `Mirando tus lecturas de los últimos ${period} días, tu presión arterial promedio es ${sys}/${dia}, con un pulso promedio de ${pulse} lpm.`
        : `Looking at your last ${period} days of readings, your average blood pressure is ${sys}/${dia}, with an average pulse of ${pulse} bpm.`;
    },
  },
  {
    id: 'changed',
    keywords: {
      en: ['change', 'changed', 'compare', 'comparison', 'trend', 'different', 'better', 'worse'],
      es: ['cambiado', 'cambio', 'comparar', 'comparación', 'tendencia', 'diferente', 'mejor', 'peor'],
    },
    respond: ({ allReadings, period, language }) => {
      const current = getReadingsForPeriod(allReadings, period);
      const previous = getPreviousPeriod(allReadings, period);
      const trend = calculateTrend(current, previous);

      if (previous.length === 0) {
        return language === 'es'
          ? 'Todavía no tengo suficientes datos del período anterior para comparar, pero seguiré revisando tus tendencias a medida que lleguen más lecturas.'
          : 'I don’t have enough data from the previous period to compare yet, but I’ll keep watching your trends as more readings come in.';
      }

      if (trend.direction === 'up') {
        return language === 'es'
          ? `Tu lectura sistólica promedio fue de ${Math.abs(trend.systolicDelta)} puntos más alta en comparación con el período anterior. La diferencia es pequeña, pero puedo ayudarte a explorar la tendencia.`
          : `Your average systolic reading was about ${Math.abs(trend.systolicDelta)} points higher compared with the previous period. The difference is small, but I can help you explore the trend.`;
      }
      if (trend.direction === 'down') {
        return language === 'es'
          ? `Tu lectura sistólica promedio fue de ${Math.abs(trend.systolicDelta)} puntos más baja en comparación con el período anterior — una tendencia positiva.`
          : `Your average systolic reading was about ${Math.abs(trend.systolicDelta)} points lower compared with the previous period — a positive trend.`;
      }
      return language === 'es'
        ? 'Tu presión arterial se ha mantenido bastante estable en comparación con el período anterior. No hay cambios importantes que reportar.'
        : 'Your blood pressure has stayed fairly steady compared with the previous period. No major changes to report.';
    },
  },
  {
    id: 'highest',
    keywords: {
      en: ['highest', 'high', 'max', 'maximum', 'peak', 'worst'],
      es: ['más alta', 'mas alta', 'alto', 'máximo', 'maximo', 'pico'],
    },
    respond: ({ allReadings, period, language }) => {
      const current = getReadingsForPeriod(allReadings, period);
      const highest = getHighestReading(current);
      if (!highest) {
        return language === 'es'
          ? 'No encuentro lecturas en este período para revisar.'
          : 'I couldn’t find any readings in this period to check.';
      }
      const dateStr = formatReadingDate(highest.date, language);
      return language === 'es'
        ? `Tu lectura más alta en este período fue ${highest.systolic}/${highest.diastolic}, registrada el ${dateStr}.`
        : `Your highest reading in this period was ${highest.systolic}/${highest.diastolic}, recorded on ${dateStr}.`;
    },
  },
  {
    id: 'lowest',
    keywords: {
      en: ['lowest', 'low', 'min', 'minimum', 'best'],
      es: ['más baja', 'mas baja', 'bajo', 'mínimo', 'minimo'],
    },
    respond: ({ allReadings, period, language }) => {
      const current = getReadingsForPeriod(allReadings, period);
      const lowest = getLowestReading(current);
      if (!lowest) {
        return language === 'es'
          ? 'No encuentro lecturas en este período para revisar.'
          : 'I couldn’t find any readings in this period to check.';
      }
      const dateStr = formatReadingDate(lowest.date, language);
      return language === 'es'
        ? `Tu lectura más baja en este período fue ${lowest.systolic}/${lowest.diastolic}, registrada el ${dateStr}.`
        : `Your lowest reading in this period was ${lowest.systolic}/${lowest.diastolic}, recorded on ${dateStr}.`;
    },
  },
  {
    id: 'pulse',
    keywords: {
      en: ['pulse', 'heart rate', 'bpm', 'heartbeat'],
      es: ['pulso', 'ritmo cardíaco', 'ritmo cardiaco', 'lpm', 'latidos'],
    },
    respond: ({ allReadings, period, language }) => {
      const current = getReadingsForPeriod(allReadings, period);
      const pulse = calculateAveragePulse(current);
      return language === 'es'
        ? `Tu pulso promedio en los últimos ${period} días es de ${pulse} latidos por minuto, dentro de un rango típico para la mayoría de los adultos en reposo.`
        : `Your average pulse over the last ${period} days is ${pulse} beats per minute, within a typical range for most adults at rest.`;
    },
  },
  {
    id: 'greeting',
    keywords: {
      en: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon'],
      es: ['hola', 'buenos días', 'buenas tardes', 'buenas'],
    },
    respond: ({ language }) =>
      language === 'es'
        ? '¡Hola! Estoy aquí para ayudarte a entender tus datos de presión arterial. Pregúntame sobre tu promedio, tu lectura más alta, o cómo ha cambiado tu presión.'
        : 'Hi there! I’m here to help you understand your blood pressure data. Ask me about your average, your highest reading, or how your BP has changed.',
  },
  {
    id: 'thanks',
    keywords: {
      en: ['thank', 'thanks', 'appreciate'],
      es: ['gracias', 'agradezco'],
    },
    respond: ({ language }) =>
      language === 'es'
        ? '¡De nada! Estoy aquí si tienes más preguntas sobre tu presión arterial.'
        : 'You’re welcome! I’m here if you have more questions about your blood pressure.',
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, ''); // strip accents for looser matching
}

export function matchIntent(userText: string, language: Language): Intent | null {
  const normalized = normalize(userText);
  for (const intent of intents) {
    const keywords = language === 'es' ? intent.keywords.es : intent.keywords.en;
    // Also check the other language's keywords in case the user types in the "wrong" one.
    const otherKeywords = language === 'es' ? intent.keywords.en : intent.keywords.es;
    const all = [...keywords, ...otherKeywords];
    if (all.some((kw) => normalized.includes(normalize(kw)))) {
      return intent;
    }
  }
  return null;
}

export function getChatResponse(userText: string, ctx: ChatContext): string {
  const intent = matchIntent(userText, ctx.language);
  if (intent) return intent.respond(ctx);
  return ctx.language === 'es'
    ? 'Todavía estoy aprendiendo a responder esa pregunta en esta demostración. En el producto completo, podría analizar tus datos de presión arterial y responder más preguntas.'
    : 'I’m still learning how to answer that in this demo. In the full product, I’d be able to explore your blood pressure data and answer more questions.';
}

/**
 * Recomputes a previously-matched intent's response text in the current language —
 * used so scripted assistant replies re-localize when the language toggle flips,
 * without needing to "translate" already-generated text.
 */
export function getResponseByIntentId(intentId: string, ctx: ChatContext): string | null {
  const intent = intents.find((i) => i.id === intentId);
  if (!intent) return null;
  return intent.respond(ctx);
}
