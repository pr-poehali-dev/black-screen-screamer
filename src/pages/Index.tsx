import React, { useState, useEffect } from 'react';

const Index = () => {
  const [showScreamer, setShowScreamer] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Генерируем случайные позиции для глаз
  const generateEyes = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5-95% от ширины
      y: Math.random() * 90 + 5, // 5-95% от высоты
      size: Math.random() * 60 + 20, // 20-80px
      speedX: (Math.random() - 0.5) * 4, // скорость по X
      speedY: (Math.random() - 0.5) * 4, // скорость по Y
    }));
  };

  const [eyes, setEyes] = useState(generateEyes());

  // Анимация движения глаз
  useEffect(() => {
    if (!showScreamer) return;

    const interval = setInterval(() => {
      setEyes(prevEyes => 
        prevEyes.map(eye => ({
          ...eye,
          x: (eye.x + eye.speedX + 100) % 100,
          y: (eye.y + eye.speedY + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [showScreamer]);

  const handleImageClick = () => {
    // Показываем скример
    setShowScreamer(true);
    
    // Создаем громкий звук через Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Настройка звука
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Высокая частота
      gainNode.gain.setValueAtTime(0.8, audioContext.currentTime); // Громкость
      oscillator.type = 'sawtooth'; // Резкий звук
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 2); // 2 секунды звука
    } catch (error) {
      console.log('Audio not supported');
    }
    
    // Через 3 секунды скрываем скример и начинаем редирект
    setTimeout(() => {
      setShowScreamer(false);
      setRedirecting(true);
      
      // Редирект на видео через 1 секунду
      setTimeout(() => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      }, 1000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Основная картинка */}
      {!showScreamer && !redirecting && (
        <div 
          className="cursor-pointer transition-transform hover:scale-105 duration-300"
          onClick={handleImageClick}
        >
          <img 
            src="/img/60c46b3e-9988-4ec1-bb94-7c4d85ad2fdc.jpg" 
            alt="Inhuman eyes"
            className="max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Скример с бегающими глазами */}
      {showScreamer && (
        <div className="fixed inset-0 z-50 bg-white overflow-hidden">
          {eyes.map(eye => (
            <div
              key={eye.id}
              className="absolute transition-all duration-75 ease-linear"
              style={{
                left: `${eye.x}%`,
                top: `${eye.y}%`,
                width: `${eye.size}px`,
                height: `${eye.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-full h-full rounded-full bg-white border-4 border-red-600 flex items-center justify-center animate-pulse">
                <div className="w-1/2 h-1/2 bg-black rounded-full animate-ping"></div>
              </div>
            </div>
          ))}
          
          {/* Дополнительные жуткие эффекты */}
          <div className="absolute inset-0 animate-pulse bg-red-500 opacity-10"></div>
          <div className="absolute inset-0 animate-bounce bg-white opacity-90"></div>
        </div>
      )}

      {/* Скрытый текст-подсказка */}
      {!showScreamer && !redirecting && (
        <div className="absolute bottom-10 text-gray-700 text-sm animate-pulse">
          Нажми на картинку...
        </div>
      )}
    </div>
  );
};

export default Index;