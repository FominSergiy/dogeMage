import * as Constants from "../../constants.js"
import { generateCoinPos } from "../../utils/utils.js";
import * as Actions from "../../redux/actions.js"


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
                timer={props.timer}
            />
        )
    })

    return buttons;
}

export const makeMove = (coinAndMagePos, img, coinImg, obj, dispatch, timer) => {
    console.log('hi');
    if (timer === 60) startDecrementCounter(timer, dispatch); // start time ticks on first move
    
    // do a check to see if we have gone over the boarder first
    const currentMagePos = coinAndMagePos.mage;
    const posChange = obj['posChange'];
    const type = obj['type'];

    const newMagePos = currentMagePos - posChange;
    const isScored = hasScored(coinAndMagePos, posChange);


    const isGameOver = isOutOfRange(currentMagePos, posChange);
    if (isGameOver) {
        dispatch(
            Actions.gameOver()
        );
    } else if (isScored) {
        const newCoinPos = generateCoinPos(newMagePos, Constants.BOARD_SIZE);
        dispatch(
            Actions.updateStateWhenScored(
                type,
                currentMagePos,
                newMagePos,
                newCoinPos,
                img,
                coinImg
            )
        );
    } else {
        dispatch(
            Actions.updateStateWhenMove(
                type,
                currentMagePos,
                newMagePos,
                img
            )
        );
    }
}

const startDecrementCounter = (timer, dispatch) => {
    timer--;
    dispatch(
        Actions.decrementTimer()
    );

    let timerId = setTimeout(function tick() {
        if (timer === 0) {
            dispatch(
                Actions.gameOver()
            );
        } else {
            timer--;
            timerId = setTimeout(tick, 1000);
            dispatch(
                Actions.decrementTimer(timerId)
            );
        }
    }, 1000);
}

const isOutOfRange = (magePos, posChange) => {
    const outRangeList = Constants.OUT_OF_RANGE_SETUP[`${posChange}`];
    return outRangeList.includes(magePos);
}


const hasScored = (coinAndMagePos, posChange) => {
    const newMagePos = coinAndMagePos.mage - posChange;
    const result = newMagePos === coinAndMagePos.coin
        ? true
        : false;
    return result;
}
