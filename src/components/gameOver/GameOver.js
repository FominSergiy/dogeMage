import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "./gameOver.css";

const GameOver = (props) => {
    const dispatch = useDispatch();
    const isNewTopTenScore = useSelector(store => store.swapScoreBoard);
    const theme = useSelector(store => store.themeToggle).theme;

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const isReset = event.keyCode === 13
                ? true
                : false;

            if (isReset && !isNewTopTenScore) {
                dispatch({
                    type: "RESET",
                });
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            // cleanup this component
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [dispatch, isNewTopTenScore]);

    return (
        <div className="game-board">
            <div className="board lost">
                <img src={props.img}
                    style={{ width: "25%", height: "25%" }}
                    alt='nothing'
                />
                {props.renderScore}
            </div>
            <button className={`resetButton ${theme}`} onClick={() =>
                dispatch({
                    type: "RESET",
                })
            }>restart</button>
        </div>
    );
};

GameOver.propTypes = {
    img : PropTypes.string,
    renderScore : PropTypes.number,
};

export default GameOver;