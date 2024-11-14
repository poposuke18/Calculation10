// contexts/SoundContext.js
"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [audioElements, setAudioElements] = useState({});

  // 音声ファイルを初期化する関数
  const initializeAudio = useCallback(() => {
    const sounds = {
      click: new Audio('/sounds/click.mp3'),
      correct: new Audio('/sounds/correct.mp3'),
      fault: new Audio('/sounds/fault.mp3'),
      skip: new Audio('/sounds/skip.mp3'),
      clear: new Audio('/sounds/clear.mp3'),
    };

    // 各音声の音量を設定
    Object.values(sounds).forEach(audio => {
      audio.volume = 0.5;
    });

    setAudioElements(sounds);
    setIsSoundEnabled(true);
  }, []);

  // 効果音を再生する関数
  const playSound = useCallback((soundName) => {
    if (isSoundEnabled && audioElements[soundName]) {
      const audio = audioElements[soundName];
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error('Sound playback failed:', error);
      });
    }
  }, [isSoundEnabled, audioElements]);

  // 音声のオン/オフを切り替える関数
  const toggleSound = useCallback(() => {
    if (!isSoundEnabled) {
      initializeAudio();
    } else {
      setIsSoundEnabled(false);
    }
  }, [isSoundEnabled, initializeAudio]);

  return (
    <SoundContext.Provider value={{ 
      isSoundEnabled, 
      playSound, 
      toggleSound,
      initializeAudio 
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);