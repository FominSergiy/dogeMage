import { useDispatch } from "react-redux"
import * as Utils from "../../utils/buttonUtils.js"

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
            props.currentPos,
            props.img,
            props.buttonObj,
            dispatch
        )}>
            {props.value}
        </div>
    )
}