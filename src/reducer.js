import { createStore, combineReducers } from 'redux';
import * as Constants from './constants.js';
import { getInitState } from './utils/initState.js';

const initState = getInitState(
    Constants.BOARD_SIZE,
    Constants.MAGE_START_POS,
    Constants.IMG,
    Constants.COIN
);


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
                [action.currentPos]: {
                    ...state[action.currentPos],
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

const currentPos = (state = Constants.MAGE_START_POS, action) => {
    switch (action.type) {
        case "UPDATE_POSITION":
            return action.position;
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
    currentPos: currentPos,
    gameOver: gameOver,
    score: score
});

const store = createStore(rootReducer);
export { store };