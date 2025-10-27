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
    games: 'Jogos',
    knowledge: 'Aprenda+',
    challenges: 'Desafios'
  },
  home: {
    title: 'Guardiões Contra a Dengue',
    intro: 'Junte-se à missão de proteger Canaã dos Carajás! Complete desafios, aprenda sobre prevenção e torne-se um herói da saúde.',
    heroImage: 'https://images.unsplash.com/photo-1591169556548-21fee665ffae'
  },
  knowledge: {
    videoUrl: 'https://www.youtube.com/embed/8ZK_S-7yQd8',
    modelPath: '/mosquito.glb'
  }
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
