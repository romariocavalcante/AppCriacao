import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useContent } from '@/context/ContentContext';

const UserStatsContext = createContext();

export const UserStatsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('dengue-app-stats');
    return saved ? JSON.parse(saved) : {
      points: 0,
      level: 1,
      streak: 0,
      badges: [],
      completedMissions: [],
      quizScore: 0
    };
  });

  const { content } = useContent();

  const [dailyMissions, setDailyMissions] = useState(() => {
    const saved = localStorage.getItem('dengue-daily-missions');
    const today = new Date().toDateString();
    const savedData = saved ? JSON.parse(saved) : null;
    
    if (savedData && savedData.date === today) {
      return savedData.missions;
    }
    
    return (content && content.dailyMissions) ? content.dailyMissions : [
      { id: 1, title: 'Ler um estudo bíblico', points: 50, completed: false, icon: 'BookOpen' },
      { id: 2, title: 'Compartilhar reflexão', points: 30, completed: false, icon: 'Users' },
      { id: 3, title: 'Completar quiz diário', points: 40, completed: false, icon: 'BookOpen' },
      { id: 4, title: 'Participar do grupo de estudo', points: 60, completed: false, icon: 'Users' }
    ];
  });

  const [quizQuestions, setQuizQuestions] = useState(() => (content && content.quizQuestions) ? content.quizQuestions : [
    {
      id: 1,
      question: 'Quem conduziu o povo de Israel pela travessia do Mar Vermelho?',
      options: ['Moisés', 'Josué', 'Abraão', 'Davi'],
      correct: 0,
      explanation: 'Moisés liderou a saída do Egito e, pelo poder de Deus, o povo atravessou o Mar Vermelho.'
    },
    {
      id: 2,
      question: 'Quantos dias Jesus jejuou no deserto?',
      options: ['7 dias', '40 dias', '3 dias', '12 dias'],
      correct: 1,
      explanation: 'De acordo com os Evangelhos, Jesus jejuou 40 dias no deserto antes de iniciar seu ministério.'
    },
    {
      id: 3,
      question: 'Qual livro contém o "Pai Nosso"?',
      options: ['Gênesis', 'Salmos', 'Mateus', 'Apocalipse'],
      correct: 2,
      explanation: 'O "Pai Nosso" aparece no Evangelho de Mateus (capítulo 6) e também em Lucas (capítulo 11).'
    }
  ]);

  const [preventionTips, setPreventionTips] = useState(() => (content && content.preventionTips) ? content.preventionTips : [
    { icon: 'BookOpen', title: 'Leitura Diária', description: 'Reserve um tempo diário para ler a Bíblia e meditar nas passagens.' },
    { icon: 'Users', title: 'Estudo em Grupo', description: 'Participe de um grupo de estudo para trocar reflexões e aprender juntos.' },
    { icon: 'BookOpen', title: 'Memorize Versículos', description: 'Decore versículos-chave para fortalecer sua fé e lembrar promessas.' },
    { icon: 'Heart', title: 'Pratique o Amor', description: 'Aplique os ensinamentos bíblicos ajudando o próximo no dia a dia.' },
    { icon: 'Zap', title: 'Oração Constante', description: 'Mantenha uma vida de oração e comunhão com Deus em todas as ocasiões.' }
  ]);

  const [achievements, setAchievements] = useState(() => (content && content.achievements) ?
    content.achievements.map(a => ({ ...a, unlocked: !!a.unlocked })) :
    [
      { id: 1, name: 'Primeiro Versículo', description: 'Leia seu primeiro estudo bíblico', icon: 'BookOpen', unlocked: userStats.points > 0 },
      { id: 2, name: 'Discípulo', description: 'Complete 5 estudos ou quizzes', icon: 'Users', unlocked: userStats.points > 200 },
      { id: 3, name: 'Estudioso', description: 'Complete 15 estudos', icon: 'Star', unlocked: userStats.level >= 5 },
      { id: 4, name: 'Coração Generoso', description: 'Aplique ensinamentos em ações de amor', icon: 'Heart', unlocked: userStats.points >= 1000 }
    ]);

  // When content changes (edited via admin), update these lists while preserving runtime flags if possible
  useEffect(() => {
    if (!content) return;
    if (content.quizQuestions) setQuizQuestions(content.quizQuestions);
    if (content.preventionTips) setPreventionTips(content.preventionTips);
    if (content.achievements) setAchievements(content.achievements.map(a => ({ ...a, unlocked: !!a.unlocked })));
    if (content.dailyMissions) {
      // preserve completed flags from existing dailyMissions where ids match
      setDailyMissions(prev => {
        const byId = (prev || []).reduce((acc, m) => { acc[m.id] = m; return acc; }, {});
        return content.dailyMissions.map(m => ({ ...m, completed: byId[m.id] ? !!byId[m.id].completed : !!m.completed }));
      });
    }
  }, [content]);

  useEffect(() => {
    localStorage.setItem('dengue-app-stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('dengue-daily-missions', JSON.stringify({
      date: today,
      missions: dailyMissions
    }));
  }, [dailyMissions]);

  const addPoints = (points) => {
    setUserStats(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 200) + 1;
      return { ...prev, points: newPoints, level: newLevel };
    });
  };

  const completeMission = (missionId) => {
    setDailyMissions(prev => 
      prev.map(mission => {
        if (mission.id === missionId && !mission.completed) {
          addPoints(mission.points);
          toast({
            title: "🎉 Missão Concluída!",
            description: `Você ganhou ${mission.points} pontos!`,
          });
          return { ...mission, completed: true };
        }
        return mission;
      })
    );
  };

  const value = {
    userStats,
    setUserStats,
    dailyMissions,
    setDailyMissions,
    quizQuestions,
    preventionTips,
    achievements,
    addPoints,
    completeMission,
  };

  return (
    <UserStatsContext.Provider value={value}>
      {children}
    </UserStatsContext.Provider>
  );
};

export const useUserStats = () => {
  return useContext(UserStatsContext);
};