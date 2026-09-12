import { useState, type FormEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import type { Translations } from '../i18n/translations';
import type { UserProfile } from '../types';

interface Props {
  t: Translations;
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

type FieldErrors = Partial<Record<keyof UserProfile, string>>;

const labelClass = 'block text-base font-semibold text-ink-800';
const inputClass =
  'mt-2 w-full rounded-xl border-2 border-ink-200 bg-surface px-4 py-3 text-lg text-ink-900 placeholder:text-ink-300 focus:border-brand-500';

export default function ProfileForm({ t, initialProfile, onSubmit, onBack }: Props) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<FieldErrors>({});

  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const ageNum = Number(profile.age);
    if (!profile.age.trim() || Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      next.age = t.profile.errorAge;
    }
    if (!profile.sex) next.sex = t.profile.errorRequired;
    if (!profile.heightCm.trim()) next.heightCm = t.profile.errorRequired;
    if (!profile.weightKg.trim()) next.weightKg = t.profile.errorRequired;
    if (!profile.goal.trim()) next.goal = t.profile.errorRequired;
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      onSubmit(profile);
    } else {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-ink-50 py-12">
      <div className="container-page max-w-2xl">
        <button type="button" onClick={onBack} className="mb-6 font-semibold text-brand-600 hover:text-brand-700">
          {t.profile.back}
        </button>

        <div className="rounded-3xl border border-ink-100 bg-surface p-6 shadow-sm sm:p-10">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-600">{t.profile.eyebrow}</span>
          <h1 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">{t.profile.title}</h1>
          <p className="mt-3 flex items-start gap-2 text-ink-600">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
            {t.profile.subtitle}
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
            <fieldset>
              <legend className="mb-4 text-lg font-bold text-ink-900">{t.profile.sectionPersonal}</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-age" className={labelClass}>
                    {t.profile.age} *
                  </label>
                  <input
                    id="field-age"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={120}
                    value={profile.age}
                    onChange={(e) => update('age', e.target.value)}
                    placeholder={t.profile.agePlaceholder}
                    className={inputClass}
                    aria-invalid={Boolean(errors.age)}
                    aria-describedby={errors.age ? 'err-age' : undefined}
                  />
                  {errors.age && (
                    <p id="err-age" className="mt-1.5 text-sm font-medium text-red-600">
                      {errors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="field-sex" className={labelClass}>
                    {t.profile.sex} *
                  </label>
                  <select
                    id="field-sex"
                    value={profile.sex}
                    onChange={(e) => update('sex', e.target.value as UserProfile['sex'])}
                    className={inputClass}
                    aria-invalid={Boolean(errors.sex)}
                    aria-describedby={errors.sex ? 'err-sex' : undefined}
                  >
                    <option value="">{t.profile.sexPlaceholder}</option>
                    <option value="female">{t.profile.sexOptions.female}</option>
                    <option value="male">{t.profile.sexOptions.male}</option>
                    <option value="other">{t.profile.sexOptions.other}</option>
                  </select>
                  {errors.sex && (
                    <p id="err-sex" className="mt-1.5 text-sm font-medium text-red-600">
                      {errors.sex}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-lg font-bold text-ink-900">{t.profile.sectionBody}</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-heightCm" className={labelClass}>
                    {t.profile.height} *
                  </label>
                  <input
                    id="field-heightCm"
                    type="number"
                    inputMode="numeric"
                    min={50}
                    max={250}
                    value={profile.heightCm}
                    onChange={(e) => update('heightCm', e.target.value)}
                    placeholder={t.profile.heightPlaceholder}
                    className={inputClass}
                    aria-invalid={Boolean(errors.heightCm)}
                    aria-describedby={errors.heightCm ? 'err-heightCm' : undefined}
                  />
                  {errors.heightCm && (
                    <p id="err-heightCm" className="mt-1.5 text-sm font-medium text-red-600">
                      {errors.heightCm}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="field-weightKg" className={labelClass}>
                    {t.profile.weight} *
                  </label>
                  <input
                    id="field-weightKg"
                    type="number"
                    inputMode="numeric"
                    min={20}
                    max={300}
                    value={profile.weightKg}
                    onChange={(e) => update('weightKg', e.target.value)}
                    placeholder={t.profile.weightPlaceholder}
                    className={inputClass}
                    aria-invalid={Boolean(errors.weightKg)}
                    aria-describedby={errors.weightKg ? 'err-weightKg' : undefined}
                  />
                  {errors.weightKg && (
                    <p id="err-weightKg" className="mt-1.5 text-sm font-medium text-red-600">
                      {errors.weightKg}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-lg font-bold text-ink-900">{t.profile.sectionMeds}</legend>
              <label htmlFor="field-medications" className={labelClass}>
                {t.profile.medications}
              </label>
              <textarea
                id="field-medications"
                value={profile.medications}
                onChange={(e) => update('medications', e.target.value)}
                placeholder={t.profile.medicationsPlaceholder}
                rows={3}
                className={inputClass}
              />
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-lg font-bold text-ink-900">{t.profile.sectionGoal}</legend>
              <label htmlFor="field-goal" className={labelClass}>
                {t.profile.goal} *
              </label>
              <textarea
                id="field-goal"
                value={profile.goal}
                onChange={(e) => update('goal', e.target.value)}
                placeholder={t.profile.goalPlaceholder}
                rows={3}
                className={inputClass}
                aria-invalid={Boolean(errors.goal)}
                aria-describedby={errors.goal ? 'err-goal' : undefined}
              />
              {errors.goal && (
                <p id="err-goal" className="mt-1.5 text-sm font-medium text-red-600">
                  {errors.goal}
                </p>
              )}
            </fieldset>

            <p className="text-sm text-ink-400">{t.profile.requiredNote}</p>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-brand-700 sm:w-auto sm:px-10"
            >
              {t.profile.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
