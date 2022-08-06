import React from "react";
import PropTypes from "prop-types";
import { getImage } from "./squareUtils";
import { useSelector } from "react-redux";
import "./square.css";
import { getScreenSize } from "../game/gameUtils";


const Square = (props) => {
    const theme = useSelector(store => store.themeToggle).theme;
    const screenSize = getScreenSize();
    const squareObj = props.squareObj;

    const mage = getImage("mage", squareObj.mage);
    const coin = getImage("coin", squareObj.coin);

    return (
        <div className={`square ${theme} ${screenSize}`} id={props.id} >
            {mage || coin}
        </div>
    );
};

Square.propTypes = {
    squareObj : PropTypes.object,
    mage : PropTypes.string,
    coin : PropTypes.string,
    id : PropTypes.number
};

export default Square;