import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/components/ui/use-toast';

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

  const [dailyMissions, setDailyMissions] = useState(() => {
    const saved = localStorage.getItem('dengue-daily-missions');
    const today = new Date().toDateString();
    const savedData = saved ? JSON.parse(saved) : null;
    
    if (savedData && savedData.date === today) {
      return savedData.missions;
    }
    
    return [
      { id: 1, title: 'Verificar recipientes de água', points: 50, completed: false, icon: 'Droplets' },
      { id: 2, title: 'Compartilhar dica de prevenção', points: 30, completed: false, icon: 'Users' },
      { id: 3, title: 'Completar quiz diário', points: 40, completed: false, icon: 'BookOpen' },
      { id: 4, title: 'Reportar foco suspeito', points: 60, completed: false, icon: 'MapPin' }
    ];
  });

  const [quizQuestions] = useState([
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
    },
    {
      id: 3,
      question: 'Qual horário o mosquito da dengue é mais ativo?',
      options: ['Durante a noite', 'Manhã e final da tarde', 'Meio-dia', 'Madrugada'],
      correct: 1,
      explanation: 'O Aedes aegypti é mais ativo nas primeiras horas da manhã e no final da tarde.'
    }
  ]);

  const preventionTips = [
    { icon: 'Droplets', title: 'Eliminar água parada', description: 'Verifique vasos, pneus e recipientes' },
    { icon: 'Home', title: 'Manter casa limpa', description: 'Limpe calhas e caixas d\'água regularmente' },
    { icon: 'Trash2', title: 'Descartar lixo corretamente', description: 'Evite acúmulo de materiais que juntem água' },
    { icon: 'Flower', title: 'Cuidar do jardim', description: 'Mantenha plantas sem água acumulada' }
  ];

  const achievements = [
    { id: 1, name: 'Primeiro Passo', description: 'Complete sua primeira missão', icon: 'Star', unlocked: userStats.points > 0 },
    { id: 2, name: 'Estudioso', description: 'Complete 5 quizzes', icon: 'BookOpen', unlocked: userStats.points > 200 },
    { id: 3, name: 'Guardião', description: 'Alcance nível 5', icon: 'Shield', unlocked: userStats.level >= 5 },
    { id: 4, name: 'Herói da Prevenção', description: 'Acumule 1000 pontos', icon: 'Trophy', unlocked: userStats.points >= 1000 }
  ];

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