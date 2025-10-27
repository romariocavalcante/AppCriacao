import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServiceWorker } from '@/hooks/useServiceWorker';

function PWAInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { isInstalled, installPWA } = useServiceWorker();

  useEffect(() => {
    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Mostrar banner após 3 segundos
      setTimeout(() => {
        if (!isInstalled) {
          setShowBanner(true);
        }
      }, 3000);
    };

    // Listener para app instalado
    const handleAppInstalled = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA instalado com sucesso!');
        setShowBanner(false);
      }
      
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Salvar no localStorage para não mostrar novamente por 24h
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  // Verificar se o banner foi descartado recentemente
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      const hoursSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60);
      
      if (hoursSinceDismissed < 24) {
        setShowBanner(false);
      }
    }
  }, []);

  if (!showBanner || isInstalled) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">
                  Instale o app Guardiões Contra a Dengue
                </p>
                <p className="text-xs opacity-90">
                  Acesso rápido e funcionalidade offline
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-white text-green-600 hover:bg-gray-100 text-xs px-3 py-1"
              >
                <Download className="w-4 h-4 mr-1" />
                Instalar
              </Button>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 text-xs p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PWAInstallBanner;
