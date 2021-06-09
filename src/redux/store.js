import * as Reducers from './reducers.js'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    squares: Reducers.squares,
    coinAndMagePos: Reducers.coinAndMagePos,
    gameOver: Reducers.gameOver,
    score: Reducers.score,
    timer: Reducers.timer,
    scoreboard: Reducers.scoreboard
});

const store = createStore(
    rootReducer, 
    applyMiddleware(thunkMiddleware)
);

export { store };