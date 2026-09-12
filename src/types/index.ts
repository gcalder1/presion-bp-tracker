export type Language = 'en' | 'es';

export type Sex = 'female' | 'male' | 'other';

export interface UserProfile {
  age: string;
  sex: Sex | '';
  heightCm: string;
  weightKg: string;
  medications: string;
  goal: string;
}

export interface BPReading {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24h)
  systolic: number;
  diastolic: number;
  pulse: number;
}

export type PeriodFilter = 7 | 30 | 60;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  typing?: boolean;
}

export type AppView = 'landing' | 'profile' | 'dashboard';
