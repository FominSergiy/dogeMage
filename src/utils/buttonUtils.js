import { BUTTON_SETUP, OUT_OF_RANGE_SETUP } from "../constants.js"

export const buttonSetUp = (Button, props) => {
    const buttons = Object.keys(BUTTON_SETUP).map(key => {
        const buttonObj = BUTTON_SETUP[key];

        return (
            <Button
                key={key}
                class='button'
                value={key}
                makeMove={makeMove}
                currentPos={props.currentPos}
                buttonObj={buttonObj}
                img={props.img}
            />
        )
    })

    return buttons;
}

const makeMove = (currentPos, img, buttonObj, dispatch) => {
    // do a check to see if we have gone over the boarder first
    const posChange = buttonObj['posChange'];
    const type = buttonObj['type'];


    const isGameOver = isOutOfRange(currentPos, posChange);
    if (isGameOver) {
        dispatch({
            type: 'GAME_OVER',
            isOver: true
        });
    } else {
        dispatch({
            type: type,
            currentPos: currentPos,
            newPos: currentPos - posChange,
            img: img
        });
        dispatch({
            type: 'UPDATE_POSITION',
            position: currentPos - posChange
        });
    }
}

const isOutOfRange = (currentPos, posChange) => {
    const outRangeList = OUT_OF_RANGE_SETUP[`${posChange}`];
    return outRangeList.includes(currentPos)
}

