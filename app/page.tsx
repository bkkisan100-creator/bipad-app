"use client";

import { useEffect, useState } from "react";

type Language = "ne" | "en";

type SensorData = {
  rainfall: number;
  soilMoisture: number;
  groundMovement: number;
  porePressure: number;
  tilt: number;
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ne");

  const [sensor, setSensor] = useState<SensorData>({
    rainfall: 72,
    soilMoisture: 78,
    groundMovement: 4.2,
    porePressure: 38,
    tilt: 1.8,
  });

  const [risk, setRisk] = useState(72);
  const [alertActive, setAlertActive] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [sirenEnabled, setSirenEnabled] = useState(false);
  const [lastAlertTime, setLastAlertTime] = useState<string | null>(null);

  /* =========================
     LANGUAGE
  ========================= */

  const t =
    language === "ne"
      ? {
          online: "प्रणाली सञ्चालनमा छ",
          title: "पहिरो पूर्व चेतावनी प्रणाली",
          subtitle: "AI को सहयोगमा पहिरोको जोखिम निगरानी",

          location: "निगरानी भइरहेको क्षेत्र",
          demoArea: "उच्च जोखिमयुक्त पहिरो क्षेत्र — नमुना क्षेत्र",
          monitoring:
            "वर्षा, माटो र जमिनको अवस्था निरन्तर निगरानी भइरहेको छ।",

          risk: "पहिरोको जोखिम",
          outOf: "मध्ये",

          normal: "सामान्य",
          watch: "सावधानी",
          high: "उच्च जोखिम",
          critical: "अत्यधिक जोखिम",

          normalDesc: "अहिले तत्काल ठूलो खतरा देखिएको छैन।",
          watchDesc:
            "केही परिवर्तन देखिएको छ। अवस्था ध्यानपूर्वक निगरानी गर्नुहोस्।",
          highDesc:
            "पहिरोको जोखिम बढिरहेको छ। सावधानी अपनाउनुहोस्।",
          criticalDesc:
            "गम्भीर जोखिम देखिएको छ। सुरक्षित स्थानतर्फ जान तयार रहनुहोस्।",

          emergency: "आपतकालीन चेतावनी प्रणाली",
          emergencySub:
            "जोखिम अत्यधिक हुँदा सूचना र siren सक्रिय गर्न सकिन्छ।",

          enableNotification: "Notification खोल्नुहोस्",
          testSiren: "Siren Test",
          emergencyTest: "Emergency Test",

          notificationReady: "Notification तयार",
          notificationOff: "Notification बन्द",
          sirenActive: "Siren बजिरहेको छ",
          sirenReady: "Siren तयार छैन",

          sensorTitle: "अहिलेको अवस्था",
          sensorSub: "विभिन्न सेन्सरबाट आएको प्रत्यक्ष जानकारी",

          rainfall: "वर्षा",
          rainfallDesc: "पछिल्लो २४ घण्टामा परेको पानी",

          soil: "माटोको चिस्यान",
          soilDesc: "माटोमा कति पानी भरिएको छ",

          movement: "जमिनको movement",
          movementDesc: "जमिन कति सरेको छ",

          pressure: "भूमिगत पानीको दबाब",
          pressureDesc: "जमिनभित्र पानीको दबाब",

          tilt: "जमिनको ढल्काइ",
          tiltDesc: "जमिन वा पहाड कति ढल्किएको छ",

          ai: "AI को विश्लेषण",
          aiSub: "विभिन्न संकेतलाई जोडेर जोखिम मूल्याङ्कन",

          happening: "अहिले के भइरहेको छ?",

          rainfallReason:
            "वर्षाको मात्रा बढ्दा माटोमा पानी पस्न सक्छ र जमिन कमजोर हुन सक्छ।",

          soilReason:
            "माटो धेरै भिजेको अवस्थामा जमिनको स्थिरता घट्न सक्छ।",

          movementReason:
            "जमिन सामान्यभन्दा बढी सर्न थालेमा पहिरोको जोखिम बढ्न सक्छ।",

          pressureReason:
            "जमिनभित्र पानीको दबाब बढ्दा slope कमजोर हुन सक्छ।",

          action: "अब के गर्ने?",
          actionText:
            "जोखिमयुक्त क्षेत्रमा अनावश्यक रूपमा नजानुहोस् र स्थानीय अधिकारीलाई जानकारी दिनुहोस्।",

          levels: "जोखिमको स्तर",
          levelsSub: "रङ हेरेर अवस्था सजिलै बुझ्न सकिन्छ",

          normalMeaning: "सामान्य अवस्था",
          normalAction: "नियमित निगरानी गर्नुहोस्",

          watchMeaning: "केही परिवर्तन देखिएको अवस्था",
          watchAction: "सावधानीपूर्वक निगरानी गर्नुहोस्",

          highMeaning: "पहिरोको जोखिम बढेको अवस्था",
          highAction: "स्थानीय टोलीलाई जानकारी दिनुहोस्",

          criticalMeaning: "अत्यन्त गम्भीर अवस्था",
          criticalAction:
            "सुरक्षित स्थानतर्फ जान तयार रहनुहोस्",

          locations: "निगरानी क्षेत्रहरू",

          safe: "सामान्य",
          monitoringStatus: "निगरानी",
          danger: "उच्च जोखिम",

          important: "महत्वपूर्ण जानकारी",
          importantText:
            "यो प्रणालीले पहिरो १००% निश्चित रूपमा भविष्यवाणी गर्दैन। यसले विभिन्न संकेतहरू हेरेर जोखिम बढेको अवस्थामा चाँडै चेतावनी दिन सहयोग गर्छ।",

          demo: "डेमो मोड",
          simulated: "देखाइएको data परीक्षणका लागि simulated हो",

          alertTitle: "आपतकालीन चेतावनी!",
          alertText:
            "पहिरोको जोखिम अत्यधिक देखिएको छ। कृपया जोखिमयुक्त क्षेत्रबाट टाढा रहनुहोस्।",
          dismiss: "Alert बन्द गर्नुहोस्",
          sirenTest: "Siren परीक्षण सुरु भयो",
          notificationSuccess: "Notification सफल भयो",
        }
      : {
          online: "System Online",
          title: "Landslide Early Warning System",
          subtitle: "AI-assisted landslide risk monitoring",

          location: "Monitoring Location",
          demoArea: "High Risk Slope — Demo Area",
          monitoring:
            "Rainfall, soil and ground conditions are being monitored continuously.",

          risk: "Landslide Risk",
          outOf: "out of",

          normal: "NORMAL",
          watch: "WATCH",
          high: "HIGH RISK",
          critical: "CRITICAL",

          normalDesc: "No immediate major danger detected.",
          watchDesc:
            "Some changes have been detected. Monitor the area carefully.",
          highDesc:
            "Landslide risk is increasing. Take necessary precautions.",
          criticalDesc:
            "Serious risk detected. Prepare to move to a safe location.",

          emergency: "Emergency Alert System",
          emergencySub:
            "Notification and siren can be activated when critical risk is detected.",

          enableNotification: "Enable Notification",
          testSiren: "Test Siren",
          emergencyTest: "Emergency Test",

          notificationReady: "Notification Ready",
          notificationOff: "Notification Off",
          sirenActive: "Siren Active",
          sirenReady: "Siren Ready",

          sensorTitle: "Current Conditions",
          sensorSub: "Live information from monitoring sensors",

          rainfall: "Rainfall",
          rainfallDesc: "Amount of rain received in the last 24 hours",

          soil: "Soil Moisture",
          soilDesc: "How much water is currently inside the soil",

          movement: "Ground Movement",
          movementDesc: "How much the ground has moved",

          pressure: "Pore Water Pressure",
          pressureDesc: "Water pressure inside the ground",

          tilt: "Ground Tilt",
          tiltDesc: "How much the ground or slope is tilting",

          ai: "AI Analysis",
          aiSub: "Risk assessment using multiple environmental signals",

          happening: "What is happening?",

          rainfallReason:
            "Heavy rainfall can increase water inside the soil and weaken the slope.",

          soilReason:
            "Very wet soil can reduce the stability of the ground.",

          movementReason:
            "Increasing ground movement may indicate that the slope is becoming unstable.",

          pressureReason:
            "Increasing underground water pressure can weaken the slope.",

          action: "What should you do?",
          actionText:
            "Avoid unnecessary travel into the risk area and inform the local response team.",

          levels: "Risk Levels",
          levelsSub:
            "The colors make the current condition easy to understand",

          normalMeaning: "Normal condition",
          normalAction: "Continue regular monitoring",

          watchMeaning: "Some changes detected",
          watchAction: "Monitor carefully",

          highMeaning: "Landslide risk increasing",
          highAction: "Inform local response team",

          criticalMeaning: "Very serious condition",
          criticalAction: "Prepare to move to a safe location",

          locations: "Monitoring Areas",

          safe: "Normal",
          monitoringStatus: "Watch",
          danger: "High Risk",

          important: "Important Information",
          importantText:
            "This system cannot predict landslides with 100% certainty. It combines different signals to help identify increasing risk and provide early warning.",

          demo: "Demo Mode",
          simulated: "The data shown here is simulated for testing",

          alertTitle: "EMERGENCY ALERT!",
          alertText:
            "Critical landslide risk has been detected. Please stay away from the risk area.",
          dismiss: "Dismiss Alert",
          sirenTest: "Siren test started",
          notificationSuccess: "Notification enabled successfully",
        };

  /* =========================
     SIMULATED SENSOR DATA
  ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setSensor((prev) => ({
        rainfall: Math.max(
          0,
          Number(
            (prev.rainfall + (Math.random() - 0.45) * 4).toFixed(1)
          )
        ),

        soilMoisture: Math.min(
          100,
          Math.max(
            0,
            Number(
              (
                prev.soilMoisture +
                (Math.random() - 0.45) * 2
              ).toFixed(1)
            )
          )
        ),

        groundMovement: Math.max(
          0,
          Number(
            (
              prev.groundMovement +
              (Math.random() - 0.45) * 0.5
            ).toFixed(2)
          )
        ),

        porePressure: Math.max(
          0,
          Number(
            (
              prev.porePressure +
              (Math.random() - 0.45) * 2
            ).toFixed(1)
          )
        ),

        tilt: Math.max(
          0,
          Number(
            (
              prev.tilt +
              (Math.random() - 0.45) * 0.15
            ).toFixed(2)
          )
        ),
      }));

      setRisk((prev) =>
        Math.min(
          100,
          Math.max(
            0,
            Math.round(
              prev + (Math.random() - 0.45) * 3
            )
          )
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     RISK STATUS
  ========================= */

  const getRiskStatus = () => {
    if (risk >= 80) {
      return {
        label: t.critical,
        description: t.criticalDesc,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/40",
        bar: "bg-red-500",
      };
    }

    if (risk >= 60) {
      return {
        label: t.high,
        description: t.highDesc,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/40",
        bar: "bg-orange-500",
      };
    }

    if (risk >= 30) {
      return {
        label: t.watch,
        description: t.watchDesc,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/40",
        bar: "bg-yellow-400",
      };
    }

    return {
      label: t.normal,
      description: t.normalDesc,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/40",
      bar: "bg-green-500",
    };
  };

  const status = getRiskStatus();

  /* =========================
     NOTIFICATION
  ========================= */

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Browser notification is not supported.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setNotificationEnabled(true);

      new Notification("BIPATRAKSHYA", {
        body: t.notificationSuccess,
      });
    }
  };

  /* =========================
     EMERGENCY ALERT
  ========================= */

  const triggerEmergencyAlert = () => {
    const now = new Date();

    setAlertActive(true);
    setLastAlertTime(now.toLocaleTimeString());

    if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(
        "🚨 BIPATRAKSHYA EMERGENCY ALERT",
        {
          body: t.alertText,
        }
      );
    }
  };

  /* =========================
     SIREN SIMULATION
  ========================= */

  const startSirenSimulation = () => {
    if (sirenEnabled) return;

    setSirenEnabled(true);

    alert(t.sirenTest);

    const audioContext = new AudioContext();

    let high = false;

    const siren = setInterval(() => {
      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.type = "sawtooth";

      oscillator.frequency.value =
        high ? 900 : 500;

      gain.gain.value = 0.08;

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
      }, 400);

      high = !high;
    }, 450);

    setTimeout(() => {
      clearInterval(siren);

      audioContext.close();

      setSirenEnabled(false);
    }, 10000);
  };

  /* =========================
     AUTOMATIC ALERT
  ========================= */

  useEffect(() => {
    if (risk >= 80 && !alertActive) {
      triggerEmergencyAlert();
    }
  }, [risk]);

  /* =========================
     SENSOR CARDS
  ========================= */

  const sensors = [
    {
      name: t.rainfall,
      description: t.rainfallDesc,
      value: sensor.rainfall,
      unit: "mm / 24h",
      icon: "🌧️",
    },
    {
      name: t.soil,
      description: t.soilDesc,
      value: sensor.soilMoisture,
      unit: "%",
      icon: "💧",
    },
    {
      name: t.movement,
      description: t.movementDesc,
      value: sensor.groundMovement,
      unit: "mm",
      icon: "📏",
    },
    {
      name: t.pressure,
      description: t.pressureDesc,
      value: sensor.porePressure,
      unit: "kPa",
      icon: "🌊",
    },
    {
      name: t.tilt,
      description: t.tiltDesc,
      value: sensor.tilt,
      unit: "°",
      icon: "📐",
    },
  ];

  return (
    <main className="min-h-screen bg-[#06080c] text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090c11]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">

          <div>
            <h1 className="text-xl font-black sm:text-2xl">
              BIPATRAKSHYA
            </h1>

            <p className="text-xs text-gray-400 sm:text-sm">
              {t.title}
            </p>

            <p className="hidden text-xs text-gray-600 sm:block">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* LANGUAGE */}

            <div className="flex rounded-full border border-white/10 bg-white/5 p-1">

              <button
                onClick={() => setLanguage("ne")}
                className={`rounded-full px-3 py-2 text-xs font-bold ${
                  language === "ne"
                    ? "bg-white text-black"
                    : "text-gray-400"
                }`}
              >
                नेपाली
              </button>

              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-2 text-xs font-bold ${
                  language === "en"
                    ? "bg-white text-black"
                    : "text-gray-400"
                }`}
              >
                English
              </button>

            </div>

            {/* ONLINE */}

            <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs text-green-300">
                {t.online}
              </span>
            </div>

          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">

        {/* LOCATION */}

        <div className="mb-7">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            {t.location}
          </p>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            {t.demoArea}
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
            {t.monitoring}
          </p>

        </div>

        {/* ================= EMERGENCY CONTROL ================= */}

        <div className="mb-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  🚨
                </span>

                <div>

                  <h3 className="text-lg font-bold text-red-400">
                    {t.emergency}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {t.emergencySub}
                  </p>

                </div>

              </div>

              <div className="mt-4 flex flex-wrap gap-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    notificationEnabled
                      ? "bg-green-500/10 text-green-400"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  📱{" "}
                  {notificationEnabled
                    ? t.notificationReady
                    : t.notificationOff}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    sirenEnabled
                      ? "bg-red-500/10 text-red-400"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  🔊{" "}
                  {sirenEnabled
                    ? t.sirenActive
                    : t.sirenReady}
                </span>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={enableNotifications}
                className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-bold text-blue-300 hover:bg-blue-500/20"
              >
                📱 {t.enableNotification}
              </button>

              <button
                onClick={startSirenSimulation}
                disabled={sirenEnabled}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 disabled:opacity-50"
              >
                🔊 {t.testSiren}
              </button>

              <button
                onClick={triggerEmergencyAlert}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-black hover:bg-red-500"
              >
                🚨 {t.emergencyTest}
              </button>

            </div>

          </div>

        </div>

        {/* ================= EMERGENCY ALERT ================= */}

        {alertActive && (

          <div className="mb-8 animate-pulse rounded-3xl border-2 border-red-500 bg-red-500/10 p-6 shadow-[0_0_50px_rgba(239,68,68,0.15)]">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="text-4xl">
                  🚨
                </div>

                <div>

                  <h2 className="text-2xl font-black text-red-400">
                    {t.alertTitle}
                  </h2>

                  <p className="mt-2 font-bold">
                    {t.alertText}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {t.actionText}
                  </p>

                  {lastAlertTime && (
                    <p className="mt-2 text-xs text-red-300">
                      {language === "ne"
                        ? `चेतावनी समय: ${lastAlertTime}`
                        : `Alert time: ${lastAlertTime}`}
                    </p>
                  )}

                </div>

              </div>

              <button
                onClick={() => setAlertActive(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300"
              >
                {t.dismiss}
              </button>

            </div>

          </div>

        )}

        {/* ================= RISK ================= */}

        <div
          className={`mb-8 rounded-3xl border ${status.border} ${status.bg} p-5 sm:p-8`}
        >

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-bold text-gray-400">
                {t.risk}
              </p>

              <div className="mt-2 flex items-end gap-3">

                <span
                  className={`text-6xl font-black sm:text-7xl ${status.color}`}
                >
                  {risk}
                </span>

                <span className="mb-2 text-sm text-gray-500">
                  {t.outOf} 100
                </span>

              </div>

              <p
                className={`mt-1 text-xl font-black ${status.color}`}
              >
                {status.label}
              </p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
                {status.description}
              </p>

            </div>

            <div className="w-full lg:max-w-lg">

              <div className="mb-2 flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>

              <div className="h-5 overflow-hidden rounded-full bg-white/10">

                <div
                  className={`h-full ${status.bar} transition-all duration-700`}
                  style={{
                    width: `${risk}%`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span>🟢 {t.normal}</span>
                <span>🟡 {t.watch}</span>
                <span>🔴 {t.critical}</span>
              </div>

            </div>

          </div>

        </div>

        {/* ================= SENSOR DATA ================= */}

        <div className="mb-10">

          <div className="mb-5">

            <h3 className="text-xl font-black">
              {t.sensorTitle}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {t.sensorSub}
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {sensors.map((item) => (

              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-[#0c1016] p-5 transition hover:border-white/20"
              >

                <div className="flex items-start justify-between">

                  <span className="text-3xl">
                    {item.icon}
                  </span>

                  <span className="mt-2 h-2 w-2 animate-pulse rounded-full bg-green-400" />

                </div>

                <h4 className="mt-5 font-bold">
                  {item.name}
                </h4>

                <p className="mt-1 min-h-[40px] text-xs leading-5 text-gray-500">
                  {item.description}
                </p>

                <div className="mt-4">

                  <span className="text-3xl font-black">
                    {item.value}
                  </span>

                  <span className="ml-1 text-xs text-gray-500">
                    {item.unit}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ================= AI ANALYSIS ================= */}

        <div className="mb-8 grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-[#0c1016] p-6 lg:col-span-2 sm:p-7">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
                🧠
              </div>

              <div>

                <h3 className="text-lg font-bold">
                  {t.ai}
                </h3>

                <p className="text-sm text-gray-500">
                  {t.aiSub}
                </p>

              </div>

            </div>

            <div className="mt-7">

              <h4 className="mb-3 font-bold">
                {t.happening}
              </h4>

              <div className="space-y-3">

                <Reason
                  icon="🌧️"
                  text={t.rainfallReason}
                />

                <Reason
                  icon="💧"
                  text={t.soilReason}
                />

                <Reason
                  icon="📏"
                  text={t.movementReason}
                />

                <Reason
                  icon="🌊"
                  text={t.pressureReason}
                />

              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

              <p className="font-bold text-orange-400">
                ⚠️ {t.action}
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-300">
                {t.actionText}
              </p>

            </div>

          </div>

          {/* ================= ALERT LEVELS ================= */}

          <div className="rounded-3xl border border-white/10 bg-[#0c1016] p-6 sm:p-7">

            <h3 className="text-lg font-bold">
              {t.levels}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {t.levelsSub}
            </p>

            <div className="mt-6 space-y-3">

              <Level
                icon="🟢"
                title={t.normal}
                range="0–29"
                meaning={t.normalMeaning}
                action={t.normalAction}
                color="green"
              />

              <Level
                icon="🟡"
                title={t.watch}
                range="30–59"
                meaning={t.watchMeaning}
                action={t.watchAction}
                color="yellow"
              />

              <Level
                icon="🟠"
                title={t.high}
                range="60–79"
                meaning={t.highMeaning}
                action={t.highAction}
                color="orange"
              />

              <Level
                icon="🔴"
                title={t.critical}
                range="80–100"
                meaning={t.criticalMeaning}
                action={t.criticalAction}
                color="red"
              />

            </div>

          </div>

        </div>

        {/* ================= LOCATIONS ================= */}

        <div className="mb-8 rounded-3xl border border-white/10 bg-[#0c1016] p-6 sm:p-7">

          <h3 className="text-lg font-bold">
            {t.locations}
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <Location
              name={language === "ne" ? "वडा नं. १" : "Ward No. 1"}
              status={t.safe}
              color="green"
            />

            <Location
              name={language === "ne" ? "वडा नं. ३" : "Ward No. 3"}
              status={t.monitoringStatus}
              color="yellow"
            />

            <Location
              name={language === "ne" ? "वडा नं. ५" : "Ward No. 5"}
              status={t.danger}
              color="orange"
            />

            <Location
              name={language === "ne" ? "वडा नं. ७" : "Ward No. 7"}
              status={t.safe}
              color="green"
            />

          </div>

        </div>

        {/* ================= IMPORTANT ================= */}

        <div className="mb-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6">

          <div className="flex gap-4">

            <div className="text-2xl">
              ℹ️
            </div>

            <div>

              <h3 className="font-bold text-blue-300">
                {t.important}
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-400">
                {t.importantText}
              </p>

            </div>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <footer className="border-t border-white/10 pt-6 text-xs text-gray-600">

          <div className="flex flex-col justify-between gap-3 sm:flex-row">

            <span>
              BIPATRAKSHYA • {t.title}
            </span>

            <span>
              {t.demo} • {t.simulated}
            </span>

          </div>

        </footer>

      </section>

    </main>
  );
}

/* =========================
   REASON COMPONENT
========================= */

function Reason({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm leading-6 text-gray-300">
        {icon} {text}
      </p>
    </div>
  );
}

/* =========================
   LEVEL COMPONENT
========================= */

function Level({
  icon,
  title,
  range,
  meaning,
  action,
  color,
}: {
  icon: string;
  title: string;
  range: string;
  meaning: string;
  action: string;
  color: "green" | "yellow" | "orange" | "red";
}) {
  const styles = {
    green: "border-green-500/20 bg-green-500/5 text-green-400",
    yellow: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
    orange: "border-orange-500/20 bg-orange-500/5 text-orange-400",
    red: "border-red-500/20 bg-red-500/5 text-red-400",
  };

  return (
    <div
      className={`rounded-2xl border p-4 ${styles[color]}`}
    >
      <div className="flex items-center justify-between">

        <p className="font-bold">
          {icon} {title}
        </p>

        <span className="text-xs text-gray-500">
          {range}
        </span>

      </div>

      <p className="mt-2 text-xs text-gray-500">
        {meaning}
      </p>

      <p className="mt-1 text-xs">
        → {action}
      </p>

    </div>
  );
}

/* =========================
   LOCATION COMPONENT
========================= */

function Location({
  name,
  status,
  color,
}: {
  name: string;
  status: string;
  color: "green" | "yellow" | "orange";
}) {
  const styles = {
    green: {
      dot: "bg-green-400",
      text: "text-green-400",
      border: "border-green-500/20",
      bg: "bg-green-500/5",
    },

    yellow: {
      dot: "bg-yellow-400",
      text: "text-yellow-400",
      border: "border-yellow-500/20",
      bg: "bg-yellow-500/5",
    },

    orange: {
      dot: "bg-orange-400",
      text: "text-orange-400",
      border: "border-orange-500/20",
      bg: "bg-orange-500/5",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border ${style.border} ${style.bg} p-4`}
    >

      <div>

        <p className="font-semibold">
          {name}
        </p>

        <p className={`mt-1 text-xs ${style.text}`}>
          {status}
        </p>

      </div>

      <span
        className={`h-3 w-3 rounded-full ${style.dot}`}
      />

    </div>
  );
}