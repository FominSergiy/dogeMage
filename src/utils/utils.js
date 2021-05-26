import * as Constants from '../constants.js';
import { ButtonPanel } from '../features/button-controls/buttons.js';
import { GameOver } from '../features/game-over/gameOver.js';


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

export const renderBoard = (
    Board, 
    dispatch, 
    isGameOver, 
    squares, 
    coinAndMagePos, 
    score, 
    timer
) => {
    if (isGameOver) {
        const renderScore = renderGameOver(score);
        const img = Constants.GAME_OVER_IMG;

        return (
            <GameOver
                img={img}
                renderScore={renderScore}
            />
        )
    } else {
        return (
            <div className="game-board">
                <div className="score"><h2>Score: {score}</h2></div>
                <div className="timer"><h2>Time: {timer}</h2></div>
                <Board
                    class="board"
                    squares={squares}
                    coinAndMagePos={coinAndMagePos}
                    img={Constants.IMG}
                    coinImg={Constants.COIN}
                    dispatch={dispatch}
                    timer={timer}
                />
                {/* <ButtonPanel
                    coinAndMagePos={coinAndMagePos}
                    img={Constants.IMG}
                    coinImg={Constants.COIN}
                    timer={timer}
                /> */}
            </div>
        )
    }
}

export const renderInstructions = () => {
    return (
        <div className="instructions">
            <h1>DOGE Fairy Game!</h1>
            <h2>Rules:</h2>
            <h3>1. Use keyboard arrows (← ↑ ↓ →) to move your Fairy</h3>
            <h3>1. Use Enter key to restart</h3>
            <h3>2. If you move over the edge it's game over</h3>
            <h3>3. Collect as many DOGE in 60 sec to fly to the moon!</h3>
        </div>
    )
}

const renderGameOver = (score) => {
    const msg = getScoreMessage(score);

    return (
        <div className="finalScore">
            <h2>Your Score: {score}</h2>
            <h3>{msg}</h3>
        </div>
    )
}

const getScoreMessage = (score) => {
    let msg = null;

    if (score >= 0) msg='Try harder next time!';
    if (score > 5) msg='Are you sure you are using keyboard?';
    if (score > 10) msg='Your rocket crashed back on Earth!';
    if (score > 20) msg='I can see DODG high in the sky!';
    if (score > 50) msg='You are really good at this!';
    if (score > 100) msg='TO THE MOOOON!';

    return msg;
}