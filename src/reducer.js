import { createStore, combineReducers } from 'redux';
import * as Constants from './constants.js';
import { getInitState } from './utils/initState.js';

// since coinPos is a random number, need to
// return it back from InitState func
const [initState, coinPos] = getInitState(
    Constants.BOARD_SIZE,
    Constants.MAGE_START_POS,
    Constants.IMG,
    Constants.COIN
);

const initPositions = {
    'mage': Constants.MAGE_START_POS,
    'coin': coinPos
};


// each square calls this and gets updated state
const squares = (state = initState, action) => {
    switch (action.type) {
        case "RESET":
            return initState;
        case "MOVE_UP":
        case "MOVE_DOWN":
        case "MOVE_RIGHT":
        case "MOVE_LEFT":
            return {
                ...state,
                [action.magePos]: {
                    ...state[action.magePos],
                    mage: null
                },
                [action.newPos]: {
                    ...state[action.newPos],
                    mage: action.img
                }
            }
        default:
            return state
    }
};

const coinAndMagePos = (state = initPositions, action) => {
    switch (action.type) {
        case "UPDATE_BOTH":
            return {
                ...state,
                [action.coin]: action.position,
                [action.mage]: action.position
            }
        case "UPDATE_MAGE_POS":
            console.log(action.mage);
            return {
                ...state,
                [action.mage]: action.position
            }
        case "UPDATE_COIN_POS":
            return {
                ...state,
                [action.coin]: action.position
            }
        default:
            return state
    };
}

const gameOver = (state = false, action) => {
    switch (action.type) {
        case "GAME_OVER":
            return action.isOver;
        default:
            return state
    };
}

const score = (state = 0, action) => {
    switch (action.type) {
        case "PLUS_ONE":
            return state++;
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    squares: squares,
    coinAndMagePos: coinAndMagePos,
    gameOver: gameOver,
    score: score
});

const store = createStore(rootReducer);
export { store };