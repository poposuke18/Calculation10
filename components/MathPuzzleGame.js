// components/MathPuzzleGame.js
"use client";

import { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';
import Button from './Button';
import ScoreInput from './ScoreInput';
import Card from './Card';
import { evaluateExpression, extractNumbersFromExpression, areArraysEqual } from '../lib/mathUtils';
import ConfirmButton from './ConfirmButton';


const MathPuzzleGame = () => {
  const [numbers, setNumbers] = useState([]);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [expression, setExpression] = useState('');
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [skippedCount, setSkippedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { isSoundEnabled, playSound, toggleSound } = useSound();
  const [showScoreInput, setShowScoreInput] = useState(false);

  // ゲーム開始時の処理
  const handleStartGame = () => {
    setGameStarted(true);
    setTimeLeft(90);
    setScore(0);
    setSkippedCount(0);
    setIsPlaying(true);
    generateNumbers();
  };

  const handleConfirmedRestart = () => {
    setGameStarted(false);
    setTimeLeft(90);
    setScore(0);
    setSkippedCount(0);
    setIsPlaying(true);
    setExpression('');
    setError('');
    setUsedNumbers([]);
    setIsCorrect(false);
  };

  const handleScoreSubmit = async (name) => {
    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      });
      
      setShowScoreInput(false);
      handleRestart();
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  useEffect(() => {
    // ゲームが開始されていない場合は、タイマーを動かさない
    if (!gameStarted || !isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, gameStarted]);

  // 時間切れ処理
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setShowScoreInput(true);
    }
  }, [timeLeft]);

  // リスタート機能
  const handleRestart = () => {
    setGameStarted(false);
    setTimeLeft(90);
    setScore(0);
    setSkippedCount(0);
    setIsPlaying(true);
  };

  const generateNumbers = () => {
    const newNumbers = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    setNumbers(newNumbers);
    setExpression('');
    setError('');
    setUsedNumbers([]);
    setIsCorrect(false);
    setIsCalculating(false); // 状態をリセット
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const handleNumberClick = (number, index) => {
    if (!usedNumbers.includes(index)) {
      playSound('click');
      setExpression(prev => 
        prev + (prev.length && !prev.endsWith(' ') ? ' ' : '') + number
      );
      setUsedNumbers(prev => [...prev, index]);
      setError('');
    }
  };

  const handleOperatorClick = (operator) => {
    playSound('click');
    setExpression(prev => 
      prev + (prev.endsWith(' ') || prev.length === 0 ? '' : ' ') + 
      operator + 
      (operator === '(' || operator === ')' ? '' : ' ')
    );
    setError('');
  };

  const handleSkip = () => {
    playSound('skip');
    setSkippedCount(prev => prev + 1);
    setTimeLeft(prev => Math.max(0, prev - 5));
    generateNumbers();
  };

  const handleClear = () => {
    playSound('clear');
    setExpression('');
    setUsedNumbers([]);
    setError('');
    setIsCorrect(false);
  };

  const handleCalculate = () => {
    if (isCalculating) return;
    setIsCalculating(true);

    const usedNumbersInExpression = extractNumbersFromExpression(expression);
    
    if (!areArraysEqual(usedNumbersInExpression, numbers)) {
      playSound('fault');
      setError('すべての数字を使用してください！');
      setIsCalculating(false);
      return;
    }
  
    const result = evaluateExpression(expression);
    
    if (result === null) {
      playSound('fault');
      setError('無効な計算式です');
      setIsCalculating(false);
      return;
    }
  
    if (Math.abs(result - 10) < 0.0001) {
      playSound('correct');
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setError('');
      setTimeLeft(prev => prev + 10);
      generateNumbers();
      setIsCorrect(false);
    } else {
      playSound('fault');
      setError(`結果は ${result} です。10にしてください。`);
    }
    setIsCalculating(false);
  };

  return (
    <AnimatePresence mode="wait">
      {!gameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <>
          <Card className="w-full max-w-xl p-8">
          <div className="text-center mb-6 relative">
            {/* リスタートボタンを左側に配置 */}
            <div className="absolute left-0 top-1">
              <ConfirmButton 
                onConfirm={handleConfirmedRestart}
              />
            </div>

            {/* サウンドトグルボタンを右側に配置 */}
            <div className="absolute right-0 top-1">
              <motion.button
                onClick={toggleSound}
                className={`
                  p-2 rounded-lg
                  ${isSoundEnabled ? 'bg-blue-500' : 'bg-slate-500'}
                  transition-colors duration-200 text-white
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isSoundEnabled ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M6.343 9.657L10 13.314V21l8-8v-4l-8-8v7.314L6.343 9.657z" 
                    />
                  </svg>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" 
                    />
                  </svg>
                )}
              </motion.button>
            </div>

            <h1 className="text-3xl font-bold mb-3 text-slate-800">
              CALCULATION 10！
            </h1>
        <p className="text-sm text-slate-600 mb-4">
        Make 10 using all four numbers.
        </p>
        
        {/* スコアとタイマーの表示を改善 */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-slate-600">SCORE</p>
            <motion.p 
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-blue-600"
            >
              {score}
            </motion.p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-slate-600">TIME</p>
            <motion.div
              className={`text-2xl font-bold ${
                timeLeft <= 10 ? 'text-red-500' : 'text-slate-700'
              }`}
              animate={timeLeft <= 10 ? {
                scale: [1, 1.1, 1],
                transition: { repeat: Infinity, duration: 1 }
              } : {}}
            >
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-600">SKIP</p>
            <motion.p 
              key={skippedCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-yellow-600"
            >
              {skippedCount}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ゲームオーバー時の表示 */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6"
          >
            <div className="bg-slate-800 text-white p-6 rounded-lg mb-4">
              <h2 className="text-2xl font-bold mb-2">GAME OVER！</h2>
              <p className="text-3xl font-bold text-yellow-400 mb-4">{score} SCORE</p>
              <Button
                className="bg-green-500 w-full"
                onClick={handleRestart}
              >
                RETRY
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 式を表示するエリア */}
      <div className="mb-8">
        <div className="bg-slate-50 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-2 text-slate-700">Formula:</p>
          <motion.div 
            className={`min-h-[60px] rounded-lg flex items-center justify-center text-2xl font-mono border-2 transition-colors duration-300 p-4 ${
              isCorrect 
                ? "bg-green-100 border-green-500 text-green-700" 
                : "bg-white border-slate-200 text-slate-900"
            }`}
            animate={isCorrect ? {
              scale: [1, 1.02, 1],
              transition: { duration: 0.3 }
            } : {}}
          >
            {expression || (
              <span className="text-slate-400 text-xl">
                Make 10 using all numbers
              </span>
            )}
          </motion.div>
        </div>
        
        {/* エラーメッセージ表示を改善 */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 数字ボタングリッド */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {numbers.map((number, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              className={`h-20 text-3xl w-full ${
                usedNumbers.includes(index) 
                  ? "bg-blue-300 hover:bg-blue-300" 
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => handleNumberClick(number, index)}
              disabled={usedNumbers.includes(index)}
            >
              {number}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* 演算子ボタン - 2行グリッドに変更 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-3 grid grid-cols-2 gap-4 mb-4">
          {['+', '-', '×', '÷'].map((op) => (
            <motion.div key={op}>
              <Button
                className="bg-green-500 hover:bg-green-600 w-full h-16 text-2xl"
                onClick={() => handleOperatorClick(op)}
              >
                {op}
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-4">
          {['(', ')'].map((op) => (
            <motion.div key={op}>
              <Button
                className="bg-purple-500 hover:bg-purple-600 w-full h-16 text-2xl"
                onClick={() => handleOperatorClick(op)}
              >
                {op}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="grid grid-cols-3 gap-4">
        <Button
          className="bg-red-500 hover:bg-red-600 w-full h-14 text-lg font-bold"
          onClick={handleClear}
        >
          CLEAR
        </Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 w-full h-14 text-lg font-bold"
          onClick={handleSkip}
        >
          SKIP (-5s)
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 w-full h-14 text-lg font-bold"
          onClick={handleCalculate}
          disabled={!expression || isCalculating}
        >
          {isCalculating ? "..." : "CALC"}
        </Button>
      </div>
    </Card>
    
    <AnimatePresence>
            {showScoreInput && (
              <ScoreInput
                score={score}
                onSubmit={handleScoreSubmit}
                onClose={handleRestart}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default MathPuzzleGame;