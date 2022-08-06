import React from "react";
import "./mobileControls.css";

const MobileControls = () => {

    return (
        <div className="button-container">
            <div className="button" id="button-left">
                &larr;
            </div>
            <div className="button" id="button-up">
                &darr;
            </div>
            <div className="button" id="button-down">
                &uarr;
            </div>
            <div className="button" id="button-right">
                &rarr;
            </div>
        </div>
    );
};

export default MobileControls;