import React from 'react';
import { renderWithProviders } from './testUtils';
import ThemeToggle from '../components/themeToggle/ThemeToggle';
import styles from "../components/themeToggle/themeToggleStyle";

test('It renders theme toggle', () => {
    const container = renderWithProviders(
        <ThemeToggle />
    );
    expect(container.getByRole('button')).toBeTruthy();
    expect(container.getByRole('button').className).toContain(styles.button.className);
    expect(container.getByRole('button').title).toContain(styles.button.title);
});

test('It renders sun image when light default theme', () => {
    const container = renderWithProviders(
        <ThemeToggle />
    );
    expect(container.getByTestId('circleSun')).toBeTruthy();
});

test('It renders dark image when dark theme toggled', () => {
    const container = renderWithProviders(
        <ThemeToggle />
    );
    expect(container.getByTestId('circleSun')).toBeTruthy();

   container.getByRole('button').click();

   expect(container.getByTestId('circleSun')).toBeTruthy();
   expect(container.getByTestId('circleMoon')).toBeTruthy();
});
