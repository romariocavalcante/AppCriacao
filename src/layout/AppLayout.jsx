import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Home, BookOpen, Trophy, Bug, Users, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useContent } from '@/context/ContentContext';

function AppLayout({ currentView, setCurrentView, children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { content } = useContent();

  const labels = (content && content.navLabels) || {};

  const navigationItems = [
    { id: 'home', label: labels.home || 'Início', icon: Home },
  { id: 'quiz', label: labels.quiz || 'Quiz', icon: BookOpen },
  { id: 'achievements', label: labels.achievements || 'Conquistas', icon: Trophy },
  { id: 'challenges', label: labels.challenges || 'Desafios', icon: Users },
  ];

  return (
    <div className="min-h-screen mosquito-pattern flex flex-col">
      <Helmet>
        <title>{(content && content.appName) ? `${content.appName} - Canaã dos Carajás` : 'Guardiões Contra a Dengue - Canaã dos Carajás'}</title>
        <meta name="description" content={(content && content.home && content.home.intro) || 'Aplicativo educativo de prevenção da dengue para estudantes de Canaã dos Carajás. Aprenda, jogue e proteja sua cidade!'} />
        <meta property="og:title" content={(content && content.appName) || 'Guardiões Contra a Dengue - Canaã dos Carajás'} />
        <meta property="og:description" content={(content && content.home && content.home.intro) || 'Aplicativo educativo de prevenção da dengue para estudantes de Canaã dos Carajás. Aprenda, jogue e proteja sua cidade!'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                {content && content.logoUrl ? (
                  <img src={content.logoUrl} alt="logo" className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" />
                ) : (
                  <Shield className="w-4 h-4 md:w-6 md:h-6 text-white" />
                )}
              </div>
              <span className="text-lg md:text-xl font-bold gradient-text">{(content && content.appName) || 'Guardiões'}</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-2 ${
                    currentView === item.id 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                      : 'hover:bg-green-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-green-200 bg-white/95 backdrop-blur-sm"
          >
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full justify-start ${
                    currentView === item.id 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                      : 'hover:bg-green-50'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-8 pb-20 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-green-200 z-50">
        <div className="flex justify-around py-2">
          {navigationItems.slice(0, 5).map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 min-w-0 ${
                currentView === item.id 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-green-200 mt-8 md:mt-16 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              <span className="text-base md:text-lg font-semibold text-green-800">
                Juntos na Trilha da Fé
              </span>
            </div>
            <p className="text-sm md:text-base text-gray-600">
              Aplicativo educativo para estudos bíblicos, meditação e prática diária dos ensinamentos.
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-1 md:space-y-0 md:space-x-6 text-xs md:text-sm text-gray-500">
              <span>Igreja Local</span>
              <span className="hidden md:inline">•</span>
              <span>Grupo de Estudos</span>
              <span className="hidden md:inline">•</span>
              <span>Comunidade</span>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default AppLayout;