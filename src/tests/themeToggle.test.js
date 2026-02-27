import userEvent from "@testing-library/user-event";
import React from "react";
import ThemeToggle from "../components/themeToggle/ThemeToggle";
import styles from "../components/themeToggle/themeToggleStyle";
import { renderWithProviders } from "./testUtils";

test("It renders theme toggle", () => {
  const container = renderWithProviders(<ThemeToggle />);
  expect(container.getByRole("button")).toBeTruthy();
  expect(container.getByRole("button").className).toContain(
    styles.button.className
  );
  expect(container.getByRole("button").title).toContain(styles.button.title);
});

test("It renders sun image when light default theme", () => {
  const container = renderWithProviders(<ThemeToggle />);
  expect(container.container.querySelectorAll('circle')).toHaveLength(1);
});

test("It renders dark image when dark theme toggled", async () => {
  const container = renderWithProviders(<ThemeToggle />);
  const button = container.getByRole("button");
  expect(container.container.querySelectorAll('circle')).toHaveLength(1);

  await userEvent.click(button);

  expect(container.container.querySelectorAll('circle')).toHaveLength(2);
});
