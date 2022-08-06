import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import * as BoardReducers from "./components/board/boardReducer";
import * as GameReducers from "./components/game/gameReducer";
import * as scoreBoardReducers from "./components/scoreBoard/scoreBoardReducer";
import * as themeToggleReducer from "./components/themeToggle/themeToggleReducer";

const rootReducer = combineReducers({
    squares: BoardReducers.squares,
    coinAndMagePos: BoardReducers.coinAndMagePos,
    gameOver: BoardReducers.gameOver,
    score: BoardReducers.score,
    timer: BoardReducers.timer,
    keysPressed: BoardReducers.keysPressed,
    scoreboard: GameReducers.scoreboard,
    topScores: GameReducers.topScores,
    swapScoreBoard: scoreBoardReducers.swapScoreBoard,
    userName: scoreBoardReducers.userName,
    themeToggle: themeToggleReducer.switchMode,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export { store };