import React from 'react';
import { motion } from 'framer-motion';
import { useUserStats } from '@/context/UseStatsContext';
import { Trophy, Star, BookOpen, Shield } from 'lucide-react';

const iconMap = {
  Trophy, Star, BookOpen, Shield
};

function AchievementsView() {
  const { userStats, achievements } = useUserStats();

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Conquistas</h2>
        <p className="text-sm md:text-base text-gray-600">Desbloqueie medalhas e mostre seu progresso!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {achievements.map((achievement, index) => {
          const IconComponent = iconMap[achievement.icon];
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`game-card p-4 md:p-6 ${achievement.unlocked ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' : 'opacity-60'}`}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                    : 'bg-gray-300'
                }`}>
                  {IconComponent && <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 truncate">{achievement.name}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="badge badge-gold">Desbloqueada!</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card text-center p-4 md:p-6"
      >
        <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Seu Progresso</h3>
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text">{userStats.level}</div>
            <div className="text-sm md:text-base text-gray-600">Nível</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text">{userStats.points}</div>
            <div className="text-sm md:text-base text-gray-600">Pontos</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold gradient-text">
              {achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-sm md:text-base text-gray-600">Conquistas</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AchievementsView;