import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/button-controls.css';

import { store } from './redux/store.js'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import * as Utils from './utils/utils.js';
import * as Constants from './constants.js';
import { getScoreBoardThunk } from './redux/actions.js'
import { Board } from './features/board/board.js';



const Game = () => {
    const score = useSelector(store => store.score);
    const dispatch = useDispatch();
    const isGameOver = useSelector(store => store.gameOver);
    const squares = useSelector(store => store.squares);
    const coinAndMagePos = useSelector(store => store.coinAndMagePos);
    const timer = useSelector(store => store.timer.time);
    const timerId = useSelector(store => store.timer.timerId);
    const doSwap = useSelector(store => store.doSwap);

    React.useEffect(() => {
        // get top scores, sort then, and save in store
        // doSwap is set if a new score record is achieved
        // it is reset to false when a record has successfully commited
        // to store. In this case, we need results re-render.
        if(!doSwap)
            dispatch(
                getScoreBoardThunk(
                    Constants.PARTITION_KEY,
                    Constants.scoreBoardLength
                )
            );
    }, [dispatch, doSwap]);

    const render = Utils.renderBoard(
        Board,
        dispatch,
        isGameOver,
        squares,
        coinAndMagePos,
        score,
        timer,
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
