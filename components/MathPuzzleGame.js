// components/MathPuzzleGame.js
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Card from './Card';
import { evaluateExpression, extractNumbersFromExpression, areArraysEqual } from '../lib/mathUtils';


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

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPlaying]);

  // 時間切れ処理
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsPlaying(false);
      // ゲームオーバー時の処理
      alert(`ゲームオーバー！\nスコア: ${score}`);
    }
  }, [timeLeft]);

  // リスタート機能
  const handleRestart = () => {
    setTimeLeft(90);  // 90秒からスタート
    setScore(0);
    setSkippedCount(0);
    setIsPlaying(true);
    generateNumbers();
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
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const handleNumberClick = (number, index) => {
    if (!usedNumbers.includes(index)) {
      setExpression(prev => 
        prev + (prev.length && !prev.endsWith(' ') ? ' ' : '') + number
      );
      setUsedNumbers(prev => [...prev, index]);
      setError('');
    }
  };

  const handleOperatorClick = (operator) => {
    setExpression(prev => 
      prev + (prev.endsWith(' ') || prev.length === 0 ? '' : ' ') + 
      operator + 
      (operator === '(' || operator === ')' ? '' : ' ')
    );
    setError('');
  };

  const handleSkip = () => {
    setSkippedCount(prev => prev + 1);
    setTimeLeft(prev => Math.max(0, prev - 5)); // 5秒減少（ただし0秒未満にはならない）
    generateNumbers();
  };

  const handleClear = () => {
    setExpression('');
    setUsedNumbers([]);
    setError('');
    setIsCorrect(false);
  };

  const handleCalculate = () => {
    const usedNumbersInExpression = extractNumbersFromExpression(expression);
    
    if (!areArraysEqual(usedNumbersInExpression, numbers)) {
      setError('すべての数字を使用してください！');
      return;
    }
  
    const result = evaluateExpression(expression);
    
    if (result === null) {
      setError('無効な計算式です');
      return;
    }
  
    if (Math.abs(result - 10) < 0.0001) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setError('');
      // 正解時に10秒追加
      setTimeLeft(prev => prev + 10);
      setTimeout(() => {
        setIsCorrect(false);
        generateNumbers();
      }, 1500);
    } else {
      setError(`結果は ${result} です。10にしてください。`);
    }
  };

  return (
    <Card className="w-full max-w-xl p-8"> {/* カードのサイズを少し大きく */}
      {/* ヘッダー部分 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-3 text-slate-800">CALCULATION 10！</h1>
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
          disabled={!expression}
        >
          CALC
        </Button>
      </div>
    </Card>
  );
};

export default MathPuzzleGame;