import React,{ useEffect } from 'react'
import { useQuiz } from './contexts/QuizContext'
import { useNavigate } from 'react-router'
import { GAME_STATES } from './utils/constants'



const QuizRouter=()=> {
  const { gameState } = useQuiz()
  const navigate = useNavigate()

  useEffect(() => {
    const stateToPath = {
      [GAME_STATES.NOT_STARTED]: '/',
      [GAME_STATES.IN_PROGRESS]: '/quiz',
      [GAME_STATES.LEVEL_COMPLETED]: '/level-completed',
      [GAME_STATES.FAILED]: '/failed',
      [GAME_STATES.GAME_COMPLETED]: '/result',
    }

    navigate(stateToPath[gameState] || '/')
  }, [gameState, navigate])

  return null
}


export default QuizRouter
