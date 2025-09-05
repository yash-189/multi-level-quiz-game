import React from "react"

const FeedbackDisplay = ({ feedback, isCorrect, className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 md:gap-4 p-4 md:p-5 ${className}`}>
      <div className={`w-2 md:w-3 h-6 md:h-8 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full`}></div>
      <span className={`text-lg md:text-xl font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
        {feedback}
      </span>
    </div>
  )
}

export default FeedbackDisplay