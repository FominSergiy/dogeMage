import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/button-controls.css';

import { store } from './reducer.js'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import * as Utils from './utils/utils.js';
import * as Constants from './constants.js';
import { Square } from './features/square/square.js';
import { makeMove } from './features/button-controls/buttonUtils.js';


const Board = (props) => {
    // adding here since this components unmounts if we lose the game
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const keyCodes = Object.keys(Constants.KEY_DOWN_SET_UP);
            const isMoveMade = keyCodes.includes(`${event.keyCode}`)
                ? true
                : false;
    
            if (isMoveMade) {
                const keyObj = Constants.KEY_DOWN_SET_UP[`${event.keyCode}`];
                makeMove(
                    props.coinAndMagePos,
                    props.img,
                    props.coinImg,
                    keyObj,
                    props.dispatch,
                    props.timer
                );
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // cleanup this component
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [props]);

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
    const timer = useSelector(store => store.timer.time);
    const timerId = useSelector(store => store.timer.timerId);

    const render = Utils.renderBoard(
        Board,
        dispatch,
        isGameOver,
        squares,
        coinAndMagePos,
        score,
        timer
    );


    let renderInstructions = Utils.renderInstructions();


    if (isGameOver)  {
        clearTimeout(timerId);
        renderInstructions = null;
    }
    
    return (
        <div className="game">
            {render}
            {renderInstructions}
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
