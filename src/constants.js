export const BOARD_SIZE = 5;
export const MAGE_START_POS = 12;
export const IMG = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_IMG_PATH
    : process.env.REACT_APP_DEV_IMG_PATH;

export const COIN = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_COIN_IMG_PATH
    : process.env.REACT_APP_DEV_COIN_IMG_PATH;

export const GAME_OVER_IMG = "./gameOverGirl.png";
export const SCOREBOARD_RESULTS_ENDPOINT = process.env.REACT_APP_SCOREBOARD_RESULTS_ENDPOINT;
export const POST_NEW_SCORE_ENDPOINT = process.env.REACT_APP_POST_NEW_SCORE_ENDPOINT;
export const PARTITION_KEY = process.env.REACT_APP_PARTITION_KEY;

export const BUTTON_SETUP = {
    left: {
        type: "MOVE_LEFT",
        posChange: 1
    },
    up: {
        type: "MOVE_UP",
        posChange: 5
    },
    right: {
        type: "MOVE_RIGHT",
        posChange: -1
    },
    down: {
        type: "MOVE_DOWN",
        posChange: -5
    }
};

export const KEY_DOWN_SET_UP = {
    "37": {
        type: "MOVE_LEFT",
        posChange: 1,
        pressed: false
    },
    "38": {
        type: "MOVE_UP",
        posChange: 5,
        pressed: false
    },
    "39": {
        type: "MOVE_RIGHT",
        posChange: -1,
        pressed: false
    },
    "40": {
        type: "MOVE_DOWN",
        posChange: -5,
        pressed: false
    }
};

//range of indexes moving from which
//we will get out of range and game will be over
export const OUT_OF_RANGE_SETUP = {
    "1": [0, 5, 10, 15, 20],
    "5": [0, 1, 2, 3, 4],
    "-1": [4, 9, 14, 19, 24],
    "-5": [20, 21, 22, 23, 24]
};

export const scoreBoardLength = 10;