import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Bug, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const games = [
  {
    title: 'Caça ao Mosquito',
    description: 'Encontre e elimine os mosquitos escondidos no cenário.',
    icon: Bug,
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'Limpeza Radical',
    description: 'Identifique e limpe todos os possíveis focos de dengue em uma casa.',
    icon: Droplet,
    color: 'from-blue-500 to-cyan-500'
  }
];

function GamesView() {
  const handlePlay = () => {
    toast({
      title: '🚧 Jogo em desenvolvimento!',
      description: "Este mini-jogo ainda não está pronto, mas em breve você poderá jogar! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Central de Jogos</h2>
        <p className="text-sm md:text-base text-gray-600">Divirta-se enquanto aprende a combater a dengue!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {games.map((game, index) => {
          const IconComponent = game.icon;
          return (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="game-card text-center flex flex-col items-center p-4 md:p-6"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${game.color} mb-4 md:mb-6`}>
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">{game.title}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 flex-grow">{game.description}</p>
              <Button
                onClick={handlePlay}
                className={`bg-gradient-to-r ${game.color} hover:scale-105 transition-transform text-sm md:text-lg px-6 md:px-8 py-2 md:py-3 w-full md:w-auto`}
              >
                <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Jogar Agora
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default GamesView;