import { useDispatch } from "react-redux"
import * as Utils from "./buttonUtils.js"

export const ButtonPanel = (props) => {
    const buttons = Utils.buttonSetUp(Button, props);

    return (
        <div className='controls'>
            {buttons}
        </div>
    )
}

const Button = (props) => {
    const dispatch = useDispatch();
    return (
        <div className={props.class} onClick={() => props.makeMove(
            props.coinAndMagePos,
            props.img,
            props.coinImg,
            props.buttonObj,
            dispatch,
            props.timer
        )}>
            {props.value}
        </div>
    )
}