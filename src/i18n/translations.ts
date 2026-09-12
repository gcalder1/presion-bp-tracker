export interface Translations {
  nav: {
    productName: string;
    howItWorks: string;
    dashboard: string;
    about: string;
    getStarted: string;
    switchToDark: string;
    switchToLight: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    supporting: string;
    ctaPrimary: string;
    ctaSecondary: string;
    mockupBadge: string;
    mockupLatest: string;
    mockupChatPreview: string;
    mockupChatReply: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    intro: string;
    points: { title: string; desc: string }[];
  };
  solution: {
    eyebrow: string;
    title: string;
    steps: { number: string; title: string; desc: string }[];
  };
  profile: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sectionPersonal: string;
    age: string;
    agePlaceholder: string;
    sex: string;
    sexPlaceholder: string;
    sexOptions: { female: string; male: string; other: string };
    sectionBody: string;
    height: string;
    heightPlaceholder: string;
    weight: string;
    weightPlaceholder: string;
    sectionMeds: string;
    medications: string;
    medicationsPlaceholder: string;
    sectionGoal: string;
    goal: string;
    goalPlaceholder: string;
    requiredNote: string;
    errorRequired: string;
    errorAge: string;
    submit: string;
    back: string;
  };
  dashboard: {
    demoNotice: string;
    greetingMorning: string;
    greetingAfternoon: string;
    greetingEvening: string;
    subtitle: string;
    profileSummary: (age: string) => string;
    latestReading: string;
    latestReadingSub: string;
    bpm: string;
    averageBP: string;
    averageBPSub: string;
    highestReading: string;
    highestReadingSub: string;
    readingsRecorded: string;
    readingsRecordedSub: string;
    trendChartTitle: string;
    trendChartSub: string;
    pulseChartTitle: string;
    pulseChartSub: string;
    averagePulse: string;
    distributionTitle: string;
    distributionSub: string;
    distributionLower: string;
    distributionTypical: string;
    distributionHigher: string;
    filter7: string;
    filter30: string;
    filter60: string;
    systolic: string;
    diastolic: string;
    pulse: string;
    date: string;
    time: string;
    tableTitle: string;
    tableSub: string;
    viewAll: string;
    closeModal: string;
    allReadingsTitle: string;
    insightTitle: string;
    insightWhatChanged: string;
    insightBody: (avg: string) => string;
    insightChangeUp: (delta: number) => string;
    insightChangeDown: (delta: number) => string;
    insightChangeFlat: string;
    disclaimer: string;
    editProfile: string;
  };
  chat: {
    title: string;
    subtitle: string;
    languageIndicator: string;
    inputPlaceholder: string;
    send: string;
    suggestions: string[];
    greeting: string;
    fallback: string;
  };
  footer: {
    about: string;
    rights: string;
  };
  common: {
    years: string;
  };
}

