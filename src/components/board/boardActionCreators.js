import * as Actions from "./boardActions.js";
import * as Utils from "./boardUtils.js";
import * as Constants from "../../constants.js";

export const startDecrementCounter = (timer, dispatch) => {
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
};

export const makeMove = (coinAndMagePos, img, coinImg, obj, dispatch, timer) => {
    if (timer === 60) startDecrementCounter(timer, dispatch); // start time ticks on first move

    // do a check to see if we have gone over the boarder first
    const currentMagePos = coinAndMagePos.mage;
    const posChange = obj["posChange"];
    const type = obj["type"];

    const newMagePos = currentMagePos - posChange;
    const isScored = Utils.hasScored(coinAndMagePos, posChange);


    const isGameOver = Utils.isOutOfRange(currentMagePos, posChange);
    if (isGameOver) {
        dispatch(
            Actions.gameOver()
        );
    } else if (isScored) {
        const newCoinPos = Utils.generateCoinPos(newMagePos, Constants.BOARD_SIZE);
        dispatch(
            updateStateWhenScored(
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
            updateStateWhenMove(
                type,
                currentMagePos,
                newMagePos,
                img
            )
        );
    }
};

const updateStateWhenMove = (
    type,
    curMagePos,
    newMagePos,
    img,
) => dispatch => {
    dispatch(
        Actions.updateMageSquare(
            type,
            curMagePos,
            newMagePos,
            img,
        )
    );
    dispatch(
        Actions.updateMagePos(newMagePos)
    );
};

const updateStateWhenScored = (
    type,
    curMagePos,
    newMagePos,
    newCoinPos,
    img,
    coinImg,
) => dispatch => {
    dispatch(
        Actions.updateCoinSquare(
            type,
            curMagePos,
            newMagePos,
            newCoinPos,
            img,
            coinImg
        )
    );
    dispatch(
        Actions.updateCoinMagePos(
            newMagePos,
            newCoinPos
        )
    );
    dispatch(
        Actions.addOne()
    );
};