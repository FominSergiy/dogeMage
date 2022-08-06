export const updateBodyThemeClass = (theme, switchTo) => {
    const baseClassName = "body-theme";
    document.body.classList.remove(`${baseClassName}-${switchTo}`);
    document.body.classList.add(`${baseClassName}-${theme}`);
};