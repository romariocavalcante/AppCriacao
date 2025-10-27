import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const challenges = [
  {
    title: 'Missão Bairro Limpo',
    description: 'Organize uma força-tarefa com sua turma para limpar uma área do bairro.',
    points: 500,
    icon: Shield,
    teamSize: '5-10 pessoas'
  },
  {
    title: 'Campeonato de Conhecimento',
    description: 'Compita contra outras turmas em um super quiz sobre a dengue.',
    points: 300,
    icon: Trophy,
    teamSize: 'Toda a turma'
  }
];

function ChallengesView() {
  const handleJoin = () => {
    toast({
      title: '🚧 Em breve!',
      description: "A função de criar e entrar em equipes será adicionada em breve! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Desafios em Equipe</h2>
        <p className="text-sm md:text-base text-gray-600">Una-se a seus amigos para missões ainda maiores!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {challenges.map((challenge, index) => {
          const IconComponent = challenge.icon;
          return (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="game-card flex flex-col p-4 md:p-6"
            >
              <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-semibold truncate">{challenge.title}</h3>
                  <p className="text-sm md:text-base text-purple-600 font-medium">{challenge.points} Pontos de Equipe</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 flex-grow">{challenge.description}</p>
              <div className="flex justify-between items-center mt-3 md:mt-4">
                <span className="text-xs md:text-sm font-semibold text-gray-500 flex items-center">
                  <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  {challenge.teamSize}
                </span>
                <Button onClick={handleJoin} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform text-sm md:text-base px-3 md:px-4 py-1 md:py-2">
                  Participar
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="game-card p-4 md:p-6"
      >
        <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Diário da Prevenção</h3>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
          Registre aqui as ações de prevenção que você realiza no seu dia a dia. Crie um diário e ganhe pontos extras!
        </p>
        <textarea
          placeholder="Ex: Hoje verifiquei todos os vasos de planta e não encontrei água parada..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[100px] md:min-h-[120px] text-sm md:text-base"
        />
        <Button 
          onClick={handleJoin}
          className="mt-3 md:mt-4 bg-gradient-to-r from-green-500 to-blue-500 w-full md:w-auto"
        >
          Salvar no Diário
        </Button>
      </motion.div>
    </div>
  );
}

export default ChallengesView;