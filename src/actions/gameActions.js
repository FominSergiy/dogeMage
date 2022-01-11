export const setScoreboard = (scoreBoardRows) => dispatch => {
    dispatch({
        type: "SET_SCOREBOARD",
        scoreBoardRows: scoreBoardRows
    });
};

export const setTopScores = (topScores) => dispatch => {
    dispatch({
        type: "SET_TOP_SCORES",
        scores: topScores
    });
};
