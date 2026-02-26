import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import Game from "./components/game/Game";
import "./index.css";
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Game />
  </Provider>
);
