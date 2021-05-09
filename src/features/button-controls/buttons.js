import { useDispatch } from "react-redux"
import * as Utils from "../../utils/buttonsSetup.js"

export const Buttons = (props) => {
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
            props.squares,
            props.buttonObj,
            dispatch
        )}>
            {props.value}
        </div>
    )
}