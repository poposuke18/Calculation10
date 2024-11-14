// hooks/useSoundEffects.js
import { useEffect, useCallback } from 'react';

const useSoundEffects = () => {
  // AudioオブジェクトをプリロードするためのMap
  const audioMap = new Map();

  // 初期化時に全ての音声をプリロード
  useEffect(() => {
    const sounds = {
      click: new Audio('/sounds/click.mp3'),
      correct: new Audio('/sounds/correct.mp3'),
      fault: new Audio('/sounds/fault.mp3'),
      skip: new Audio('/sounds/skip.mp3'),
      clear: new Audio('/sounds/clear.mp3'),
    };

    // 各音声の音量を設定
    Object.values(sounds).forEach(audio => {
      audio.volume = 0.5; // 音量を50%に設定
    });

    // MapにAudioオブジェクトを格納
    Object.entries(sounds).forEach(([key, audio]) => {
      audioMap.set(key, audio);
    });

    // クリーンアップ
    return () => {
      audioMap.clear();
    };
  }, []);

  // 効果音を再生する関数
  const playSound = useCallback((soundName) => {
    const audio = audioMap.get(soundName);
    if (audio) {
      // 再生中の音声を最初から再生し直す
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error('Sound playback failed:', error);
      });
    }
  }, []);

  return { playSound };
};

export default useSoundEffects;