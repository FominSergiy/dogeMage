import { BUTTON_SETUP } from "../constants.js"


export const buttonSetUp = (Button, props) => {
    const buttons = Object.keys(BUTTON_SETUP).map(key => {
        const buttonObj = BUTTON_SETUP[key];

        return (
            <Button
                key={key}
                class='button'
                value={key}
                makeMove={makeMove}
                currentPos={props.currentPos}
                buttonObj={buttonObj}
                img={props.img}
            />
        )
    })

    return buttons;
}

const makeMove = (currentPos, img, buttonObj, dispatch) => {
    const posChange = buttonObj['posChange'];
    const type = buttonObj['type'];

    dispatch({
        type: type,
        currentPos: currentPos,
        newPos: currentPos - posChange,
        img: img
    });
    dispatch({
        type: 'UPDATE_POSITION',
        position: currentPos - posChange
    });
}