'use client';

import { useState, useEffect } from 'react';

export default function WeatherAlert() {
  const [rainData, setRainData] = useState<string>('तथ्याङ्क लोड हुँदैछ...');
  const [status, setStatus] = useState<'safe' | 'warning' | 'danger'>('safe');

  useEffect(() => {
    // Open-Meteo Free API (काठमाडौँ/नेपालको औसत अक्षांश-देशान्तर)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&hourly=rain')
      .then((res) => res.json())
      .then((data) => {
        const currentRain = data.hourly?.rain[0] || 0;
        if (currentRain > 10) {
          setStatus('danger');
          setRainData(`अत्यधिक वर्षा (${currentRain}mm/hr)! पहिरो र बाढीको उच्च जोखिम छ।`);
        } else if (currentRain > 2) {
          setStatus('warning');
          setRainData(`मध्यम वर्षा (${currentRain}mm/hr)। सतर्कता अपनाउनुहोस्।`);
        } else {
          setStatus('safe');
          setRainData(`सामान्य मौसम (${currentRain}mm/hr)। हाल बाढी/पहिरोको ठूलो जोखिम छैन।`);
        }
      })
      .catch(() => {
        setRainData('अहिले अफलाइन हुनुहुन्छ। अन्तिम प्राप्त मौसम विवरण सुरक्षित छ।');
      });
  }, []);

  const getBgColor = () => {
    if (status === 'danger') return 'bg-red-900/80 border-red-500';
    if (status === 'warning') return 'bg-yellow-900/80 border-yellow-500';
    return 'bg-emerald-900/80 border-emerald-500';
  };

  return (
    <div className={`w-full max-w-sm mx-auto p-4 rounded-2xl border-2 text-left mb-6 ${getBgColor()}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">🌧️</span>
        <h2 className="font-bold text-lg text-white">मौसम तथा बाढी पूर्व-सूचना</h2>
      </div>
      <p className="text-sm text-slate-200">{rainData}</p>
    </div>
  );
}