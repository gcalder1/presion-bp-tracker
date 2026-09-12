import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Theme } from '../hooks/useTheme';
import type { AppView, Language } from '../types';
import type { Translations } from '../i18n/translations';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface Props {
  t: Translations;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  view: AppView;
  onNavigate: (view: AppView) => void;
  onScrollToHowItWorks: () => void;
}

export default function Navbar({
  t,
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  view,
  onNavigate,
  onScrollToHowItWorks,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-surface/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-lg font-extrabold text-ink-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          {t.nav.productName}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <button type="button" onClick={onScrollToHowItWorks} className="font-medium text-ink-700 hover:text-brand-700">
            {t.nav.howItWorks}
          </button>
          {view !== 'landing' && (
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="font-medium text-ink-700 hover:text-brand-700"
            >
              {t.nav.dashboard}
            </button>
          )}
          <a href="#about" className="font-medium text-ink-700 hover:text-brand-700">
            {t.nav.about}
          </a>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeToggle t={t} theme={theme} onToggle={onToggleTheme} compact />
          <LanguageToggle language={language} onChange={onLanguageChange} compact />
          {view === 'landing' && (
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              {t.nav.getStarted}
            </button>
          )}
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-ink-100 bg-surface px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                onScrollToHowItWorks();
                setMobileOpen(false);
              }}
              className="text-left font-medium text-ink-700"
            >
              {t.nav.howItWorks}
            </button>
            {view !== 'landing' && (
              <button
                type="button"
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileOpen(false);
                }}
                className="text-left font-medium text-ink-700"
              >
                {t.nav.dashboard}
              </button>
            )}
            <div className="flex items-center gap-3">
              <ThemeToggle t={t} theme={theme} onToggle={onToggleTheme} />
              <LanguageToggle language={language} onChange={onLanguageChange} />
            </div>
            {view === 'landing' && (
              <button
                type="button"
                onClick={() => {
                  onNavigate('profile');
                  setMobileOpen(false);
                }}
                className="rounded-full bg-brand-600 px-5 py-3 text-center font-semibold text-white"
              >
                {t.nav.getStarted}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
