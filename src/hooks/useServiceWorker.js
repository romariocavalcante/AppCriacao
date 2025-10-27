import { useState, useEffect } from 'react';

export const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [showReload, setShowReload] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar se o service worker é suportado
    if ('serviceWorker' in navigator) {
      // Registrar o service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);

          // Verificar se o app já está instalado
          if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
          }

          // Listener para atualizações do service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setShowReload(true);
              }
            });
          });

          // Listener para mudanças de estado
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Novo service worker ativo');
            setShowReload(false);
            setWaitingWorker(null);
          });
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }

    // Listener para status online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Função para atualizar o service worker
  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // Função para instalar o PWA
  const installPWA = async () => {
    if ('beforeinstallprompt' in window) {
      const promptEvent = window.deferredPrompt;
      if (promptEvent) {
        promptEvent.prompt();
        const result = await promptEvent.userChoice;
        if (result.outcome === 'accepted') {
          console.log('PWA instalado com sucesso!');
          setIsInstalled(true);
        }
        window.deferredPrompt = null;
      }
    }
  };

  // Função para solicitar permissão de notificação
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  // Função para enviar notificação
  const sendNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/icons/icon-192x192.svg',
        badge: '/icons/icon-72x72.svg',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    }
  };

  return {
    isOnline,
    isInstalled,
    showReload,
    updateServiceWorker,
    installPWA,
    requestNotificationPermission,
    sendNotification
  };
};
