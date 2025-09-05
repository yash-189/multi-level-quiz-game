import React from 'react';
import { useQuiz } from '../../contexts/QuizContext';

const LevelBadge = ({ level }) => {
  const { currentLevel } = useQuiz();
  
  const displayLevel = level || currentLevel;
  
  const levelConfig = {
    easy: { 
      color: 'bg-emerald-500',
      label: 'Easy'
    },
    medium: { 
      color: 'bg-amber-500',
      label: 'Medium'
    },
    hard: { 
      color: 'bg-rose-500',
      label: 'Hard'
    }
  };

  const config = levelConfig[displayLevel] || levelConfig.easy;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-6 ${config.color}`}></div>
      <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
        {config.label}
      </span>
    </div>
  );
};

export default LevelBadge;