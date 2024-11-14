// components/ScoreInput.js
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Button from './Button';

const ScoreInput = ({ score, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (name.length !== 3) {
      setError('Please enter exactly 3 letters');
      return;
    }
    
    if (!/^[A-Za-z]+$/.test(name)) {
      setError('Please use only letters');
      return;
    }

    await onSubmit(name.toUpperCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <Card className="w-96 p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="text-lg mb-6">Your Score: {score}</p>
        
        <div className="mb-6">
          <label className="block text-sm mb-2">Enter your initials (3 letters)</label>
          <input
            type="text"
            maxLength={3}
            value={name}
            onChange={(e) => setName(e.target.value.replace(/[^A-Za-z]/g, ''))}
            className="w-24 text-center text-2xl p-2 border-2 border-blue-500 rounded"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Submit
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Close
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ScoreInput;