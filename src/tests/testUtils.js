import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import * as BoardReducers from "../components/board/boardReducer";
import * as GameReducers from "../components/game/gameReducer";
import * as scoreBoardReducers from "../components/scoreBoard/scoreBoardReducer";
import * as themeToggleReducer from "../components/themeToggle/themeToggleReducer";



export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
        reducer: {
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
        }, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}