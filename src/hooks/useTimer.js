import { useEffect, useState, useRef } from "react";

export const useTimer = (duration, onTimeUp) => {

    // initialize timer from localStorage or  default duration
    const [timeLeft, setTimeLeft] = useState(() => {
        try {
            const saved = localStorage.getItem('quiz-timer');
            return saved ? JSON.parse(saved) : duration;
        } catch (error) {
            console.error('Error loading timer state:', error);
            return duration;
        }
    });
    
    const intervalRef = useRef(null);

    // use ref to avoid stale closure issues with callback
    const callbackRef = useRef(onTimeUp);
    
    callbackRef.current = onTimeUp;

    // save timeLeft only when user is about to leave
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('quiz-timer', JSON.stringify(timeLeft));
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [timeLeft]);

    const clearTimerState = () => {
        localStorage.removeItem('quiz-timer');
    };

    useEffect(() => {
        startTimer();
        return () => stopTimer();
    }, []);

    const startTimer = () => {

        // clear existing timer
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        intervalRef.current = setInterval(() => {
            // timer expired - trigger callback and cleanup
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    clearTimerState();
                    callbackRef.current?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const resetTime = () => {
        clearTimerState();
        setTimeLeft(duration);
        startTimer();
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        clearTimerState();
    };

    return { timeLeft, resetTime, stopTimer };
};