import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./score.css";

const Score = (props) => {
    const theme = useSelector(store => store.themeToggle).theme;
    const screenSize = props.screenSize;

    return (
        <div className={`row ${theme}`}>
            <div className="row-sub" id={`index-${screenSize}`}>
                {props.index}
            </div>
            <div className="row-sub" id={`name-${screenSize}`}>
                {props.user}
            </div>
            <div className="row-sub" id={`score-${screenSize}`}>
                {props.score}
            </div>
        </div>
    );
};

Score.propTypes = {
    index : PropTypes.number,
    user : PropTypes.string,
    score : PropTypes.number,
    screenSize: PropTypes.string,
};

export default Score;