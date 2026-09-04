'use client';

import { useState, useEffect } from 'react';
import SosButton from './components/SosButton';
import WeatherAlert from './components/WeatherAlert';
import EarthquakeGuide from './components/EarthquakeGuide';
import EmergencyContacts from './components/EmergencyContacts';

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 pb-12 font-sans flex flex-col items-center">
      {/* Header */}
      <header className="text-center my-6 max-w-sm w-full">
        <h1 className="text-2xl font-black text-red-500 tracking-wide flex items-center justify-center gap-2">
          <span>विपद् रक्षा</span>
          <span className="text-xs bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded-full font-mono">
            (Bipad Raksha)
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          नेपालका ग्रामीण क्षेत्रका लागि अफलाइन-फर्स्ट आपत्कालीन सेवा
        </p>
      </header>

      {/* 📲 Install App Banner (इन्स्टल गर्न मिल्ने भएपछि मात्र देखिने) */}
      {isInstallable && (
        <div className="w-full max-w-sm mb-6 bg-gradient-to-r from-emerald-600 to-teal-700 p-4 rounded-2xl shadow-lg border border-emerald-400/30 text-center animate-bounce">
          <p className="text-xs font-semibold text-emerald-100 mb-2">
            इन्टरनेट बिना पनि प्रयोग गर्न एप इन्स्टल गर्नुहोस्
          </p>
          <button
            onClick={handleInstallClick}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 active:scale-95 text-emerald-950 font-bold rounded-xl text-sm shadow transition-all flex items-center justify-center gap-2"
          >
            <span>📲</span> मोबाइलमा एप इन्स्टल गर्नुहोस्
          </button>
        </div>
      )}

      {/* Main Feature Components */}
      <div className="w-full max-w-sm space-y-4">
        <WeatherAlert />
        <EmergencyContacts />
        <EarthquakeGuide />
        <SosButton />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-[10px] text-slate-500 max-w-sm w-full">
        <p>Bipad Raksha - Offline PWA | Emergency Assistance for Nepal</p>
      </footer>
    </main>
  );
}