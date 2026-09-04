import SosButton from './components/SosButton';
import WeatherAlert from './components/WeatherAlert';
import EarthquakeGuide from './components/EarthquakeGuide';
import EmergencyContacts from './components/EmergencyContacts';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 py-10">
      <h1 className="text-3xl font-black text-red-500 mb-1">
        विपद् रक्षा (Bipad Raksha)
      </h1>
      <p className="text-slate-400 text-center mb-6 max-w-xs text-xs">
        नेपालका ग्रामीण क्षेत्रका लागि अफलाइन-फर्स्ट आपत्कालीन सेवा
      </p>

      {/* मौसम तथा बाढी पूर्व-सूचना */}
      <WeatherAlert />

      {/* आपत्कालीन टेलिफोन डाइरेक्टरी */}
      <EmergencyContacts />

      {/* भूकम्प सुरक्षा निर्देशिका */}
      <EarthquakeGuide />

      {/* 1-Tap SOS Button */}
      <SosButton />
    </main>
  );
}