export const gameReset = (dispatch, startPos) => {
    dispatch({
        type: 'RESET',
    });
    dispatch({
        type: 'UPDATE_MAGE_POS',
        mage: 'mage',
        position: startPos
    })
    dispatch({
        type: 'GAME_OVER',
        isOver: false
    });
}

export const generateCoinPos = (magePos, size) => {
    const boardSize = Math.pow(size, 2);
    const coinPos = Math.floor(Math.random() * boardSize);

    if (coinPos === magePos) {
        const backUpPos = generateCoinPos(magePos, size);
        return backUpPos;

    } else {
        return coinPos;
    }
}