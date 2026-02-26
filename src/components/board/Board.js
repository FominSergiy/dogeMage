import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import * as Constants from "../../constants.js";
import Square from "../square/Square.js";
import { makeMove } from "./boardActionCreators.js";
import { setKeysDown } from "./boardActions.js";
import { generateBoard } from "./boardUtils.js";

const Board = (props) => {
  // adding here since this components unmounts if we lose the game
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const keyObj = Constants.KEY_DOWN_SET_UP[`${e.keyCode}`];
      if (!keyObj) return;

      dispatch(setKeysDown(e.keyCode, true));
      makeMove(
        props.coinAndMagePos,
        props.img,
        props.coinImg,
        keyObj,
        dispatch,
        props.timer
      );
    };

    const handleKeyUp = (e) => {
      dispatch(setKeysDown(e.keyCode, false));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch, props]);

  const board = generateBoard(props.squares, Square, Constants.BOARD_SIZE);

  return <div className={props.class}>{board}</div>;
};

Board.propTypes = {
  coinAndMagePos: PropTypes.object,
  img: PropTypes.string,
  coinImg: PropTypes.string,
  timer: PropTypes.number,
  squares: PropTypes.object,
  class: PropTypes.string,
};

export default Board;
