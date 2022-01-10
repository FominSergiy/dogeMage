import { setNewScoreThunk } from "../store/thunkCreators/nameFormThunkCreators";

export const handleSubmit = (event, userName, whichIndex, itemAtIndex, score, dispatch) => {
    event.preventDefault();

    if (userName.trim().length === 0)
        alert('You can\'t submit a blank form!');

    // run through regex
    const isOnlyStandardChars = /^[a-zA-Z1-9-_*$]+$/.test(userName);

    if (!isOnlyStandardChars) {
        alert('You can only use a-z, A-Z, 1-9, -, _ , * ,$ characters.');
    } else {
        const confirmUserName = prompt(`Submitting you score under userName: ${userName}? (yes/no)`);

        if (confirmUserName === null) {
            alert('You are a picky one!\nChange your name or restart the game!')

        } else if (confirmUserName.toLowerCase() === 'yes') {
            alert('sweet!');
            dispatch(setNewScoreThunk(userName, score, 'sergey', 10));
        }
    }
};