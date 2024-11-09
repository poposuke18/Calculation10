// components/MathPuzzleGame.js
"use client";

import { useState, useEffect } from 'react';
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
    setTimeLeft(60); // 新しい問題が始まるたびにタイマーをリセット
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
    <Card className="w-full max-w-md">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">10を作ろう！</h1>
        <p className="text-sm text-gray-600 mb-2">
          4つの数字をすべて使って、10を作ってください
        </p>
        <div className="flex justify-between px-4 items-center">
        <div>
          <p className="text-gray-600">スコア: {score}</p>
          <p className="text-gray-600">スキップ: {skippedCount}</p>
        </div>
        <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>
     </div>

     {!isPlaying && (
        <Button
          className="bg-green-500 mt-4"
          onClick={handleRestart}
        >
          もう一度プレイ
        </Button>
      )}

      {/* 式を表示するエリア */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">式:</p>
        <div 
          className={`h-12 rounded flex items-center justify-center text-xl font-mono border transition-colors duration-300 ${
            isCorrect 
              ? "bg-green-100 border-green-500 text-green-700" 
              : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
        >
          {expression || (
            <span className="text-slate-500">
              数字とかっこを使って10を作ってください
            </span>
          )}
        </div>
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>

      {/* 数字ボタン */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {numbers.map((number, index) => (
          <Button
            key={index}
            className={`h-14 text-2xl ${
              usedNumbers.includes(index) ? "bg-blue-300" : "bg-blue-500"
            }`}
            onClick={() => handleNumberClick(number, index)}
            disabled={usedNumbers.includes(index)}
          >
            {number}
          </Button>
        ))}
      </div>

      {/* 演算子ボタン */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {['+', '-', '×', '÷', '(', ')'].map((op) => (
          <Button
            key={op}
            className={
              ['+', '-', '×', '÷'].includes(op) 
                ? "bg-green-500" 
                : "bg-purple-500"
            }
            onClick={() => handleOperatorClick(op)}
          >
            {op}
          </Button>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="grid grid-cols-3 gap-4">
  <Button
    className="bg-red-500"
    onClick={handleClear}
  >
    クリア
  </Button>
  <Button
    className="bg-yellow-500"
    onClick={handleSkip}
  >
    スキップ
  </Button>
  <Button
    className="bg-blue-500"
    onClick={handleCalculate}
    disabled={!expression}
  >
    計算する
  </Button>
      </div>
    </Card>
  );
};

export default MathPuzzleGame;