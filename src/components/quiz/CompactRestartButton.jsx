import React from "react"

import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { useQuiz } from "../../contexts/QuizContext"

const CompactRestartButton = ({ className = "" }) => {
  const { resetGame } = useQuiz()

  const handleRestart = () => {
    if (window.confirm("Are you sure you want to restart the quiz? All progress will be lost.")) {
      resetGame()
    }
  }

  return (
    <button
      onClick={handleRestart}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 md:w-10 md:h-10
        bg-gray-100 hover:bg-gray-200
        border border-gray-300
        rounded-full
        transition-colors duration-200
        group
        ${className}
      `}
      title="Restart Quiz"
      aria-label="Restart Quiz"
    >
            <ArrowPathIcon className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />

    </button>
  )
}

export default CompactRestartButton