import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmButton = ({ onConfirm, className = "" }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = () => {
    if (isConfirming) {
      onConfirm();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
      // 5秒後に確認状態をリセット
      setTimeout(() => setIsConfirming(false), 5000);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        relative px-3 py-1 rounded-lg text-sm font-semibold
        transition-colors duration-200
        ${isConfirming 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-slate-600 hover:bg-slate-700'} 
        text-white
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isConfirming ? (
          <motion.span
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            OK?
          </motion.span>
        ) : (
          <motion.span
            key="restart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0" />
              <path d="M9 9L3 12l6 3" />
            </svg>
            <span>Restart</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ConfirmButton;