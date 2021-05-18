
// ACTIONS //
const addOne = () => {
    return {
        type: 'ADD_ONE',
        value: 1 
    }
}

const updateMageSquare = (type, curPos, newPos, img) => {
    return {
        type: type,
        currentMagePos: curPos,
        newMagePos: newPos,
        img: img
    }
}

const updateMagePos = (newPos) => {
    return {
        type: 'UPDATE_MAGE_POS',
        mage: 'mage',
        position: newPos
    }
}

const updateCoinSquare = (
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
}

const updateCoinMagePos = (newMagePos, newCoinPos) => {
    return {
        type: 'UPDATE_BOTH',
        mage: 'mage',
        magePos: newMagePos,
        coin: 'coin',
        coinPos: newCoinPos
    }
}

// ACTION CREATORS //
export const gameOver = () => dispatch => {
    dispatch({
        type: 'GAME_OVER',
        isOver: true
    });
}

export const decrementTimer = (timerId) => dispatch => {
    dispatch({
        type: 'DECREMENT_COUNTER',
        timerId: timerId
    });
}

export const updateStateWhenScored = (
    type, 
    curMagePos, 
    newMagePos, 
    newCoinPos, 
    img, 
    coinImg,
) => dispatch => {
    dispatch(
        updateCoinSquare(
            type, 
            curMagePos, 
            newMagePos, 
            newCoinPos, 
            img, 
            coinImg
        )
    );
    dispatch(
        updateCoinMagePos(
            newMagePos,
            newCoinPos
        )
    );
    dispatch(
        addOne()
    );
}

export const updateStateWhenMove = (
    type, 
    curMagePos, 
    newMagePos,  
    img,
) => dispatch => {
    dispatch(
        updateMageSquare(
            type, 
            curMagePos, 
            newMagePos,  
            img,
        )
    );
    dispatch(
        updateMagePos(newMagePos)
    );
}