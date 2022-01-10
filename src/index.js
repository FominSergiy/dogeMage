import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/button-controls.css';
import { store } from './store.js'
import { Provider } from 'react-redux';
import Game from './components/Game';

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);
