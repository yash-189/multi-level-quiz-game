import React from "react"
import { useQuiz } from "../contexts/QuizContext"
import Button from "../components/ui/Button"
import { LEVELS_CONFIGS } from "../utils/constants"

const LevelCompletedPage = () => {
  const { currentLevel, currentLevelProgress, totalScore, proceedToNextLevel } = useQuiz()
  const levelConfig = LEVELS_CONFIGS[currentLevel]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-12 md:mb-20">
          <div className="w-2 h-12 md:h-16 bg-emerald-500 mx-auto mb-6 md:mb-8"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 md:mb-8 tracking-tighter">
            COMPLETE
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-medium px-4">
            {levelConfig.name} Level Passed
          </p>
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

        <Button 
          onClick={proceedToNextLevel}
          variant="pill"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  )
}

export default LevelCompletedPage