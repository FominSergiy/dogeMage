import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../index.css";
import "./game.css";
import * as Utils from "./gameUtils.js";
import * as Constants from "../../constants.js";
import { getScoreBoardThunk } from "./gameThunkCreators.js";
import Board from "../board/Board.js";
import ThemeToggle from "../themeToggle/ThemeToggle";
import MobileControls from "../mobileControls/MobileControls";


const Game = () => {
    const score = useSelector(store => store.score);
    const isGameOver = useSelector(store => store.gameOver);
    const squares = useSelector(store => store.squares);
    const coinAndMagePos = useSelector(store => store.coinAndMagePos);
    const timer = useSelector(store => store.timer.time);
    const timerId = useSelector(store => store.timer.timerId);
    const doSwap = useSelector(store => store.doSwap);
    const dispatch = useDispatch();

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

    const screenSize = Utils.getScreenSize();
    const isSmall = screenSize === Constants.SCREEN_SIZES.small;

    const render = Utils.renderBoard(
        Board,
        isGameOver,
        squares,
        coinAndMagePos,
        score,
        timer,
        screenSize
    );
    let renderInstructions = Utils.renderInstructions();

    if (isGameOver) {
        clearTimeout(timerId);
        renderInstructions = null;
    }

    let renderMobileControls = null;
    if (isSmall) {
        renderMobileControls = <MobileControls />;
    }

    return (
        <div className="game">
            <ThemeToggle />
            {render}
            {renderMobileControls}
            {renderInstructions}
        </div>
    );
};

export default Game;