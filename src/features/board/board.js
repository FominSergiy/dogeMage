import React from 'react';

import * as Utils from '../../utils/utils.js';
import * as Constants from '../../constants.js';
import { Square } from '../../features/square/square.js';
import { makeMove } from '../../features/button-controls/buttonUtils.js';
import { useDispatch, useSelector } from 'react-redux';
import { setKeysDown } from '../../redux/actions.js';

export const Board = (props) => {
    console.log('render')
    // adding here since this components unmounts if we lose the game
    // const keysState = useSelector(store => store.keysPressed);
    const dispatch = useDispatch();
    const keyDowns = useSelector(store => store.keysPressed); 
    console.dir(keyDowns);
    
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            dispatch(
                setKeysDown(
                    e.keyCode,
                    true    
                )
            );
            // console.log(`%c pressed:${e.keyCode}..down.${keysState[e.keyCode].pressed}`, 'background: #222; color: #bada55');
            // console.dir(keysState)
        }
        window.addEventListener('keydown', handleKeyDown);

        const handleKeyUp = (e) => {
            dispatch(
                setKeysDown(
                    e.keyCode,
                    false
                )
            );
            // console.log(`pressed:${e.keyCode}..up.${keysState[e.keyCode].pressed}`);
            // console.dir(keysState)
        }
        window.addEventListener('keyup', handleKeyUp);

        

        return () => {
            // cleanup this component
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };

    }, [dispatch]);


    // only accept single keyDown as a move made.
    const [isMoveMade, keyCode] = checkForKeys(keyDowns);
    
    if (isMoveMade) {
        console.log(keyCode);
        const keyObj = Constants.KEY_DOWN_SET_UP[`${keyCode}`];
        console.log('keyObj below');
        console.dir(keyObj)
        makeMove(
            props.coinAndMagePos,
            props.img,
            props.coinImg,
            keyObj,
            dispatch,
            props.timer
        );
    }

    const board = Utils.generateBoard(
        props.squares,
        Square,
        Constants.BOARD_SIZE
    );

    return (
        <div className={props.class}>
            {board}
        </div>
    );
}

const checkForKeys = (keysState) => {
    let keysPressed = 0;
    const keyCode = []; //should only contain a single value

    Object.keys(keysState).forEach(
        key => {
            if (keysState[key].pressed === true) {
                keysPressed += 1;
                keyCode.push(key);
            }
    });

    const isMoveMade = keysPressed === 1 ? true : false;
    console.log(`keyState: ${keysPressed}`);
    return [isMoveMade, keyCode[0]];
}