import { Bluetooth, HeartPulse, MessageCircle, Sparkles } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface Props {
  t: Translations;
  onGetStarted: () => void;
  onSeeHowItWorks: () => void;
}

export default function Hero({ t, onGetStarted, onSeeHowItWorks }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-ink-50 py-16 sm:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            AI-powered · Bilingual · Senior-friendly
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
            {t.hero.titleLine1}
            <br />
            <span className="text-brand-600">{t.hero.titleLine2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl text-ink-700">{t.hero.subtitle}</p>
          <p className="mt-3 max-w-xl text-lg text-ink-500">{t.hero.supporting}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onGetStarted}
              className="rounded-full bg-brand-600 px-8 py-4 text-lg font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-brand-700"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              type="button"
              onClick={onSeeHowItWorks}
              className="rounded-full border-2 border-ink-200 bg-surface px-8 py-4 text-lg font-bold text-ink-800 transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-ink-100 bg-surface p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Bluetooth className="h-4 w-4" aria-hidden="true" />
                {t.hero.mockupBadge}
              </div>
              <HeartPulse className="h-5 w-5 text-brand-400" aria-hidden="true" />
            </div>

            <p className="mt-4 text-sm font-medium text-ink-500">{t.hero.mockupLatest}</p>
            <p className="text-4xl font-extrabold text-ink-900">
              128<span className="text-ink-300">/</span>78
            </p>
            <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
              {[40, 55, 48, 62, 50, 70, 58, 65, 52, 60].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-brand-200" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-8 -right-4 w-64 rounded-2xl border border-ink-100 bg-surface p-4 shadow-lg sm:-right-10">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-ink-500">
              <MessageCircle className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
              AI Assistant
            </div>
            <p className="text-sm text-ink-600">{t.hero.mockupChatPreview}</p>
            <div className="mt-2 rounded-lg bg-brand-50 p-2 text-sm font-medium text-brand-800">
              {t.hero.mockupChatReply}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
