import { ArrowDown, MessageSquareHeart, Radio, Sparkles } from 'lucide-react';
import type { Translations } from '../i18n/translations';

const icons = [Radio, Sparkles, MessageSquareHeart];

interface Props {
  t: Translations;
}

export default function SolutionSection({ t }: Props) {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-ink-50 py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-600">{t.solution.eyebrow}</span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">{t.solution.title}</h2>
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-4 sm:gap-0">
          {t.solution.steps.map((step, i) => {
            const Icon = icons[i % icons.length];
            const isLast = i === t.solution.steps.length - 1;
            return (
              <div key={step.number} className="flex flex-col items-center">
                <div className="flex w-full max-w-3xl items-center gap-5 rounded-2xl border border-ink-100 bg-surface p-6 shadow-sm sm:gap-8 sm:p-8">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-600 text-white">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-500">{step.number}</span>
                    <h3 className="mt-1 text-xl font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-1.5 text-ink-600">{step.desc}</p>
                  </div>
                </div>
                {!isLast && <ArrowDown className="my-2 h-6 w-6 text-brand-300" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
