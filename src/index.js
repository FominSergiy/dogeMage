import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/button-controls.css';

import { store } from './reducer.js'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import * as Utils from './utils.js';
import { BOARD_SIZE } from './constants.js';
import { Square } from './features/square/square.js';
import { Buttons } from './features/button-controls/buttons.js';


const Board = (props) => {
    const board = Utils.generateBoard(
        props.squares,
        Square,
        BOARD_SIZE
    );

    return (
        <div className={props.class}>
            {board}
        </div>
    );
}


const Game = () => {
    const squares = useSelector(store => store);
    return (
        <div className="game">
            <div className="game-board">
                <Board class="board" squares={squares} />
                <Buttons />
            </div>
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

