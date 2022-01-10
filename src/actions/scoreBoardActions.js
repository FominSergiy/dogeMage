export const swapScoreBoard = (isSwap) => dispatch => {
    dispatch({
        type: "SWAP_SCOREBOARD",
        doSwap: isSwap
    })
};

export const setUserName = (userName) => dispatch => {
    dispatch({
        type: "SET_USER_NAME",
        userName: userName
    })
};