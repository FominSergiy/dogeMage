export const BOARD_SIZE = 5;
export const MAGE_START_POS = 12;
export const IMG = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e32c26ba-2bab-4113-ae4d-2e0fddb012f3/dbhkef2-0480b859-092c-47fc-ba78-5f299736997e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UzMmMyNmJhLTJiYWItNDExMy1hZTRkLTJlMGZkZGIwMTJmM1wvZGJoa2VmMi0wNDgwYjg1OS0wOTJjLTQ3ZmMtYmE3OC01ZjI5OTczNjk5N2UuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tNrQD0-ER3hxMGn67aqGJm8fSUcTuDFEkXtLgYT9SfU";
export const COIN = "dogeFairy/dodg.gif";
export const GAME_OVER_IMG = 'dogeFairy/gameOverGirl.png';
export const SCOREBOARD_RESULTS_ENDPOINT = 'https://scoreboardgamefunctions.azurewebsites.net/api/ReturnTableResults?';
export const POST_NEW_SCORE_ENDPOINT = 'https://scoreboardgamefunctions.azurewebsites.net/api/PostNewScore?';
export const PARTITION_KEY = 'sergey'

export const BUTTON_SETUP = {
    left: {
        type: 'MOVE_LEFT',
        posChange: 1
    },
    up: {
        type: 'MOVE_UP',
        posChange: 5
    },
    right: {
        type: 'MOVE_RIGHT',
        posChange: -1
    },
    down: {
        type: 'MOVE_DOWN',
        posChange: -5
    }
}

export const KEY_DOWN_SET_UP = {
    '37': {
        type: 'MOVE_LEFT',
        posChange: 1,
        pressed: false
    },
    '38': {
        type: 'MOVE_UP',
        posChange: 5,
        pressed: false
    },
    '39': {
        type: 'MOVE_RIGHT',
        posChange: -1,
        pressed: false
    },
    '40': {
        type: 'MOVE_DOWN',
        posChange: -5,
        pressed: false
    }
}

//range of indexes moving from which
//we will get out of range and game will be over
export const OUT_OF_RANGE_SETUP = {
    "1": [0, 5, 10, 15, 20],
    "5": [0, 1, 2, 3, 4],
    "-1": [4, 9, 14, 19, 24],
    "-5": [20, 21, 22, 23, 24]
};

export const scoreBoardLength = 10;