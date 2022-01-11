import React from "react";
import PropTypes from "prop-types";

const Score = (props) => {
    return (
        <div className="row">
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