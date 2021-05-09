import { createStore, combineReducers } from 'redux';
import { BOARD_SIZE, MAGE_START_POS, IDLE_IMG } from './constants.js';
import { getInitState } from './utils.js';

const initState = getInitState(
    BOARD_SIZE,
    MAGE_START_POS,
    IDLE_IMG
);


// each square calls this and gets updated state
const squares = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};



// const rootReducer = combineReducers({
//     squares: squaresReducer,
//     whoIsNext: whoIsNextReducer
// });

const store = createStore(squares);
export { store };