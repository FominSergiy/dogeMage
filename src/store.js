import { configureStore, Tuple } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
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

const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(thunkMiddleware),
});

export { store };
