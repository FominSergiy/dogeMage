import React from "react";
import "./mobileControls.css";
import { useSelector } from "react-redux";

const MobileControls = () => {
    const theme = useSelector(store => store.themeToggle).theme;

    return (
        <div className="button-container">
            <div className={`button ${theme}`} id="button-left">
                &larr;
            </div>
            <div className={`button ${theme}`} id="button-up">
                &darr;
            </div>
            <div className={`button ${theme}`} id="button-down">
                &uarr;
            </div>
            <div className={`button ${theme}`} id="button-right">
                &rarr;
            </div>
        </div>
    );
};

export default MobileControls;