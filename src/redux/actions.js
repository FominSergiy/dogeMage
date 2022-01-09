import { getScoreboardRows, postNewScore } from '../requests.js';
import { getTopSortedScores, getOnlyScores } from '../features/scoreboard/scoreboardUtils.js';


export const setScoreboard = (scoreBoardRows) => dispatch => {
    dispatch({
        type: "SET_SCOREBOARD",
        scoreBoardRows: scoreBoardRows
    })
}

export const setTopScores = (topScores) => dispatch => {
    dispatch({
        type: 'SET_TOP_SCORES',
        scores: topScores
    })
}

// get the response from the api, use func to process data...
// ...save processed data to the redux store.
export const getScoreBoardThunk = (partitionKey, howMany) => dispatch => {
    getScoreboardRows(partitionKey)
        .then(response => getTopSortedScores(response.data, howMany))
        .then(processedData => {
            dispatch(setScoreboard(processedData));
            return getOnlyScores(processedData);

        }).then(onlyScores => dispatch(setTopScores(onlyScores))
        ).catch(err => alert(`Ops! Something is Wrong with the Scoreboard load:${err.message}`));
}

// set new score in the table and re-generate scoreboard
export const setNewScoreThunk = (userName, score, partitionKey, howMany) => dispatch => {
    postNewScore(userName, score)
        .then(response => {
            if (response.status === 200) return response
        }).then(() => {
            dispatch(
                getScoreBoardThunk(
                    partitionKey, 
                    howMany
            )
        )}).then(() => {
            dispatch(
                swapScoreBoard(
                    false
                )
            )
        }).catch(
            err => alert(`Ops! Something is Wrong with a new score upload:${err.message}`)
        );
}

export const swapScoreBoard = (isSwap) => dispatch => {
    dispatch({
        type: "SWAP_SCOREBOARD",
        doSwap: isSwap
    })
}

export const setUserName = (userName) => dispatch => {
    dispatch({
        type: "SET_USER_NAME",
        userName: userName
    })
}

