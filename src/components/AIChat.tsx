import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Bot, Send } from 'lucide-react';
import type { Translations } from '../i18n/translations';
import type { BPReading, Language, PeriodFilter, UserProfile } from '../types';
import { matchIntent, getResponseByIntentId } from '../utils/chatResponses';
import ChatMessage from './ChatMessage';

interface Props {
  t: Translations;
  language: Language;
  allReadings: BPReading[];
  period: PeriodFilter;
  profile: UserProfile;
}

type LogEntry =
  | { id: string; role: 'assistant'; kind: 'greeting' }
  | { id: string; role: 'assistant'; kind: 'fallback' }
  | { id: string; role: 'assistant'; kind: 'response'; intentId: string }
  | { id: string; role: 'user'; kind: 'suggestion'; suggestionIndex: number }
  | { id: string; role: 'user'; kind: 'freeform'; rawText: string };

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export default function AIChat({ t, language, allReadings, period, profile }: Props) {
  const [log, setLog] = useState<LogEntry[]>([{ id: nextId(), role: 'assistant', kind: 'greeting' }]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ctx = { allReadings, period, profile, language };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [log, typing]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  function renderText(entry: LogEntry): string {
    switch (entry.kind) {
      case 'greeting':
        return t.chat.greeting;
      case 'fallback':
        return t.chat.fallback;
      case 'response':
        return getResponseByIntentId(entry.intentId, ctx) ?? t.chat.fallback;
      case 'suggestion':
        return t.chat.suggestions[entry.suggestionIndex];
      case 'freeform':
        return entry.rawText;
      default:
        return '';
    }
  }

  function sendUserEntry(userEntry: LogEntry, questionText: string) {
    setLog((prev) => [...prev, userEntry]);
    setTyping(true);

    const intent = matchIntent(questionText, language);
    const delay = 700 + Math.random() * 500;

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      setLog((prev) => [
        ...prev,
        intent
          ? { id: nextId(), role: 'assistant', kind: 'response', intentId: intent.id }
          : { id: nextId(), role: 'assistant', kind: 'fallback' },
      ]);
    }, delay);
  }

  function handleSuggestionClick(index: number) {
    if (typing) return;
    sendUserEntry({ id: nextId(), role: 'user', kind: 'suggestion', suggestionIndex: index }, t.chat.suggestions[index]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || typing) return;
    sendUserEntry({ id: nextId(), role: 'user', kind: 'freeform', rawText: trimmed }, trimmed);
    setInputValue('');
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-100 bg-surface shadow-sm">
      <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-ink-900">{t.chat.title}</h3>
          <p className="truncate text-sm text-ink-500">{t.chat.subtitle}</p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-500 sm:inline">
          {t.chat.languageIndicator}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" style={{ minHeight: 320, maxHeight: 480 }}>
        {log.map((entry) => (
          <ChatMessage key={entry.id} message={{ id: entry.id, role: entry.role, text: renderText(entry) }} />
        ))}
        {typing && (
          <ChatMessage key="typing" message={{ id: 'typing', role: 'assistant', text: '', typing: true }} />
        )}
      </div>

      <div className="border-t border-ink-100 px-5 py-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {t.chat.suggestions.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestionClick(i)}
              disabled={typing}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor="chat-input" className="sr-only">
            {t.chat.inputPlaceholder}
          </label>
          <input
            id="chat-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.chat.inputPlaceholder}
            className="flex-1 rounded-full border-2 border-ink-200 px-4 py-3 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={typing || !inputValue.trim()}
            aria-label={t.chat.send}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
