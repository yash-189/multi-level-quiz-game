import React from "react"
import Button from "../components/ui/Button"
import { useQuiz } from "../contexts/QuizContext"

const StartPage = () => {
 const { startGame } = useQuiz()

 return (
   <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6">
     <div className="w-full max-w-4xl text-center">
       <div className="mb-12 md:mb-20">
         <h1 className="text-6xl md:text-9xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter">
           QUIZ
         </h1>
         <p className="text-lg md:text-2xl text-gray-500 font-medium">
           Multi-Level Knowledge Challenge
         </p>
       </div>

       <div className="grid grid-cols-3 gap-6 md:gap-16 mb-12 md:mb-20 max-w-2xl mx-auto">
         <div className="space-y-2 md:space-y-4">
           <div className="w-6 md:w-8 h-1 bg-emerald-500 mx-auto"></div>
           <h3 className="text-lg md:text-2xl font-bold text-gray-900">Easy</h3>
           <p className="text-sm md:text-lg text-gray-600">10 points</p>
         </div>
         <div className="space-y-2 md:space-y-4">
           <div className="w-6 md:w-8 h-1 bg-amber-500 mx-auto"></div>
           <h3 className="text-lg md:text-2xl font-bold text-gray-900">Medium</h3>
           <p className="text-sm md:text-lg text-gray-600">20 points</p>
         </div>
         <div className="space-y-2 md:space-y-4">
           <div className="w-6 md:w-8 h-1 bg-rose-500 mx-auto"></div>
           <h3 className="text-lg md:text-2xl font-bold text-gray-900">Hard</h3>
           <p className="text-sm md:text-lg text-gray-600">30 points</p>
         </div>
       </div>

       <div className="space-y-6 md:space-y-8">
         <Button 
           onClick={startGame} 
           variant="pill"
            >
           START
         </Button>
         
<p className="text-gray-500 text-base md:text-lg px-4 md:px-0">
  Get 2 out of 3 correct to level up • Your progress is auto-saved
</p>

       </div>
     </div>
   </div>
 )
}

export default StartPage