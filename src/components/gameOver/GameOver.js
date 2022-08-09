import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "./gameOver.css";
import styles from "./gameOverStyle";

const GameOver = (props) => {
    const dispatch = useDispatch();
    const isNewTopTenScore = useSelector(store => store.swapScoreBoard);
    console.log(isNewTopTenScore);
    const theme = useSelector(store => store.themeToggle).theme;
    const screenSize = props.screenSize;

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
        <div className={`game-board ${screenSize}`}>
            <div className={`board lost-${screenSize}`}>
                <img src={props.img}
                    style={styles[`${screenSize}`].gameovergirl}
                    alt='nothing'
                />
                {props.renderScore}
            </div>
            <button className={`resetButton-${screenSize} ${theme}`} onClick={() =>
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
    screenSize: PropTypes.string
};

export default GameOver;