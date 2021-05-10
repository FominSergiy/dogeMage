export const gameReset = (dispatch, startPos) => {
    dispatch({
        type: 'RESET',
    });
    dispatch({
        type: 'UPDATE_POSITION',
        position: startPos
    })
    dispatch({
        type: 'GAME_OVER',
        isOver: false
    });
}