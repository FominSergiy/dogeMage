import { THEMES } from "../../constants";

const initState = { theme: THEMES.light };

export const switchMode = (state=initState, action) => {
    switch(action.type) {
    case "SWITCH_TO_DARK":
        return {
            ...state,
            theme: action.theme
        };
    case "SWITCH_TO_LIGHT":
        return {
            ...state,
            theme: action.theme
        };
    default:
        return state;
    }
};