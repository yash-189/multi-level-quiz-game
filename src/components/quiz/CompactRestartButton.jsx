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
  className={`inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 ${className}`}
>
  <ArrowPathIcon className="w-3 h-3" />
  Restart
</button>
  )
}

export default CompactRestartButton