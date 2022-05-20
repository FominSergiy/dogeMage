export const scoreboard = (state = [], action) => {
    switch (action.type) {
    case "SET_SCOREBOARD":
        return action.scoreBoardRows;
    default:
        return state;
    }
};

// setting init state to null to catch
// when the board is loading, but the function to calc
// the new record has run
// added this handler to the checkForNewRecord func
// and in case the board contains no records == []
export const topScores = (state = null, action) => {
    switch (action.type) {
    case "SET_TOP_SCORES":
        return action.scores;
    default:
        return state;
    }
};

