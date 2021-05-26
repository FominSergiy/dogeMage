import React from 'react';

import * as Utils from '../../utils/utils.js';
import * as Constants from '../../constants.js';
import { Square } from '../../features/square/square.js';
import { makeMove } from '../../features/button-controls/buttonUtils.js';

export const Board = (props) => {
    // adding here since this components unmounts if we lose the game
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const keyCodes = Object.keys(Constants.KEY_DOWN_SET_UP);
            const isMoveMade = keyCodes.includes(`${event.keyCode}`)
                ? true
                : false;
    
            if (isMoveMade) {
                const keyObj = Constants.KEY_DOWN_SET_UP[`${event.keyCode}`];
                makeMove(
                    props.coinAndMagePos,
                    props.img,
                    props.coinImg,
                    keyObj,
                    props.dispatch,
                    props.timer
                );
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // cleanup this component
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [props]);

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