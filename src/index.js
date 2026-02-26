import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import Game from "./components/game/Game";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Game />
    </Provider>
);
