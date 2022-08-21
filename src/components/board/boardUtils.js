import React from "react";
import { OUT_OF_RANGE_SETUP } from "../../constants.js";

export const checkForKeys = (keysState) => {
    let keysPressed = 0;
    Object.keys(keysState).forEach(
        key => {
            if (keysState[key].pressed === true) {
                keysPressed += 1;
            }
        });

    const isMoveMade = keysPressed === 1 ? true : false;
    return [isMoveMade];
};

export const getInitState = (size, startingPos, mage, coin) => {
    const coinPos = generateCoinPos(startingPos, size);
    const boardSize = Math.pow(size, 2);
    const initObj = {};

    const initState = Array(boardSize).fill(null).reduce(
        (obj, item, index) => {

            const setMage = startingPos === index
                ? mage
                : null;

            const setCoin = coinPos === index
                ? coin
                : null;

            const squareObj = {
                value: null,
                id: index,
                mage: setMage,
                coin: setCoin
            };

            return {
                ...obj,
                [index]: squareObj
            };
        }, initObj
    );

    return [initState, coinPos];
};

export const generateBoard = (squaresObj, Square, rowLength) => {
    const keys = Object.keys(squaresObj);
    const board = [];

    for (let i = 0; i < keys.length; i += rowLength) {

        const rowEndIndex = i + rowLength;
        let row = [];

        for (let j = i; j < rowEndIndex; j++) {
            row.push(
                <Square
                    key={j}
                    id={j}
                    squareObj={squaresObj[j]}
                    dataTestId={j}
                />
            );
        }

        board.push(
            <div key={i} className="board-row">
                {row}
            </div>
        );

    }
    return board;
};


export const isOutOfRange = (magePos, posChange) => {
    const outRangeList = OUT_OF_RANGE_SETUP[`${posChange}`];
    return outRangeList.includes(magePos);
};


export const hasScored = (coinAndMagePos, posChange) => {
    const newMagePos = coinAndMagePos.mage - posChange;
    const result = newMagePos === coinAndMagePos.coin
        ? true
        : false;
    return result;
};


export const generateCoinPos = (magePos, size) => {
    const boardSize = Math.pow(size, 2);
    const coinPos = Math.floor(Math.random() * boardSize);

    if (coinPos === magePos) {
        const backUpPos = generateCoinPos(magePos, size);
        return backUpPos;

    } else {
        return coinPos;
    }
};
