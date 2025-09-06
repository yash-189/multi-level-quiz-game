import React, { useEffect, useState, useRef } from "react"
import { useQuiz } from "../contexts/QuizContext"
import Button from "../components/ui/Button"
import { LEVELS_CONFIGS } from "../utils/constants"

const FailedPage = () => {
  const { currentLevel, currentLevelProgress, totalScore, retryCurrentLevel, resetGame } = useQuiz()
  const [countdown, setCountdown] = useState(5)
  // prevent multiple resetGame calls when countdown reaches 0
  const hasReset = useRef(false)
  const levelConfig = LEVELS_CONFIGS[currentLevel]

  // auto-redirect countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !hasReset.current) {
      // only reset once when countdown reaches 0
      hasReset.current = true
      resetGame()
    }
  }, [countdown]) 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-12 md:mb-20">
          <div className="w-2 h-12 md:h-16 bg-rose-500 mx-auto mb-6 md:mb-8"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 md:mb-8 tracking-tighter">
            FAILED
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-medium px-4">
            {levelConfig.name} Level Not Passed
          </p>
          {countdown > 0 && (
            <p className="text-sm md:text-base text-gray-400 font-medium mt-4">
              Redirecting to home in {countdown}s...
            </p>
          )}
        </div>
        
        <div className="mb-12 md:mb-20">
          <div className="inline-flex items-center gap-4 md:gap-6 bg-gray-50 px-8 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-3xl">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-gray-900">{totalScore}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">SCORE</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black text-gray-900">
                {currentLevelProgress.correct}/{currentLevelProgress.total}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">CORRECT</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6 max-w-xs md:max-w-sm mx-auto">
          <Button
            onClick={retryCurrentLevel}
            variant="pill"
            className="w-full"
          >
            RETRY
          </Button>
         
          <button
            onClick={resetGame}
            className="w-full h-14 md:h-16 bg-transparent hover:bg-gray-50 text-gray-600 border-2 border-gray-300 hover:border-gray-300 font-bold text-lg md:text-xl transition-all duration-300 rounded-xl md:rounded-2xl"
          >
            START OVER
          </button>
        </div>
      </div>
    </div>
  )
}

export default FailedPage