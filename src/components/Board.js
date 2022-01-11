import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as Constants from "../constants.js";
import Square from "./Square.js";
import { checkForKeys, generateBoard } from "../utils/boardUtils.js";
import { makeMove } from "../actionCreators/boardActionCreators.js";
import { setKeysDown } from "../actions/boardActions.js";

const Board = (props) => {
    // adding here since this components unmounts if we lose the game
    const dispatch = useDispatch();
    const keyDowns = useSelector(store => store.keysPressed);

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            dispatch(
                setKeysDown(
                    e.keyCode,
                    true
                )
            );
        };
        window.addEventListener("keydown", handleKeyDown);

        const handleKeyUp = (e) => {
            dispatch(
                setKeysDown(
                    e.keyCode,
                    false
                )
            );
        };
        window.addEventListener("keyup", handleKeyUp);

        const registerMove = (event) => {
            // only accept single keyDown as a move made.
            const isMoveMade = checkForKeys(keyDowns);

            const keysFromSetUp = Constants.KEY_DOWN_SET_UP;
            const isInCodes = Object.keys(keysFromSetUp).includes(`${event.keyCode}`)
                ? true
                : false;

            if (isMoveMade && isInCodes) {
                const keyObj = Constants.KEY_DOWN_SET_UP[`${event.keyCode}`];
                makeMove(
                    props.coinAndMagePos,
                    props.img,
                    props.coinImg,
                    keyObj,
                    dispatch,
                    props.timer
                );
            }
        };
        window.addEventListener("keyup", registerMove);

        return () => {
            // cleanup this component
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", registerMove);
            window.removeEventListener("keyup", handleKeyUp);
        };

    }, [dispatch, props, keyDowns]);


    const board = generateBoard(
        props.squares,
        Square,
        Constants.BOARD_SIZE
    );

    return (
        <div className={props.class}>
            {board}
        </div>
    );
};

Board.propTypes = {
    coinAndMagePos : PropTypes.object,
    img : PropTypes.string,
    coinImg : PropTypes.string,
    timer : PropTypes.number,
    squares : PropTypes.object,
    class : PropTypes.string,
};

export default Board;