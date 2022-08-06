import { makeMove } from "../board/boardActionCreators";
import { KEY_DOWN_SET_UP } from "../../constants";

export const callMakeMove = (props, keyDownCode, dispatch) => {
    const keyObj = KEY_DOWN_SET_UP[`${keyDownCode}`];
    makeMove(
        props.coinAndMagePos,
        props.img,
        props.coinImg,
        keyObj,
        dispatch,
        props.timer
    );
};