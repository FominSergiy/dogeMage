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
    const [screenSize, setWindowSize] = React.useState(Utils.getScreenSize());
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize((Utils.getScreenSize()));
        };
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

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    },[dispatch, doSwap]);

    const isSmall = screenSize === Constants.SCREEN_SIZES.small;

    if (isGameOver) {
        clearTimeout(timerId);
    }

    return (
        <div className="game">
            <ThemeToggle />
            {!isGameOver && (
                Utils.renderBoard(
                    Board,
                    squares,
                    coinAndMagePos,
                    score,
                    timer,
                    screenSize
                )
            )}
            {isGameOver && (
                Utils.renderGameOverBoard(
                    score,
                    screenSize
                )
            )}
            {isSmall && !isGameOver && (
                <MobileControls
                    squares={squares}
                    coinAndMagePos={coinAndMagePos}
                    img={Constants.IMG}
                    coinImg={Constants.COIN}
                    timer={timer}
                />
            )}
            {!isGameOver && (Utils.renderInstructions())}
        </div>
    );
};

export default Game;