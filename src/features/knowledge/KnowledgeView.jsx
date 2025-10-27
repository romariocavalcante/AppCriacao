import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Library, Video, FileText, BarChart, Info } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

function Model({ path, ...props }) {
  const { nodes, materials } = useGLTF(path || '/mosquito.glb');
  return (
    <group {...props} dispose={null} scale={0.2} position={[0, -1, 0]}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.defaultMat} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

const knowledgeItems = [
  {
    title: 'Ciclo de Vida do Aedes',
    icon: BarChart,
    description: 'Entenda as fases do mosquito, do ovo ao adulto.',
  },
  {
    title: 'Sintomas e Tratamento',
    icon: FileText,
    description: 'Saiba como identificar os sinais da dengue e o que fazer.',
  },
  {
    title: 'Vídeos Educativos',
    icon: Video,
    description: 'Assista a vídeos curtos e didáticos sobre a prevenção.',
  }
];

const topics = [
  {
    title: 'Ciclo de Vida do Aedes',
    icon: BarChart,
    content:
      'O Aedes aegypti passa por quatro fases: ovo, larva, pupa e adulto. Ele prefere água parada e limpa para se reproduzir. Eliminar criadouros interrompe esse ciclo.',
  },
  {
    title: 'Sintomas e Tratamento',
    icon: FileText,
    content:
      'Principais sintomas: febre alta, dor no corpo e atrás dos olhos, manchas vermelhas e cansaço. Hidratação é essencial e anti-inflamatórios devem ser evitados sem orientação médica.',
  },
  {
    title: 'Como Prevenir em Casa',
    icon: Library,
    content:
      'Mantenha caixas d’água tampadas, limpe calhas, descarte pneus e garrafas corretamente e troque a água de plantas por areia. Um check-list semanal ajuda muito.',
  },
];

function KnowledgeView() {
  const [openIndex, setOpenIndex] = useState(null);
  const { content } = useContent();
  const modelPath = (content && content.knowledge && content.knowledge.modelPath) || '/mosquito.glb';
  const videoUrl = (content && content.knowledge && content.knowledge.videoUrl) || 'https://www.youtube.com/embed/8ZK_S-7yQd8';

  useEffect(() => {
    try {
      useGLTF.preload(modelPath);
    } catch (e) {
      // ignore preload errors
    }
  }, [modelPath]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold gradient-text mb-4">Biblioteca do Conhecimento</h2>
        <p className="text-gray-600">Aprenda tudo sobre o Aedes aegypti e a dengue.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="game-card h-96 lg:h-auto"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-500" />
            Mosquito em 3D
          </h3>
          <p className="text-sm text-gray-500 mb-2">Interaja com o modelo para ver os detalhes do Aedes aegypti.</p>
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Model path={modelPath} />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
          </div>
        </motion.div>
        
        <div className="space-y-6">
          {topics.map((topic, index) => {
            const IconComponent = topic.icon;
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="game-card !p-4"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{topic.title}</h4>
                      <p className="text-gray-600 text-sm hidden sm:block">Clique para {isOpen ? 'recolher' : 'ver mais'}.</p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                    {topic.content}
                  </div>
                )}
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="game-card !p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-lg">Vídeo educativo</h4>
            </div>
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
              <iframe
                title="Como prevenir a dengue"
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeView;