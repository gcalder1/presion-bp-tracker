import { Activity } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface Props {
  t: Translations;
}

export default function Footer({ t }: Props) {
  return (
    <footer id="about" className="scroll-mt-16 border-t border-ink-100 bg-surface py-10">
      <div className="container-page">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-lg font-extrabold text-ink-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Activity className="h-4 w-4" aria-hidden="true" />
            </span>
            {t.nav.productName}
          </div>
          <p className="max-w-xl text-sm text-ink-500">{t.footer.about}</p>
        </div>
        <p className="mt-6 text-xs text-ink-400">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
