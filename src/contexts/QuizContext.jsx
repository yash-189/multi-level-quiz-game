import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { GAME_STATES, LEVELS, LEVELS_CONFIGS, TIME_DURATION } from "../utils/constants";
import questionsData from '../data/questions.json';
import { shuffleArray } from "../utils/gameLogic";
import { useTimer } from "../hooks/useTimer";
import { useLocalStorage } from "../hooks/useLocalStorage";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
   const [gameState, setGameState, clearGameState] = useLocalStorage('quiz-game-state', GAME_STATES.NOT_STARTED);
   const [currentLevel, setCurrentLevel, clearCurrentLevel] = useLocalStorage('quiz-current-level', LEVELS[0]);
   const [currentLevelIndex, setCurrentLevelIndex, clearCurrentLevelIndex] = useLocalStorage('quiz-level-index', 0);
   
   const [questions, setQuestions, clearQuestions] = useLocalStorage('quiz-questions', []);
   
   const [currentQuestionIndex, setCurrentQuestionIndex, clearCurrentQuestionIndex] = useLocalStorage('quiz-question-index', 0);
   const [userAnswer, setUserAnswer] = useState('');
   
   const [allAnswers, setAllAnswers, clearAllAnswers] = useLocalStorage('quiz-all-answers', []);
   const [isCorrect, setIsCorrect] = useState(null);

   
   const [feedback, setFeedback] = useState(null);
  
   const [shouldResetTimer, setShouldResetTimer] = useState(false);
   
   const currentQuestion = questions[currentQuestionIndex] || null;
   const totalQuestions = questions.length;
   
   
   const isLastQuestion = currentQuestionIndex === questions.length - 1;
   const hasNextQuestion = currentQuestionIndex < questions.length - 1;

   const handleTimeUp = () => {
       if (!currentQuestion || feedback) return;
       handleAnswerSubmit('', true);
   };

   const { timeLeft, resetTime, stopTimer } = useTimer(TIME_DURATION, handleTimeUp);

   useEffect(() => {
       if (shouldResetTimer) {
           resetTime();
           setShouldResetTimer(false);
       }
   }, [shouldResetTimer, resetTime]);


  // Load and shuffle questions 
   useEffect(() => {
       if (gameState === GAME_STATES.IN_PROGRESS && currentLevel) {
           const levelQuestions = questionsData[currentLevel] || [];
                      
           // Only load new questions if none exist for current level
           if (questions.length === 0) {
               const shuffledQuestions = shuffleArray([...levelQuestions]);
               setQuestions(shuffledQuestions);
               setCurrentQuestionIndex(0);
               setUserAnswer('');
               setFeedback(null);
               setShouldResetTimer(true);
           } else {
               setUserAnswer('');
               setFeedback(null);
           }
       }
   }, [currentLevel, gameState]);

   const startGame = () => {
       clearAllAnswers();
       clearQuestions();
       clearCurrentQuestionIndex();
       
       setGameState(GAME_STATES.IN_PROGRESS);
       setCurrentLevel(LEVELS[0]);
       setCurrentLevelIndex(0);
       setUserAnswer('');
       setFeedback(null);
       setShouldResetTimer(true);
   };

   const checkAnswer = (answer, correctAnswer, type) => {
       if (type === 'text-input') {
           return answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
       }
       return answer === correctAnswer;
   };

  const handleAnswerSubmit = (submittedAnswer = userAnswer, isTimeout = false) => {
   
   if (!currentQuestion || feedback) return;
   
   stopTimer();
   
   const finalAnswer = submittedAnswer || userAnswer;
   
   const isCorrect = !isTimeout && checkAnswer(finalAnswer, currentQuestion.correctAnswer, currentQuestion.type);
   
   // score based on correctness and current level configuration
   const score = isCorrect ? LEVELS_CONFIGS[currentLevel].score : 0;
   
   // answer record for tracking user progress 
   const answerData = {
       question: currentQuestion.question,
       userAnswer: finalAnswer,
       correctAnswer: currentQuestion.correctAnswer,
       isCorrect,
       score,
       level: currentLevel
   };

   const updatedAnswers = [...allAnswers, answerData];
   setAllAnswers(updatedAnswers);
   

   const message = isTimeout 
       ? `Time's up! Correct answer: ${currentQuestion.correctAnswer}`
       : isCorrect 
           ? 'Correct!'
           : `Wrong! Correct answer: ${currentQuestion.correctAnswer}`;
   
   setFeedback(message);
   setIsCorrect(isCorrect);
   
   // next game state and progression
   setTimeout(() => {
       setFeedback(null);
       
       if (isLastQuestion) {
          
           const levelAnswers = updatedAnswers.filter(a => a.level === currentLevel);
           const correct = levelAnswers.filter(a => a.isCorrect).length;
           const required = LEVELS_CONFIGS[currentLevel].requirement;
           
           // Determine next state - level passed, game completed, or level failed
           const nextState = correct >= required 
               ? (currentLevelIndex === LEVELS.length - 1 
                   ? GAME_STATES.GAME_COMPLETED  
                   : GAME_STATES.LEVEL_COMPLETED) 
               : GAME_STATES.FAILED; 
               
           setGameState(nextState);
       } else {
          
           moveToNextQuestion();
       }
   }, 2000);
};

   const moveToNextQuestion = () => {
       setCurrentQuestionIndex(prev => prev + 1);
       setUserAnswer('');
       setFeedback(null);
       setIsCorrect(null);
       setShouldResetTimer(true);
   };

   const proceedToNextLevel = () => {
       if (currentLevelIndex < LEVELS.length - 1) {
           const nextIndex = currentLevelIndex + 1;
           setCurrentLevelIndex(nextIndex);
           setCurrentLevel(LEVELS[nextIndex]);
           setGameState(GAME_STATES.IN_PROGRESS);
           setQuestions([]);
           setCurrentQuestionIndex(0);
           setFeedback(null);
           setShouldResetTimer(true);
       }
   };

   const retryCurrentLevel = () => {
       const filteredAnswers = allAnswers.filter(a => a.level !== currentLevel);
       
       setAllAnswers(filteredAnswers);
       setGameState(GAME_STATES.IN_PROGRESS);
       setQuestions([]);
       setCurrentQuestionIndex(0);
       setUserAnswer('');
       setFeedback(null);
       setShouldResetTimer(true);
   };

   const resetGame = () => {
       clearGameState();
       clearCurrentLevel();
       clearCurrentLevelIndex();
       clearQuestions();
       clearCurrentQuestionIndex();
       clearAllAnswers();
       
       setGameState(GAME_STATES.NOT_STARTED);
       setCurrentLevel(LEVELS[0]);
       setCurrentLevelIndex(0);
       setQuestions([]);
       setCurrentQuestionIndex(0);
       setUserAnswer('');
       setAllAnswers([]);
       setFeedback(null);
       stopTimer();
   };

    // currentLevelProgress - recalculate only when answers change
   const currentLevelProgress = useMemo(() => {

        //  filter all asnswers for the current level
       const answers = allAnswers.filter(answer => answer.level === currentLevel);
       // count correct answers only
       const correct = answers.filter(a => a.isCorrect).length;
       // get requirement from config
       const requirement = LEVELS_CONFIGS[currentLevel]?.requirement || 2;
       
       return {
           correct,
           total: answers.length,
           passed: correct >= requirement,
           requirement
       };
   }, [allAnswers, currentLevel]);

   const totalScore = useMemo(() => {
       return allAnswers.reduce((sum, answer) => sum + answer.score, 0);
   }, [allAnswers]);

   const value = useMemo(() => ({
       gameState,
       currentLevel,
       currentQuestion,
       currentQuestionIndex,
       totalQuestions,
       isLastQuestion,
       hasNextQuestion,
       userAnswer,
       setUserAnswer,
       feedback,
       isCorrect,
       timeLeft,
       startGame,
       handleAnswerSubmit,
       moveToNextQuestion,
       proceedToNextLevel,
       retryCurrentLevel,
       resetGame,
       allAnswers,
       currentLevelProgress,
       totalScore
       
   }), [
       gameState, currentLevel, currentQuestion, currentQuestionIndex, 
       totalQuestions, isLastQuestion, hasNextQuestion, userAnswer, feedback,isCorrect,
       timeLeft, allAnswers, currentLevelProgress, totalScore
   ]);

   return (
       <QuizContext.Provider value={value}>
           {children}
       </QuizContext.Provider>
   );
};

export const useQuiz = () => {
   const context = useContext(QuizContext);
   if (!context) {
       throw new Error("useQuiz must be used within a QuizProvider");
   }
   return context;
};