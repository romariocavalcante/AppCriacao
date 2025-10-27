import React from 'react';
import { motion } from 'framer-motion';
import { useUserStats } from '@/context/UseStatsContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { MapPin, AlertTriangle } from 'lucide-react';

function MapView() {
  const { completeMission } = useUserStats();

  const handleReportFocus = () => {
    completeMission(4); // Mission ID for reporting focus
    toast({
      title: "📍 Foco Reportado!",
      description: "Obrigado por ajudar a proteger nossa cidade!",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Mapa de Prevenção</h2>
        <p className="text-sm md:text-base text-gray-600">Monitore e reporte focos de dengue em Canaã dos Carajás</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="game-card p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 mr-2 text-red-500" />
            Reportar Foco
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Localização</label>
              <input 
                type="text" 
                placeholder="Ex: Rua das Flores, 123"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Foco</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base">
                <option>Água parada em recipiente</option>
                <option>Entulho acumulando água</option>
                <option>Caixa d'água descoberta</option>
                <option>Outro</option>
              </select>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-sm md:text-base py-2 md:py-3"
              onClick={handleReportFocus}
            >
              Reportar Foco
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="game-card p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mr-2 text-yellow-500" />
            Áreas de Atenção
          </h3>
          <div className="space-y-2 md:space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-yellow-800 text-sm md:text-base">Centro da Cidade</h4>
                  <p className="text-xs md:text-sm text-yellow-600">3 focos reportados</p>
                </div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
              </div>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-red-800 text-sm md:text-base">Bairro Jardim</h4>
                  <p className="text-xs md:text-sm text-red-600">5 focos reportados</p>
                </div>
                <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
              </div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-green-800 text-sm md:text-base">Vila Nova</h4>
                  <p className="text-xs md:text-sm text-green-600">Área segura</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card p-4 md:p-6"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Mapa Interativo</h3>
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-48 md:h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center px-4">
            <MapPin className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm md:text-base text-gray-500">Mapa interativo de Canaã dos Carajás</p>
            <p className="text-xs md:text-sm text-gray-400">Visualize focos e áreas de prevenção</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MapView;