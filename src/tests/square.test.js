import Square from '../components/square/Square';
import React from 'react';
import { IMG, COIN } from '../constants';
import { renderWithProviders } from './testUtils';

const propsObj = {
    coin: null,
    id: 1,
    mage: null,
    value: null
}

test('It renders square', () => {
    const container = renderWithProviders(
        <Square
            squareObj={propsObj}
            key={1}
            id={1}
            dataTestId={1}
        />
    );
    expect(container.getByTestId('1').className).toContain('square');
});

test('It renders mage when mage in props', () => {
    const mageProps = {
        ...propsObj,
        mage: IMG
    };

    const container = renderWithProviders(
        <Square
            squareObj={mageProps}
            key={1}
            id={1}
            dataTestId={1}
        />
    );
    expect(container.getByRole('img')).toBeTruthy();
    expect(container.getByRole('img').src).toContain(IMG);
});

test('It renders coin when coin in props', () => {
    const coinProps = {
        ...propsObj,
        coin: COIN
    };

    const container = renderWithProviders(
        <Square
            squareObj={coinProps}
            key={1}
            id={1}
            dataTestId={1}
        />
    );
    expect(container.getByRole('img')).toBeTruthy();
    expect(container.getByRole('img').src).toContain(COIN);
});