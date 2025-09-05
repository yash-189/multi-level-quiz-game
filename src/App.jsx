import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import StartPage from './pages/StartPage'
import QuizPage from './pages/QuizPage'
import LevelCompletedPage from './pages/LevelCompletedPage'
import FailedPage from './pages/FailedPage'
import ResultPage from './pages/ResultPage'


import { QuizProvider } from './contexts/QuizContext'
import QuizRouter from './QuizRouter'

const App = () => {
  return (
    <BrowserRouter>
    <QuizProvider>
      <QuizRouter />  
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/level-completed" element={<LevelCompletedPage />} />
        <Route path="/failed" element={<FailedPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </QuizProvider>
    </BrowserRouter>
  )
}

export default App