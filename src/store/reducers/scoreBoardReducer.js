export const swapScoreBoard = (state = false, action) => {
    switch (action.type) {
        case "SWAP_SCOREBOARD":
            return action.doSwap;
        case "RESET":
            return false;
        default:
            return state;
    }
};

export const userName = (state = '', action) => {
    switch (action.type) {
        case "SET_USER_NAME":
            return action.userName;
        case "RESET":
            return '';
        default:
            return state;
    }
};