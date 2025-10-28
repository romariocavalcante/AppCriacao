import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

const defaultContent = {
  appName: 'Guardiões Contra a Dengue',
  logoUrl: '',
  navLabels: {
    home: 'Início',
    quiz: 'Quiz',
    map: 'Mapa',
    achievements: 'Conquistas',
    challenges: 'Desafios'
  },
  home: {
    title: 'Guardiões Contra a Dengue',
    intro: 'Junte-se à missão de proteger Canaã dos Carajás! Complete desafios, aprenda sobre prevenção e torne-se um herói da saúde.',
    impactTitle: 'Impacto',
    impactText: 'Protegendo nossa cidade',
    heroImage: 'https://images.unsplash.com/photo-1591169556548-21fee665ffae'
  },
  
  // conteúdo editável adicional
  dailyMissions: [
    { id: 1, title: 'Verificar recipientes de água', points: 50, completed: false, icon: 'Droplets' },
    { id: 2, title: 'Compartilhar dica de prevenção', points: 30, completed: false, icon: 'Users' },
    { id: 3, title: 'Completar quiz diário', points: 40, completed: false, icon: 'BookOpen' },
    { id: 4, title: 'Reportar foco suspeito', points: 60, completed: false, icon: 'MapPin' }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Qual é o principal transmissor da dengue?',
      options: ['Mosquito Aedes aegypti', 'Mosquito comum', 'Borrachudo', 'Pernilongo'],
      correct: 0,
      explanation: 'O Aedes aegypti é o mosquito transmissor da dengue, zika e chikungunya.'
    },
    {
      id: 2,
      question: 'Em que tipo de água o Aedes aegypti se reproduz?',
      options: ['Água suja', 'Água parada e limpa', 'Água corrente', 'Água salgada'],
      correct: 1,
      explanation: 'O Aedes aegypti prefere água limpa e parada para depositar seus ovos.'
    }
  ],
  preventionTips: [
    { icon: 'Droplets', title: 'Eliminar água parada', description: 'Verifique vasos, pneus e recipientes' },
    { icon: 'Home', title: 'Manter casa limpa', description: 'Limpe calhas e caixas d\'água regularmente' }
  ],
  achievements: [
    { id: 1, name: 'Primeiro Passo', description: 'Complete sua primeira missão', icon: 'Star', unlocked: false },
    { id: 2, name: 'Estudioso', description: 'Complete 5 quizzes', icon: 'BookOpen', unlocked: false }
  ],
  
  challenges: [
    { id: 'ch-1', title: 'Estudo Comunitário', description: 'Organize um encontro para estudar uma passagem bíblica com sua turma ou comunidade.', points: 500, icon: 'BookOpen', teamSize: '5-15 pessoas' },
    { id: 'ch-2', title: 'Atos de Amor', description: 'Realize uma ação prática de ajuda ao próximo baseada nos ensinamentos bíblicos.', points: 300, icon: 'Heart', teamSize: 'Indivíduo ou grupo' }
  ],
  levels: [
    { level: 1, name: 'Iniciante', pointsRequired: 0 },
    { level: 2, name: 'Aprendiz', pointsRequired: 200 },
    { level: 3, name: 'Guardião', pointsRequired: 400 }
  ]
  ,
  studyAreas: [
    {
      id: 'jesus',
      title: 'Pasta: Jesus',
      description: 'Estudos sobre a vida e ensinamentos de Jesus Cristo.',
      lessons: 15,
      hasQuiz: true,
      certificateTitle: 'Certificado de Conclusão - Estudos sobre Jesus'
    }
  ]
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('app-content');
      return saved ? JSON.parse(saved) : defaultContent;
    } catch (e) {
      return defaultContent;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app-content', JSON.stringify(content));
    } catch (e) {
      // ignore
    }
  }, [content]);

  const updateContent = (patch) => {
    setContent(prev => ({ ...prev, ...patch }));
  };

  return (
    <ContentContext.Provider value={{ content, setContent: updateContent, reset: () => setContent(defaultContent) }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);

export default ContentContext;
