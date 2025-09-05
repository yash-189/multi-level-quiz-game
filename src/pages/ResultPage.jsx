import React from "react"
import { useQuiz } from "../contexts/QuizContext"
import Button from "../components/ui/Button"
import { ArrowPathIcon } from "@heroicons/react/24/solid"

const ResultPage = () => {
  const { totalScore, allAnswers, resetGame } = useQuiz()

  const totalQuestions = allAnswers.length
  const correctAnswers = allAnswers.filter(a => a.isCorrect).length
  const accuracy = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-12 md:mb-20">
          <div className="w-2 h-12 md:h-16 bg-amber-500 mx-auto mb-6 md:mb-8"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 md:mb-8 tracking-tighter">
            COMPLETE
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-medium px-4">
            All Levels Completed
          </p>
        </div>

        <div className="mb-12 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
            <div className="bg-gray-50 px-6 md:px-8 py-6 md:py-8 rounded-2xl md:rounded-3xl">
              <div className="text-2xl md:text-4xl font-black text-gray-900">{totalScore}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">SCORE</div>
            </div>
            
            <div className="bg-gray-50 px-6 md:px-8 py-6 md:py-8 rounded-2xl md:rounded-3xl">
              <div className="text-2xl md:text-4xl font-black text-gray-900">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">CORRECT</div>
            </div>
            
            <div className="bg-gray-50 px-6 md:px-8 py-6 md:py-8 rounded-2xl md:rounded-3xl">
              <div className="text-2xl md:text-4xl font-black text-gray-900">{accuracy}%</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">ACCURACY</div>
            </div>
          </div>
        </div>

        <div className="max-w-xs md:max-w-sm mx-auto">
          <Button 
            onClick={resetGame}
            variant="pill"

            >
            <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6" />
            PLAY AGAIN
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage