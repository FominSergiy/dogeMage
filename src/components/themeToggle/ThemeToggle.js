import React from "react";
import "./themeToggle.css";
import styles from "./themeToggleStyle";
// import { THEMES } from "../../constants";

const ThemeToggle = () => {

    const svgWidth = 24;
    const svgHeight = 30;
    return(
        <button
            {...styles.button}
        >
            <svg
                {...styles.svg}
                width={svgWidth}
                height={svgHeight}
            >
                <circle {...styles.circleSun} />
                <g className="sun-beams" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
            </svg>
        </button>
    );
};

export default ThemeToggle;