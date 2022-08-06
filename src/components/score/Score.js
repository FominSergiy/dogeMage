import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./score.css";

const Score = (props) => {
    const theme = useSelector(store => store.themeToggle).theme;
    return (
        <div className={`row ${theme}`}>
            <div className="row-sub" id="index">
                {props.index}
            </div>
            <div className="row-sub" id="name">
                {props.user}
            </div>
            <div className="row-sub" id="score">
                {props.score}
            </div>
        </div>
    );
};

Score.propTypes = {
    index : PropTypes.number,
    user : PropTypes.string,
    score : PropTypes.number
};

export default Score;