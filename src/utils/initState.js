export const getInitState = (size, startingPos, mage_img) => {
    const boardSize = Math.pow(size, 2);
    const initObj = {};

    const initState = Array(boardSize).fill(null).reduce(
        (obj, item, index) => {

            const setMagePos = startingPos === index
                ? mage_img
                : null;

            const squareObj = {
                value: null,
                id: index,
                mage: setMagePos,
                matter: null
            };

            return {
                ...obj,
                [index]: squareObj
            };
        }, initObj
    );

    return initState;
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
