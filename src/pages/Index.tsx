import React, { useState } from 'react';

const Index = () => {
  const [showScreamer, setShowScreamer] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleImageClick = () => {
    // Показываем скример
    setShowScreamer(true);
    
    // Воспроизводим звук скримера (если браузер позволяет)
    const audio = new Audio();
    audio.volume = 0.7;
    // Используем базовый звук или можно добавить свой
    
    // Через 2 секунды скрываем скример и начинаем редирект
    setTimeout(() => {
      setShowScreamer(false);
      setRedirecting(true);
      
      // Редирект на видео через 1 секунду
      setTimeout(() => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      }, 1000);
    }, 2000);
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
            src="/img/47ed1300-98ef-440e-bc34-d5a81a8632f1.jpg" 
            alt="Mysterious figure"
            className="max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Скример */}
      {showScreamer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-pulse">
          <div className="animate-bounce">
            <img 
              src="/img/c8ee72b9-5489-44fb-a5bd-9a48427d5acb.jpg"
              alt="Screamer"
              className="w-full h-full object-cover animate-shake"
              style={{
                animation: 'shake 0.1s infinite, scale-in 0.1s ease-out'
              }}
            />
          </div>
          
          {/* Звуковой эффект через веб-аудио */}
          <div className="absolute inset-0 bg-red-600 opacity-20 animate-pulse"></div>
        </div>
      )}

      {/* Сообщение о редиректе */}
      {redirecting && (
        <div className="text-red-500 text-2xl font-bold animate-fade-in text-center">
          <p className="mb-4">😱 GOTCHA!</p>
          <p className="text-lg">Перенаправляю на видео...</p>
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