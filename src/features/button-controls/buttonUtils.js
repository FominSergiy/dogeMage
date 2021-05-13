import * as Constants from "../../constants.js"
import { generateCoinPos } from "../../utils/utils.js";


export const buttonSetUp = (Button, props) => {
    const buttons = Object.keys(Constants.BUTTON_SETUP).map(key => {
        const buttonObj = Constants.BUTTON_SETUP[key];

        return (
            <Button
                key={key}
                class='button'
                value={key}
                makeMove={makeMove}
                coinAndMagePos={props.coinAndMagePos}
                buttonObj={buttonObj}
                img={props.img}
                coinImg={props.coinImg}
            />
        )
    })

    return buttons;
}

const makeMove = (coinAndMagePos, img, coinImg, buttonObj, dispatch) => {

    // do a check to see if we have gone over the boarder first
    const currentMagePos = coinAndMagePos.mage;
    const currentCoinPos = coinAndMagePos.coin;
    const posChange = buttonObj['posChange'];
    const type = buttonObj['type'];

    const newMagePos = currentMagePos - posChange;
    const isScored = hasScored(coinAndMagePos, posChange);


    const isGameOver = isOutOfRange(currentMagePos, posChange);
    if (isGameOver) {
        dispatch({
            type: 'GAME_OVER',
            isOver: true
        });
    } else if (isScored) {
        const newCoinPos = generateCoinPos(newMagePos, Constants.BOARD_SIZE);
        dispatch({
            type: `${type}_COIN_RESET`,
            currentMagePos: currentMagePos,
            newMagePos: newMagePos,
            newCoinPos: newCoinPos,
            img: img,
            coinImg: coinImg
        });
        dispatch({
            type: 'UPDATE_BOTH',
            mage: 'mage',
            magePos: newMagePos,
            coin: 'coin',
            coinPos: newCoinPos
        });
        dispatch({
            type: 'ADD_ONE',
            value: 1
        });
    } else {
        dispatch({
            type: type,
            currentMagePos: currentMagePos,
            newMagePos: newMagePos,
            img: img
        });
        dispatch({
            type: 'UPDATE_MAGE_POS',
            mage: 'mage',
            position: newMagePos
        });
    }
}

const isOutOfRange = (magePos, posChange) => {
    const outRangeList = Constants.OUT_OF_RANGE_SETUP[`${posChange}`];
    return outRangeList.includes(magePos)
}


const hasScored = (coinAndMagePos, posChange) => {
    const newMagePos = coinAndMagePos.mage - posChange;
    const result = newMagePos === coinAndMagePos.coin
        ? true
        : false;
    return result;
}
