import React from 'react';
import App from '../components/Board.js';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../store.js';
// import * as mockData from './mock-data.json';
import { processStudentsData } from '../utils/containerUtils';
import { setStudents } from '../actions/containerAction';


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


test('Check if all components are rendering', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>
        , container);

    expect(getByTestId('main')).toBeInTheDocument();
    expect(getByTestId('container')).toBeInTheDocument();
    expect(getByTestId('name-search-bar')).toBeInTheDocument();
    expect(getByTestId('tag-search-bar')).toBeInTheDocument();
});

test('Check if input placeholders are rendered', () => {
    const { getByPlaceholderText } = render(
        <Provider store={store}>
            <App />
        </Provider>
        , container);

    expect(getByPlaceholderText('Search by name')).toBeInTheDocument();
    expect(getByPlaceholderText('Search by tag')).toBeInTheDocument();
});

test('Student components are rendered if data provided', () => {
    // mock contains 2 students
    const data = processStudentsData(mockData.students);
    store.dispatch(setStudents(data));

    const { getAllByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>
        , container);

    const studentCount = getAllByTestId(/student/).length;
    expect(studentCount).toBe(2);
});