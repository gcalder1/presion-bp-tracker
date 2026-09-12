import { AlertCircle, FileQuestion, PencilLine, Search, TrendingDown } from 'lucide-react';
import type { Translations } from '../i18n/translations';

const icons = [PencilLine, AlertCircle, FileQuestion, Search, TrendingDown];

interface Props {
  t: Translations;
}

export default function ProblemSection({ t }: Props) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-accent-amber">{t.problem.eyebrow}</span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">{t.problem.title}</h2>
          <p className="mt-4 text-lg text-ink-600">{t.problem.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {t.problem.points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={point.title} className="rounded-2xl border border-ink-100 bg-ink-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <Icon className="h-5 w-5 text-accent-amber" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold text-ink-900">{point.title}</h3>
                <p className="mt-1.5 text-sm text-ink-600">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