export const translations: Record<'en' | 'es', Translations> = {
  en: {
    // Navigation
    nav: {
      productName: 'Presión',
      howItWorks: 'How It Works',
      dashboard: 'Dashboard',
      about: 'About',
      getStarted: 'Get Started',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    // Hero / Landing
    hero: {
      titleLine1: 'Understand your blood pressure.',
      titleLine2: 'Without the guesswork.',
      subtitle:
        'Your readings, simplified into clear insights and conversations you can understand.',
      supporting:
        'An AI-powered companion designed to make blood pressure tracking easier for older adults and Spanish-speaking families.',
      ctaPrimary: 'Get Started',
      ctaSecondary: 'See How It Works',
      mockupBadge: 'Connected & syncing',
      mockupLatest: 'Latest reading',
      mockupChatPreview: '"How has my blood pressure been lately?"',
      mockupChatReply: 'Your average this month is 126/79 — fairly steady.',
    },
    // Problem section
    problem: {
      eyebrow: 'The Problem',
      title: 'Manual tracking fails the people who need it most',
      intro:
        'Older adults often manually write down their blood pressure readings. That process breaks down in predictable ways.',
      points: [
        { title: 'Missing readings', desc: 'Busy days or forgetfulness mean readings never get recorded at all.' },
        { title: 'Incorrect numbers', desc: 'Three numbers, written by hand — small transcription errors add up.' },
        { title: 'Lost paper records', desc: 'A misplaced booklet means weeks of history disappear.' },
        { title: 'Hard to see trends', desc: 'Rows of numbers on paper don’t reveal patterns over time.' },
        { title: 'Incomplete info for doctors', desc: 'Gaps in the record make it harder for a PCP to give accurate guidance.' },
      ],
    },
    // Solution section
    solution: {
      eyebrow: 'The Solution',
      title: 'From cuff to conversation, automatically',
      steps: [
        {
          number: '01',
          title: 'Automatic Tracking',
          desc: 'A connected blood pressure monitor captures every reading — systolic, diastolic, pulse, and time — with no writing required.',
        },
        {
          number: '02',
          title: 'Simplified Data',
          desc: 'The app organizes every reading and quietly identifies trends worth knowing about.',
        },
        {
          number: '03',
          title: 'Conversational Insights',
          desc: 'An AI assistant explains the data in simple English or Spanish — just ask.',
        },
      ],
    },
    // Profile form
    profile: {
      eyebrow: 'Step 1 of 2',
      title: 'Tell us a bit about yourself',
      subtitle:
        'This helps us personalize your dashboard. Nothing you enter is saved or sent anywhere — it stays in this demo session.',
      sectionPersonal: 'Personal Information',
      age: 'Age',
      agePlaceholder: 'e.g., 68',
      sex: 'Sex',
      sexPlaceholder: 'Select one',
      sexOptions: { female: 'Female', male: 'Male', other: 'Other / Prefer not to say' },
      sectionBody: 'Body Information',
      height: 'Height (cm)',
      heightPlaceholder: 'e.g., 160',
      weight: 'Weight (kg)',
      weightPlaceholder: 'e.g., 68',
      sectionMeds: 'Medications',
      medications: 'Medications you currently take',
      medicationsPlaceholder: 'e.g., Lisinopril 10mg, once daily in the morning',
      sectionGoal: 'Blood Pressure Goal',
      goal: 'What would you like to understand or improve about your blood pressure?',
      goalPlaceholder: 'e.g., I want to know if my readings are getting better or worse over time',
      requiredNote: '* Required field',
      errorRequired: 'Please fill in this field to continue.',
      errorAge: 'Please enter a valid age between 1 and 120.',
      submit: 'Continue to Dashboard →',
      back: '← Back',
    },
    // Dashboard
    dashboard: {
      demoNotice: 'Demo data — not real medical readings',
      greetingMorning: 'Good morning',
      greetingAfternoon: 'Good afternoon',
      greetingEvening: 'Good evening',
      subtitle: 'Here’s how your blood pressure has been trending.',
      profileSummary: (age: string) => `Showing insights personalized for a ${age}-year-old profile.`,
      latestReading: 'Latest Reading',
      latestReadingSub: 'Pulse',
      bpm: 'bpm',
      averageBP: 'Average Blood Pressure',
      averageBPSub: 'Selected period',
      highestReading: 'Highest Reading',
      highestReadingSub: 'Peak systolic',
      readingsRecorded: 'Readings Recorded',
      readingsRecordedSub: 'In selected period',
      trendChartTitle: 'Blood Pressure Trend',
      trendChartSub: 'Systolic and diastolic over time',
      pulseChartTitle: 'Pulse',
      pulseChartSub: 'Average pulse over time',
      averagePulse: 'Average Pulse',
      distributionTitle: 'Reading Distribution',
      distributionSub: 'How your readings are spread out — for context, not diagnosis',
      distributionLower: 'Lower range',
      distributionTypical: 'Typical range',
      distributionHigher: 'Higher range',
      filter7: '7 Days',
      filter30: '30 Days',
      filter60: '60 Days',
      systolic: 'Systolic',
      diastolic: 'Diastolic',
      pulse: 'Pulse',
      date: 'Date',
      time: 'Time',
      tableTitle: 'Recent Readings',
      tableSub: 'Your most recent recorded readings',
      viewAll: 'View all readings',
      closeModal: 'Close',
      allReadingsTitle: 'All Readings',
      insightTitle: 'Your readings at a glance',
      insightWhatChanged: 'What changed?',
      insightBody: (avg: string) =>
        `Your recent readings have been fairly consistent. Your average reading over the selected period is ${avg}.`,
      insightChangeUp: (delta: number) =>
        `Your systolic readings have been about ${delta} points higher during the last two weeks compared with the previous period.`,
      insightChangeDown: (delta: number) =>
        `Your systolic readings have been about ${Math.abs(delta)} points lower during the last two weeks compared with the previous period.`,
      insightChangeFlat: 'Your readings have stayed about the same compared with the previous period.',
      disclaimer:
        'Demo only. This prototype uses simulated blood pressure data and is not medical advice. Always consult your healthcare professional about your health.',
      editProfile: 'Edit profile',
    },
    // AI Chat
    chat: {
      title: 'Your Health Assistant',
      subtitle: 'Ask me about your blood pressure data.',
      languageIndicator: 'English / Español',
      inputPlaceholder: 'Type your question...',
      send: 'Send',
      suggestions: [
        'What’s my average?',
        'How has my BP changed?',
        'What was my highest reading?',
        'How is my pulse?',
      ],
      greeting:
        'Hi! I’m your health assistant. I can help you understand your blood pressure data — try asking me a question, or tap a suggestion below.',
      fallback:
        'I’m still learning how to answer that in this demo. In the full product, I’d be able to explore your blood pressure data and answer more questions.',
    },
    // Footer / general
    footer: {
      about:
        'Presión is a portfolio concept exploring how AI could help older, Spanish-speaking adults track blood pressure without the burden of manual logging.',
      rights: 'Built as a portfolio demo. No real data, devices, or AI services are used.',
    },
    common: {
      years: 'years',
    },
  },
  es: {
    nav: {
      productName: 'Presión',
      howItWorks: 'Cómo Funciona',
      dashboard: 'Panel',
      about: 'Acerca de',
      getStarted: 'Comenzar',
      switchToDark: 'Cambiar a modo oscuro',
      switchToLight: 'Cambiar a modo claro',
    },
    hero: {
      titleLine1: 'Entiende tu presión arterial.',
      titleLine2: 'Sin adivinar.',
      subtitle:
        'Tus lecturas, simplificadas en información clara y conversaciones que puedes entender.',
      supporting:
        'Un compañero impulsado por IA diseñado para facilitar el control de la presión arterial a adultos mayores y familias hispanohablantes.',
      ctaPrimary: 'Comenzar',
      ctaSecondary: 'Ver Cómo Funciona',
      mockupBadge: 'Conectado y sincronizando',
      mockupLatest: 'Última lectura',
      mockupChatPreview: '"¿Cómo ha estado mi presión últimamente?"',
      mockupChatReply: 'Tu promedio este mes es 126/79 — bastante estable.',
    },
    problem: {
      eyebrow: 'El Problema',
      title: 'El registro manual falla a quienes más lo necesitan',
      intro:
        'Los adultos mayores a menudo anotan sus lecturas de presión arterial a mano. Ese proceso falla de formas predecibles.',
      points: [
        { title: 'Lecturas faltantes', desc: 'Los días ocupados o el olvido hacen que las lecturas nunca se registren.' },
        { title: 'Números incorrectos', desc: 'Tres números escritos a mano — los pequeños errores de transcripción se acumulan.' },
        { title: 'Registros en papel perdidos', desc: 'Un cuaderno extraviado significa que semanas de historial desaparecen.' },
        { title: 'Difícil ver tendencias', desc: 'Filas de números en papel no revelan patrones con el tiempo.' },
        { title: 'Información incompleta para el médico', desc: 'Los vacíos en el registro dificultan que el médico dé una orientación precisa.' },
      ],
    },
    solution: {
      eyebrow: 'La Solución',
      title: 'Del brazalete a la conversación, automáticamente',
      steps: [
        {
          number: '01',
          title: 'Registro Automático',
          desc: 'Un monitor de presión conectado capta cada lectura — sistólica, diastólica, pulso y hora — sin necesidad de escribir nada.',
        },
        {
          number: '02',
          title: 'Datos Simplificados',
          desc: 'La aplicación organiza cada lectura e identifica tendencias importantes en silencio.',
        },
        {
          number: '03',
          title: 'Información Conversacional',
          desc: 'Un asistente de IA explica los datos en español o inglés sencillo — solo pregunta.',
        },
      ],
    },
    profile: {
      eyebrow: 'Paso 1 de 2',
      title: 'Cuéntanos un poco sobre ti',
      subtitle:
        'Esto nos ayuda a personalizar tu panel. Nada de lo que ingreses se guarda ni se envía a ningún lugar — permanece en esta sesión de demostración.',
      sectionPersonal: 'Información Personal',
      age: 'Edad',
      agePlaceholder: 'ej., 68',
      sex: 'Sexo',
      sexPlaceholder: 'Selecciona una opción',
      sexOptions: { female: 'Femenino', male: 'Masculino', other: 'Otro / Prefiero no decir' },
      sectionBody: 'Información Corporal',
      height: 'Estatura (cm)',
      heightPlaceholder: 'ej., 160',
      weight: 'Peso (kg)',
      weightPlaceholder: 'ej., 68',
      sectionMeds: 'Medicamentos',
      medications: 'Medicamentos que tomas actualmente',
      medicationsPlaceholder: 'ej., Lisinopril 10mg, una vez al día por la mañana',
      sectionGoal: 'Meta de Presión Arterial',
      goal: '¿Qué te gustaría entender o mejorar sobre tu presión arterial?',
      goalPlaceholder: 'ej., Quiero saber si mis lecturas están mejorando o empeorando con el tiempo',
      requiredNote: '* Campo obligatorio',
      errorRequired: 'Por favor completa este campo para continuar.',
      errorAge: 'Por favor ingresa una edad válida entre 1 y 120.',
      submit: 'Continuar al Panel →',
      back: '← Atrás',
    },
    dashboard: {
      demoNotice: 'Datos de demostración — no son lecturas médicas reales',
      greetingMorning: 'Buenos días',
      greetingAfternoon: 'Buenas tardes',
      greetingEvening: 'Buenas noches',
      subtitle: 'Así ha estado la tendencia de tu presión arterial.',
      profileSummary: (age: string) => `Mostrando información personalizada para un perfil de ${age} años.`,
      latestReading: 'Última Lectura',
      latestReadingSub: 'Pulso',
      bpm: 'lpm',
      averageBP: 'Presión Arterial Promedio',
      averageBPSub: 'Período seleccionado',
      highestReading: 'Lectura Más Alta',
      highestReadingSub: 'Sistólica máxima',
      readingsRecorded: 'Lecturas Registradas',
      readingsRecordedSub: 'En el período seleccionado',
      trendChartTitle: 'Tendencia de Presión Arterial',
      trendChartSub: 'Sistólica y diastólica a lo largo del tiempo',
      pulseChartTitle: 'Pulso',
      pulseChartSub: 'Pulso promedio a lo largo del tiempo',
      averagePulse: 'Pulso Promedio',
      distributionTitle: 'Distribución de Lecturas',
      distributionSub: 'Cómo se distribuyen tus lecturas — solo contexto, no diagnóstico',
      distributionLower: 'Rango bajo',
      distributionTypical: 'Rango típico',
      distributionHigher: 'Rango alto',
      filter7: '7 Días',
      filter30: '30 Días',
      filter60: '60 Días',
      systolic: 'Sistólica',
      diastolic: 'Diastólica',
      pulse: 'Pulso',
      date: 'Fecha',
      time: 'Hora',
      tableTitle: 'Lecturas Recientes',
      tableSub: 'Tus lecturas registradas más recientes',
      viewAll: 'Ver todas las lecturas',
      closeModal: 'Cerrar',
      allReadingsTitle: 'Todas las Lecturas',
      insightTitle: 'Tus lecturas de un vistazo',
      insightWhatChanged: '¿Qué cambió?',
      insightBody: (avg: string) =>
        `Tus lecturas recientes han sido bastante consistentes. Tu lectura promedio en el período seleccionado es ${avg}.`,
      insightChangeUp: (delta: number) =>
        `Tus lecturas sistólicas han estado alrededor de ${delta} puntos más altas en las últimas dos semanas comparadas con el período anterior.`,
      insightChangeDown: (delta: number) =>
        `Tus lecturas sistólicas han estado alrededor de ${Math.abs(delta)} puntos más bajas en las últimas dos semanas comparadas con el período anterior.`,
      insightChangeFlat: 'Tus lecturas se han mantenido similares en comparación con el período anterior.',
      disclaimer:
        'Solo demostración. Este prototipo utiliza datos simulados de presión arterial y no constituye consejo médico. Consulta siempre a un profesional de la salud sobre tu salud.',
      editProfile: 'Editar perfil',
    },
    chat: {
      title: 'Tu Asistente de Salud',
      subtitle: 'Pregúntame sobre tus datos de presión arterial.',
      languageIndicator: 'English / Español',
      inputPlaceholder: 'Escribe tu pregunta...',
      send: 'Enviar',
      suggestions: [
        '¿Cuál es mi promedio?',
        '¿Cómo ha cambiado mi presión?',
        '¿Cuál fue mi lectura más alta?',
        '¿Cómo está mi pulso?',
      ],
      greeting:
        '¡Hola! Soy tu asistente de salud. Puedo ayudarte a entender tus datos de presión arterial — intenta hacerme una pregunta, o toca una sugerencia abajo.',
      fallback:
        'Todavía estoy aprendiendo a responder esa pregunta en esta demostración. En el producto completo, podría analizar tus datos de presión arterial y responder más preguntas.',
    },
    footer: {
      about:
        'Presión es un concepto de portafolio que explora cómo la IA podría ayudar a adultos mayores hispanohablantes a controlar su presión arterial sin la carga del registro manual.',
      rights: 'Creado como demostración de portafolio. No se usan datos, dispositivos ni servicios de IA reales.',
    },
    common: {
      years: 'años',
    },
  },
};
