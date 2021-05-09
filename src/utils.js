export const getInitState = (size) => {
    const boardSize = Math.pow(size, 2);
    const initObj = {};

    const initState = Array(boardSize).fill(null).reduce(
        (obj, item, index) => {
            return {
                ...obj,
                [index]: {
                    value: null,
                    id: index
                }
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
                    value={squaresObj[j]['value']}
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
