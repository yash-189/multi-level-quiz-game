import React, { useState, useEffect } from "react"
import { useQuiz } from "../contexts/QuizContext"
import MultipleChoiceQuestion from "../components/questionTypes/MultipleChoiceQuestion"
import TrueFalseQuestion from "../components/questionTypes/TrueFalseQuestion"
import TextInputQuestion from "../components/questionTypes/TextInputQuestion"
import FeedbackDisplay from "../components/ui/FeedbackDisplay"
import Button from "../components/ui/Button"
import LevelBadge from "../components/quiz/LevelBadge"
import Timer from "../components/quiz/Timer"
import CompactRestartButton from "../components/quiz/CompactRestartButton"

const QuizPageMobile = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswer,
    setUserAnswer,
    feedback,
    handleAnswerSubmit,
    currentLevel,
    currentLevelProgress,
    goToNextQuestion,
    isCorrect
  } = useQuiz()

  const [showingFeedback, setShowingFeedback] = useState(false)

  useEffect(() => {
    if (feedback && !showingFeedback) {
      setShowingFeedback(true)
      
      const timeout = setTimeout(() => {
        goToNextQuestion()
        setShowingFeedback(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [feedback, showingFeedback, goToNextQuestion])

  if (!currentQuestion) return null

  const isAnswered = feedback !== null
  
  
  const handleSubmit = () => handleAnswerSubmit(userAnswer)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="border-b border-gray-200 p-2 md:p-0 sticky top-0 z-10 max-w-6xl mx-auto w-full">
        <div className="border-b border-gray-100 px-4 md:px-8 py-3 md:py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-4">
              <div className="text-xl md:text-2xl font-bold text-gray-900">Quiz</div>
              <LevelBadge />
            </div>
           <div className="flex items-center gap-2">
    <CompactRestartButton />
    <Timer />
  </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 md:px-8 py-4 md:py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs md:text-sm text-gray-600 font-medium">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs md:text-sm text-gray-600">
                {currentLevelProgress.correct} of {currentLevelProgress.requirement} correct needed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div 
                className="bg-gray-900 h-2 md:h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 md:px-4 py-6 md:py-8 flex flex-col max-w-6xl mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight text-center px-2">
              {currentQuestion.question}
            </h1>
          </div>

          <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto w-full">
            {currentQuestion.type === "multiple-choice" && (
              <MultipleChoiceQuestion
                options={currentQuestion.options || []}
                value={userAnswer}
                onChange={setUserAnswer}
                disabled={isAnswered}
              />
            )}

            {currentQuestion.type === "true-false" && (
              <TrueFalseQuestion value={userAnswer} onChange={setUserAnswer} disabled={isAnswered} />
            )}

            {currentQuestion.type === "text-input" && (
              <TextInputQuestion value={userAnswer} onChange={setUserAnswer} disabled={isAnswered} />
            )}
          </div>
        </div>

        {feedback && (
          <div className="mt-6">
            <FeedbackDisplay feedback={feedback} isCorrect={isCorrect} />
          </div>
        )}
      </div>

      {!isAnswered && (
        <div className="px-4 pb-6 md:pb-8 pt-4 bg-white border-t border-gray-200 max-w-6xl mx-auto w-full">
          <Button 
            onClick={handleSubmit} 
            disabled={!userAnswer.trim()}
          
            variant="pill"
            className="w-full"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuizPageMobile