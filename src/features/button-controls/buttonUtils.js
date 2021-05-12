import { BUTTON_SETUP, OUT_OF_RANGE_SETUP } from "../../constants.js"

export const buttonSetUp = (Button, props) => {
    const buttons = Object.keys(BUTTON_SETUP).map(key => {
        const buttonObj = BUTTON_SETUP[key];

        return (
            <Button
                key={key}
                class='button'
                value={key}
                makeMove={makeMove}
                coinAndMagePos={props.coinAndMagePos}
                buttonObj={buttonObj}
                img={props.img}
            />
        )
    })

    return buttons;
}

const makeMove = (coinAndMagePos, img, buttonObj, dispatch) => {

    const magePos = coinAndMagePos.mage;
    const coinPos = coinAndMagePos.coin;

    // do a check to see if we have gone over the boarder first
    const posChange = buttonObj['posChange'];
    const type = buttonObj['type'];


    const isGameOver = isOutOfRange(magePos, posChange);
    if (isGameOver) {
        dispatch({
            type: 'GAME_OVER',
            isOver: true
        });
    } else {
        dispatch({
            type: type,
            magePos: magePos,
            newPos: magePos - posChange,
            img: img
        });
        dispatch({
            type: 'UPDATE_MAGE_POS',
            mage: 'mage',
            position: magePos - posChange
        });
    }
}

const isOutOfRange = (magePos, posChange) => {
    const outRangeList = OUT_OF_RANGE_SETUP[`${posChange}`];
    return outRangeList.includes(magePos)
}

