// components/HighScores.js
"use client";

import { motion } from 'framer-motion';
import Card from './Card';
import Button from './Button';

const HighScores = ({ scores, onClose }) => {
  return (
    <Card className="w-full max-w-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">High Scores</h2>
      
      <div className="space-y-2 mb-6">
        {scores.map((score, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex justify-between items-center p-3 rounded-lg ${
              index === 0 ? 'bg-yellow-100' :
              index === 1 ? 'bg-gray-100' :
              index === 2 ? 'bg-orange-100' :
              'bg-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold w-8">
                {index === 0 ? '🥇' :
                 index === 1 ? '🥈' :
                 index === 2 ? '🥉' :
                 `${index + 1}.`}
              </span>
              <span className="font-mono font-bold text-lg">{score.name}</span>
            </div>
            <span className="text-lg font-bold">{score.score}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Close
        </Button>
      </div>
    </Card>
  );
};

export default HighScores;