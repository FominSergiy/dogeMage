import React from 'react';

import * as Utils from '../../utils/utils.js';
import * as Constants from '../../constants.js';
import { Square } from '../../features/square/square.js';
import { makeMove } from '../../features/button-controls/buttonUtils.js';
import { useDispatch, useSelector } from 'react-redux';
import { setKeysDown } from '../../redux/actions.js';

export const Board = (props) => {
    // adding here since this components unmounts if we lose the game
    // const keysState = useSelector(store => store.keysPressed);
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
        }
        window.addEventListener('keydown', handleKeyDown);

        const handleKeyUp = (e) => {
            dispatch(
                setKeysDown(
                    e.keyCode,
                    false
                )
            );
        }
        window.addEventListener('keyup', handleKeyUp);

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
        }
        window.addEventListener('keyup', registerMove);

        return () => {
            // cleanup this component
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', registerMove);
            window.removeEventListener('keyup', handleKeyUp);
        };

    }, [dispatch, props, keyDowns]);


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
    Object.keys(keysState).forEach(
        key => {
            if (keysState[key].pressed === true) {
                keysPressed += 1;
            }
    });

    const isMoveMade = keysPressed === 1 ? true : false;
    return [isMoveMade];
}