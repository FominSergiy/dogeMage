import { getScoreboardRows, postNewScore } from '../requests.js';
import { getTopSortedScores, getOnlyScores } from '../features/scoreboard/scoreboardUtils.js';

// ACTIONS //
const addOne = () => {
    return {
        type: 'ADD_ONE',
        value: 1
    }
}

const updateMageSquare = (type, curPos, newPos, img) => {
    return {
        type: type,
        currentMagePos: curPos,
        newMagePos: newPos,
        img: img
    }
}

const updateMagePos = (newPos) => {
    return {
        type: 'UPDATE_MAGE_POS',
        mage: 'mage',
        position: newPos
    }
}

const updateCoinSquare = (
    type,
    curMagePos,
    newMagePos,
    newCoinPos,
    img,
    coinImg
) => {
    return {
        type: `${type}_COIN_RESET`,
        currentMagePos: curMagePos,
        newMagePos: newMagePos,
        newCoinPos: newCoinPos,
        img: img,
        coinImg: coinImg
    }
}

const updateCoinMagePos = (newMagePos, newCoinPos) => {
    return {
        type: 'UPDATE_BOTH',
        mage: 'mage',
        magePos: newMagePos,
        coin: 'coin',
        coinPos: newCoinPos
    }
}

// ACTION CREATORS //
export const gameOver = () => dispatch => {
    dispatch({
        type: 'GAME_OVER',
        isOver: true
    });
}

export const decrementTimer = (timerId) => dispatch => {
    dispatch({
        type: 'DECREMENT_COUNTER',
        timerId: timerId
    });
}

export const updateStateWhenScored = (
    type,
    curMagePos,
    newMagePos,
    newCoinPos,
    img,
    coinImg,
) => dispatch => {
    dispatch(
        updateCoinSquare(
            type,
            curMagePos,
            newMagePos,
            newCoinPos,
            img,
            coinImg
        )
    );
    dispatch(
        updateCoinMagePos(
            newMagePos,
            newCoinPos
        )
    );
    dispatch(
        addOne()
    );
}

export const updateStateWhenMove = (
    type,
    curMagePos,
    newMagePos,
    img,
) => dispatch => {
    dispatch(
        updateMageSquare(
            type,
            curMagePos,
            newMagePos,
            img,
        )
    );
    dispatch(
        updateMagePos(newMagePos)
    );
}

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
    console.log('hi there from thunk');
    getScoreboardRows(partitionKey)
        .then(response => getTopSortedScores(response.data, howMany))
        .then(processedData => {
            dispatch(setScoreboard(processedData));
            return getOnlyScores(processedData);

        }).then(onlyScores => dispatch(setTopScores(onlyScores)));
}

// set new score in the table and re-generate scoreboard
export const setNewScoreThunk = (userName, score, partitionKey, howMany) => dispatch => {
    postNewScore(userName, score)
        .then(response => {
            console.log(response); 
            if (response.status === 200) return response
        }).then( () => {
            console.log('hi before scoreboard thunk');
            dispatch(
                getScoreBoardThunk(
                    partitionKey, 
                    howMany
            )
        )}).then( () => {
            console.log('hi before scoreboard swap!')
            dispatch(
                swapScoreBoard(
                    false
                )
            )
        });
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

