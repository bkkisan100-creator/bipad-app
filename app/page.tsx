import SosButton from './components/SosButton';
import WeatherAlert from './components/WeatherAlert';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-black text-red-500 mb-1">
        विपद् रक्षा (Bipad Raksha)
      </h1>
      <p className="text-slate-400 text-center mb-6 max-w-xs text-xs">
        नेपालका ग्रामीण क्षेत्रका लागि अफलाइन-फर्स्ट आपत्कालीन सेवा
      </p>

      {/* मौसम तथा बाढी पूर्व-सूचना कार्ड */}
      <WeatherAlert />

      {/* 1-Tap SOS Button */}
      <SosButton />
    </main>
  );
}