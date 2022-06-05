// export generic object with keys
// reprenseting elements for which styles are intended
const styles = {
    button: {
        "className": "theme-toggle",
        "title": "Toggle light and dark",
        "aria-label": "auto",
        "aria-live": "polite"
    },
    svg: {
        "className": "sun-and-moon",
        "aria-hidden": "true",
        "viewBox": "0 0 24 24",
    },
    circleSun: {
        "className": "sun",
        "cx": 12,
        "cy": 12,
        "r": 6,
        "mask": "url(#moon-mask)",
        "fill": "currentColor",
    }
};

export default styles;