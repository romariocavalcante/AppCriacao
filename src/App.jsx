import React, { useState, useEffect } from 'react';
import { UserStatsProvider } from '@/context/UseStatsContext';
import { ContentProvider } from '@/context/ContentContext';
import AppLayout from '@/layout/AppLayout';
import HomeView from '@/features/home/HomeView';
import QuizView from '@/features/quiz/QuizView';
import AchievementsView from '@/features/achievements/AchievementsView';
import ChallengesView from '@/features/challenges/ChallengesView';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { toast } from '@/components/ui/use-toast';
import AdminView from '@/features/admin/AdminView';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const { isOnline, showReload, updateServiceWorker, sendNotification } = useServiceWorker();

  // Verificar parâmetros da URL para shortcuts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam && ['home', 'quiz', 'achievements', 'challenges', 'admin'].includes(viewParam)) {
      setCurrentView(viewParam);
    }
  }, []);

  // Mostrar notificação quando ficar offline
  useEffect(() => {
    if (!isOnline) {
      toast({
        title: "📱 Modo Offline",
        description: "Algumas funcionalidades podem estar limitadas",
      });
    }
  }, [isOnline]);

  // Função para enviar notificação de missão diária
  const sendDailyMissionNotification = () => {
    sendNotification('🎯 Nova Missão Diária!', {
      body: 'Complete suas missões de hoje e ganhe pontos extras!',
      tag: 'daily-mission',
      requireInteraction: false,
    });
  };

  // Enviar notificação de missão diária às 9h
  useEffect(() => {
    const now = new Date();
    const nineAM = new Date();
    nineAM.setHours(9, 0, 0, 0);
    
    const timeUntilNineAM = nineAM.getTime() - now.getTime();
    
    if (timeUntilNineAM > 0) {
      setTimeout(() => {
        sendDailyMissionNotification();
      }, timeUntilNineAM);
    }
  }, []);

  return (
    <ContentProvider>
      <UserStatsProvider>
      <PWAInstallBanner />
      
      {/* Banner de atualização do Service Worker */}
      {showReload && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-yellow-500 text-white text-center py-2 px-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm">Nova versão disponível!</span>
            <button
              onClick={updateServiceWorker}
              className="bg-white text-yellow-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
            >
              Atualizar
            </button>
          </div>
        </div>
      )}

      <AppLayout currentView={currentView} setCurrentView={setCurrentView}>
        {currentView === 'home' && <HomeView />}
        {currentView === 'quiz' && <QuizView />}
        {currentView === 'achievements' && <AchievementsView />}
  { /* games and knowledge views removed */ }
        {currentView === 'challenges' && <ChallengesView />}
        {currentView === 'admin' && <AdminView />}
      </AppLayout>
      </UserStatsProvider>
    </ContentProvider>
  );
}

export default App;