import React from "react";
import "./mobileControls.css";
import { useDispatch, useSelector } from "react-redux";
import { callMakeMove } from "./mobileControlsUtils";

const MobileControls = (props) => {
    const theme = useSelector(store => store.themeToggle).theme;
    const dispatch = useDispatch();

    return (
        <div className="button-container" >
            <button
                className={`button ${theme}`}
                id="button-left"
                onClick={() =>
                    callMakeMove(props, "37", dispatch)
                }
            >
                &larr;
            </button>
            <button
                className={`button ${theme}`}
                id="button-up"
                onClick={() =>
                    callMakeMove(props, "40", dispatch)
                }
            >
                &darr;
            </button>
            <button
                className={`button ${theme}`}
                id="button-down"
                onClick={() =>
                    callMakeMove(props, "38", dispatch)
                }
            >
                &uarr;
            </button>
            <button
                className={`button ${theme}`}
                id="button-right"
                onClick={() =>
                    callMakeMove(props, "39", dispatch)
                }
            >
                &rarr;
            </button>
        </div>
    );
};

export default MobileControls;