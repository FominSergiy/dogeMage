import { createStore, combineReducers } from 'redux';
import { BOARD_SIZE } from './constants.js';
import { getInitState } from './utils.js';

const initState = getInitState(BOARD_SIZE);


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