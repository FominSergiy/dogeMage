import { useDispatch } from "react-redux";
import React from 'react';

export const GameOver = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const isReset = event.keyCode === 13
                ? true
                : false;
    
            if (isReset) {
                dispatch({
                    type: 'RESET',
                })
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // cleanup this component
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [dispatch]);

    return (
        <div className="game-board">
                <div className="board lost">
                    <img src={props.img} 
                         style={{ width: "25%", height: "25%" }} 
                         alt='nothing'
                    />
                    {props.renderScore}
                </div>
                <button className="resetButton" onClick={() =>
                    dispatch({
                        type: 'RESET',
                    })
                }>restart</button>
        </div>
    )
}