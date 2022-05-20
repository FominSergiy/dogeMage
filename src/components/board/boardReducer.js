import * as Constants from "../../constants.js";
import { getInitState } from "./boardUtils.js";

// since coinPos is a random number, need to
// return it back from InitState func
const [initState, coinPos] = getInitState(
    Constants.BOARD_SIZE,
    Constants.MAGE_START_POS,
    Constants.IMG,
    Constants.COIN
);

const initPositions = {
    "mage": Constants.MAGE_START_POS,
    "coin": coinPos
};

const initKeysPressed = {};
Object.keys(Constants.KEY_DOWN_SET_UP).forEach(
    key => {
        initKeysPressed[key] = {
            pressed : Constants.KEY_DOWN_SET_UP[key].pressed
        };
    }
);

const initTimer = {
    "time": 60,
    "timerId": null
};


// each square calls this and gets updated state
export const squares = (state = initState, action) => {
    switch (action.type) {
    case "MOVE_UP":
    case "MOVE_DOWN":
    case "MOVE_RIGHT":
    case "MOVE_LEFT":
        return {
            ...state,
            [action.currentMagePos]: {
                ...state[action.currentMagePos],
                mage: null
            },
            [action.newMagePos]: {
                ...state[action.newMagePos],
                mage: action.img
            }
        };
    case "MOVE_UP_COIN_RESET":
    case "MOVE_DOWN_COIN_RESET":
    case "MOVE_RIGHT_COIN_RESET":
    case "MOVE_LEFT_COIN_RESET":
        return {
            ...state,
            [action.currentMagePos]: {
                ...state[action.currentMagePos],
                mage: null
            },
            [action.newMagePos]: {
                ...state[action.newMagePos],
                mage: action.img,
                coin: null
            },
            [action.newCoinPos]: {
                ...state[action.newCoinPos],
                coin: action.coinImg,
                mage: null
            }
        };
    case "RESET":
        return initState;
    default:
        return state;
    }
};

export const coinAndMagePos = (state = initPositions, action) => {
    switch (action.type) {
    case "UPDATE_BOTH":
        return {
            ...state,
            [action.coin]: action.coinPos,
            [action.mage]: action.magePos
        };
    case "UPDATE_MAGE_POS":
        return {
            ...state,
            [action.mage]: action.position
        };
    case "UPDATE_COIN_POS":
        return {
            ...state,
            [action.coin]: action.position
        };
    case "RESET":
        return initPositions;
    default:
        return state;
    }
};

export const keysPressed = (state = initKeysPressed, action) => {
    switch (action.type) {
    case "BUTTON_KEY_DOWN":
        return {
            ...state,
            [action.keyId] : {
                pressed : true
            }
        };
    case "BUTTON_KEY_UP":
        return {
            ...state,
            [action.keyId] : {
                pressed : false
            }
        };
    case "RESET":
        return initKeysPressed;
    default:
        return state;
    }
};

export const timer = (state = initTimer, action) => {
    switch (action.type) {
    case "DECREMENT_COUNTER":
        return {
            ...state,
            "time": state["time"] - 1,
            "timerId": action.timerId
        };
    case "RESET":
        return initTimer;
    default:
        return state;
    }
};

export const gameOver = (state = false, action) => {
    switch (action.type) {
    case "GAME_OVER":
        return action.isOver;
    case "RESET":
        return false;
    default:
        return state;
    }
};

export const score = (state = 0, action) => {
    switch (action.type) {
    case "ADD_ONE":
        return state + action.value;
    case "RESET":
        return 0;
    default:
        return state;
    }
};