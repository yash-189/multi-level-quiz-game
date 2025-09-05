import React from 'react';
import { useQuiz } from '../../contexts/QuizContext';

const Timer = ({ totalTime = 30 }) => {
  const { timeLeft } = useQuiz();
  
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10;
  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-1000 ${
            isUrgent ? 'text-red-500' : 'text-primary'
          }`}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute text-sm font-bold ${
        isUrgent ? 'text-red-500' : 'text-gray-900'
      }`}>
        {timeLeft}s
      </div>
    </div>
  );
};

export default Timer;