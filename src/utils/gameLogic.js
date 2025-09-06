export const shuffleArray = (array) => {
       
    // copy array to avoid changing original
    const shuffled = [...array];

    // start from the last element and move backwards
    for (let i = shuffled.length - 1; i > 0; i--) {

        // pick random position from start to current position
        const j = Math.floor(Math.random() * (i + 1));
        
        // swap the current element (i) with the randomly chosen one (j)
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const checkAnswer = (userAnswer, correctAnswer, questionType) => {
    if (questionType === 'text-input') {
        return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim(); // Fixed: toLowerCase() not toLowercase()
    }
    return userAnswer === correctAnswer;
}

export const calculateScore = (correctAnswers, level, scoring) => {
    return correctAnswers * scoring[level];
}