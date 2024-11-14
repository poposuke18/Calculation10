// components/StartScreen.js
import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';
import Button from './Button';
import Card from './Card';

const StartScreen = ({ onStartGame }) => {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-full max-w-xl p-8 text-center">
        <div className="relative">
          {/* Sound Toggle Button */}
          <motion.button
            onClick={toggleSound}
            className={`
              absolute right-0 top-0 p-2 rounded-lg
              ${isSoundEnabled ? 'bg-blue-500' : 'bg-slate-500'}
              transition-colors duration-200 text-white
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSoundEnabled ? (
              <div className="flex items-center space-x-1">
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
                <span className="text-sm">ON</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
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
                <span className="text-sm">OFF</span>
              </div>
            )}
          </motion.button>

          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            CALCULATION 10!
          </h1>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-slate-600 mb-4">
            Make 10 using four numbers and basic operations!
          </p>
          
          <div className="bg-slate-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold mb-4 text-slate-700">How to Play</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Use all four numbers exactly once
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Available operations: +, -, ×, ÷, ()
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                You have 90 seconds to solve as many as possible
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Correct answer: +1 point, +10 seconds
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Skip: -5 seconds
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStartGame}
            className="bg-blue-500 hover:bg-blue-600 w-64 h-16 text-xl"
          >
            START GAME
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default StartScreen;