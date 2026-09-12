import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { translations } from './i18n/translations';
import { mockReadings } from './data/mockReadings';
import type { AppView, Language, UserProfile } from './types';

const emptyProfile: UserProfile = {
  age: '',
  sex: '',
  heightCm: '',
  weightKg: '',
  medications: '',
  goal: '',
};

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<AppView>('landing');
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [theme, toggleTheme] = useTheme();

  const t = translations[language];

  function goTo(next: AppView) {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToHowItWorks() {
    if (view !== 'landing') {
      setView('landing');
      window.requestAnimationFrame(() => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleProfileSubmit(nextProfile: UserProfile) {
    setProfile(nextProfile);
    goTo('dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-700 focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar
        t={t}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        view={view}
        onNavigate={goTo}
        onScrollToHowItWorks={scrollToHowItWorks}
      />

      <main id="main-content" className="flex-1">
        {view === 'landing' && (
          <>
            <Hero t={t} onGetStarted={() => goTo('profile')} onSeeHowItWorks={scrollToHowItWorks} />
            <ProblemSection t={t} />
            <SolutionSection t={t} />
          </>
        )}

        {view === 'profile' && (
          <ProfileForm t={t} initialProfile={profile} onSubmit={handleProfileSubmit} onBack={() => goTo('landing')} />
        )}

        {view === 'dashboard' && (
          <Dashboard t={t} language={language} profile={profile} allReadings={mockReadings} onEditProfile={() => goTo('profile')} />
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}
