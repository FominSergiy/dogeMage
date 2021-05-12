import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/button-controls.css';

import { store } from './reducer.js'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import * as Utils from './utils/initState.js';
import * as Constants from './constants.js';
import { Square } from './features/square/square.js';
import { ButtonPanel } from './features/button-controls/buttons.js';
import { gameReset } from './utils/indexUtils.js';


const Board = (props) => {
    const board = Utils.generateBoard(
        props.squares,
        Square,
        Constants.BOARD_SIZE
    );

    return (
        <div className={props.class}>
            {board}
        </div>
    );
}


const Game = () => {
    const score = useSelector(store => store.score);
    const dispatch = useDispatch();
    const isGameOver = useSelector(store => store.gameOver);
    const squares = useSelector(store => store.squares);
    const coinAndMagePos = useSelector(store => store.coinAndMagePos);

    const render = renderBoard(
        dispatch,
        isGameOver,
        squares,
        coinAndMagePos,
        score
    )

    return (
        <div className="game">
            {render}
        </div>
    );
}

// ========================================

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);

function renderBoard(dispatch, isGameOver, squares, coinAndMagePos, score) {
    if (isGameOver) {
        return (
            <div className="game-board">
                <div className="score">Score: {score}</div>
                <div className="board lost">YOU LOST YOU FILTY COW!</div>
                <button onClick={() =>
                    dispatch({
                        type: 'RESET',
                    })
                }>restart</button>
            </div >
        )
    } else {
        return (
            <div className="game-board">
                <div className="score">Score: {score}</div>
                <Board class="board" squares={squares} />
                <ButtonPanel
                    coinAndMagePos={coinAndMagePos}
                    img={Constants.IMG}
                />
            </div>
        )
    }
}
