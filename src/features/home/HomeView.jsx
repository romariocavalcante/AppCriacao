import React from 'react';
import { motion } from 'framer-motion';
import { useUserStats } from '@/context/UseStatsContext';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Target, 
  Award, 
  Heart, 
  Zap, 
  Calendar,
  CheckCircle,
  Droplets,
  Users,
  BookOpen,
  MapPin,
  Home,
  Trash2,
  Flower
} from 'lucide-react';

const iconMap = {
  Droplets, Users, BookOpen, MapPin, Home, Trash2, Flower
};

function HomeView() {
  const { userStats, dailyMissions, preventionTips, achievements, completeMission } = useUserStats();
  const { content } = useContent();

  const heroImage = (content && content.home && content.home.heroImage) || 'https://images.unsplash.com/photo-1591169556548-21fee665ffae';
  const appTitle = (content && content.home && content.home.title) || 'Guardiões Contra a Dengue';
  const appIntro = (content && content.home && content.home.intro) || 'Junte-se à missão de proteger Canaã dos Carajás! Complete desafios, aprenda sobre prevenção e torne-se um herói da saúde.';

  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 md:space-y-4"
      >
        <div className="floating-animation">
          <img 
            alt="Mascote da prevenção da dengue" 
            className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full" 
            src={heroImage} 
          />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold gradient-text px-2">
          {appTitle}
        </h1>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          {appIntro}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="game-card text-center p-4 md:p-6"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Nível {userStats.level}</h3>
          <p className="text-xs md:text-sm text-gray-600">{userStats.points} pontos</p>
          <div className="mt-2 md:mt-3 bg-gray-200 rounded-full h-1.5 md:h-2">
            <div 
              className="progress-bar"
              style={{ width: `${(userStats.points % 200) / 2}%` }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="game-card text-center p-4 md:p-6"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Missões</h3>
          <p className="text-xs md:text-sm text-gray-600">
            {dailyMissions.filter(m => m.completed).length}/{dailyMissions.length} concluídas
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="game-card text-center p-4 md:p-6"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Conquistas</h3>
          <p className="text-xs md:text-sm text-gray-600">
            {achievements.filter(a => a.unlocked).length}/{achievements.length} desbloqueadas
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="game-card text-center p-4 md:p-6"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Impacto</h3>
          <p className="text-xs md:text-sm text-gray-600">Protegendo nossa cidade</p>
        </motion.div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="game-card p-4 md:p-6"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 flex items-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2 text-yellow-500" />
            Dicas de Prevenção
          </h3>
          <div className="space-y-3 md:space-y-4">
            {preventionTips.map((tip, index) => {
              const IconComponent = iconMap[tip.icon];
              return (
                <div key={index} className="flex items-start space-x-2 md:space-x-3 p-2 md:p-3 bg-green-50 rounded-lg">
                  {IconComponent && <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-0.5 md:mt-1 flex-shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-green-800 text-sm md:text-base">{tip.title}</h4>
                    <p className="text-green-600 text-xs md:text-sm">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="game-card p-4 md:p-6"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 flex items-center">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 mr-2 text-blue-500" />
            Missões de Hoje
          </h3>
          <div className="space-y-2 md:space-y-3">
            {dailyMissions.map((mission) => {
              const IconComponent = iconMap[mission.icon];
              return (
                <div 
                  key={mission.id} 
                  className={`flex items-center justify-between p-2 md:p-3 rounded-lg border-2 ${
                    mission.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                    {IconComponent && <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${mission.completed ? 'text-green-600' : 'text-gray-500'} flex-shrink-0`} />}
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium text-sm md:text-base truncate ${mission.completed ? 'text-green-800' : 'text-gray-800'}`}>
                        {mission.title}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">{mission.points} pontos</p>
                    </div>
                  </div>
                  {mission.completed ? (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => completeMission(mission.id)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex-shrink-0"
                    >
                      Concluir
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomeView;