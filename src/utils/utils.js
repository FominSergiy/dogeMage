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

    return [initState, coinPos]
}

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
                />
            );
        };

        board.push(
            <div key={i} className="board-row">
                {row}
            </div>
        );

    };
    return board;
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