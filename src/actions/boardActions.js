export const setKeysDown = (keyId, isKeyDown) => dispatch => {
    const type = isKeyDown ? "BUTTON_KEY_DOWN" : "BUTTON_KEY_UP";
    dispatch({
        type: type,
        keyId: keyId
    })
};

export const addOne = () => {
    return {
        type: 'ADD_ONE',
        value: 1
    }
};

export const gameOver = () => dispatch => {
    dispatch({
        type: 'GAME_OVER',
        isOver: true
    });
};

export const decrementTimer = (timerId) => dispatch => {
    dispatch({
        type: 'DECREMENT_COUNTER',
        timerId: timerId
    });
};

export const updateMageSquare = (type, curPos, newPos, img) => {
    return {
        type: type,
        currentMagePos: curPos,
        newMagePos: newPos,
        img: img
    }
};

export const updateMagePos = (newPos) => {
    return {
        type: 'UPDATE_MAGE_POS',
        mage: 'mage',
        position: newPos
    }
};

export const updateCoinSquare = (
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
};

export const updateCoinMagePos = (newMagePos, newCoinPos) => {
    return {
        type: 'UPDATE_BOTH',
        mage: 'mage',
        magePos: newMagePos,
        coin: 'coin',
        coinPos: newCoinPos
    }
};