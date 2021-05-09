import { BUTTON_SETUP } from "../constants.js"


export const buttonSetUp = (Button, squares) => {
    const buttons = Object.keys(BUTTON_SETUP).map(key => {
        const buttonObj = BUTTON_SETUP[key];

        return (
            <Button
                key={key}
                class='button'
                value={key}
                makeMove={makeMove}
                squares={squares}
                buttonObj={buttonObj}
            />
        )
    })

    return buttons;
}

const makeMove = (props, buttonObj, dispatch) => {

    const posChange = buttonObj['posChange'];
    const type = buttonObj['type'];

    dispatch({
        type: type,
        currentPos: props.currentPos,
        newPos: props.currentPos - posChange,
        img: props.img
    });
    dispatch({
        type: 'UPDATE_POSITION',
        position: props.currentPos - posChange
    });

}