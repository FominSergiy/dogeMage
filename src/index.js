import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store.js'
import { Provider } from 'react-redux';
import './index.css';
import Game from './components/Game';

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);
