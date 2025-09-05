
export const LEVELS_CONFIGS = {
  easy: { score: 10, requirement: 2 },
  medium: { score: 20, requirement: 2 },
  hard: { score: 30, requirement: 2 }
};


export const LEVELS = Object.keys(LEVELS_CONFIGS);

export const TIME_DURATION = 30; // seconds

export const GAME_STATES = { 
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  LEVEL_COMPLETED: 'level_completed',
  GAME_COMPLETED: 'game_completed',
  FAILED: 'failed'
};
