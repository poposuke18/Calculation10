// components/SoundToggleButton.js
import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

const SoundToggleButton = () => {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <motion.button
      onClick={toggleSound}
      className={`
        fixed top-4 right-4 p-2 rounded-full
        ${isSoundEnabled ? 'bg-blue-500' : 'bg-slate-500'}
        transition-colors duration-200
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isSoundEnabled ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M6.343 9.657L10 13.314V21l8-8v-4l-8-8v7.314L6.343 9.657zM4.93 11.07L2.515 13.485a2 2 0 000 2.828L4.93 18.728" 
          />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white" 
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
  );
};

export default SoundToggleButton;