import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

const defaultContent = {
  appName: 'Trilha da Fé',
  logoUrl: '/images/trilha-da-fe-logo.svg',
  navLabels: {
    home: 'Início',
    quiz: 'Quiz Bíblico',
    achievements: 'Conquistas',
    challenges: 'Desafios',
    studies: 'Estudos',
    admin: 'Admin'
  },
  home: {
    title: 'Trilha da Fé',
    intro: 'Uma jornada de estudos bíblicos, quizzes e desafios espirituais. Aprenda, pratique e receba certificados ao concluir trilhas.',
    impactTitle: 'Áreas de Estudo',
    impactText: 'Crescimento espiritual através do estudo e prática diária',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
  },

  // conteúdo editável adicional
  dailyMissions: [
    { id: 1, title: 'Ler um capítulo da Bíblia', points: 50, completed: false, icon: 'BookOpen' },
    { id: 2, title: 'Orar por 10 minutos', points: 30, completed: false, icon: 'Heart' },
    { id: 3, title: 'Completar o quiz diário', points: 40, completed: false, icon: 'BookOpen' },
    { id: 4, title: 'Compartilhar uma reflexão', points: 60, completed: false, icon: 'Share2' }
  ],
  quizQuestions: [
    {
      id: 1,
      question: 'Quem batizou Jesus no rio Jordão?',
      options: ['João Batista', 'Pedro', 'Paulo', 'Tiago'],
      correct: 0,
      explanation: 'João Batista batizou Jesus no rio Jordão, conforme os evangelhos.'
    },
    {
      id: 2,
      question: 'Em qual livro encontramos o Sermão da Montanha?',
      options: ['Mateus', 'Marcos', 'Lucas', 'João'],
      correct: 0,
      explanation: 'O Sermão da Montanha é registrado no livro de Mateus.'
    },
    {
      id: 3,
      question: 'Por quantos dias Jesus jejuou no deserto?',
      options: ['7', '40', '21', '3'],
      correct: 1,
      explanation: 'Segundo os evangelhos, Jesus jejuou por 40 dias no deserto.'
    }
  ],
  preventionTips: [
    { icon: 'BookOpen', title: 'Leia diariamente', description: 'Reserve um tempo diário para leitura e meditação das Escrituras.' },
    { icon: 'Users', title: 'Estudo em grupo', description: 'Participe de um grupo de estudo para trocar reflexões e crescer em comunidade.' }
  ],
  achievements: [
    { id: 1, name: 'Primeiro Versículo Lido', description: 'Você leu seu primeiro versículo', icon: 'Star', unlocked: false },
    { id: 2, name: 'Discípulo', description: 'Complete 5 quizzes bíblicos', icon: 'BookOpen', unlocked: false }
  ],

  challenges: [
    { id: 'ch-1', title: 'Estudo Comunitário', description: 'Organize um encontro para estudar uma passagem bíblica com sua turma ou comunidade.', points: 500, icon: 'BookOpen', teamSize: '5-15 pessoas' },
    { id: 'ch-2', title: 'Atos de Amor', description: 'Realize uma ação prática de ajuda ao próximo baseada nos ensinamentos bíblicos.', points: 300, icon: 'Heart', teamSize: 'Indivíduo ou grupo' }
  ],
  levels: [
    { level: 1, name: 'Iniciante', pointsRequired: 0 },
    { level: 2, name: 'Discípulo', pointsRequired: 200 },
    { level: 3, name: 'Mestre', pointsRequired: 400 }
  ],
  studyAreas: [
    {
      id: 'jesus',
      title: 'Jesus',
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
