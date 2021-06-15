import { setNewScoreThunk } from '../../redux/actions.js';

const sortScores = (a, b) => {
    const scoreA = parseInt(a['Score']);
    const scoreB = parseInt(b['Score']);

    if (scoreA > scoreB) return -1;
    if (scoreA === scoreB) return 0;
    if (scoreA < scoreB) return 1;
}


export const getTopSortedScores = (scoreBoardResults, howMany) => {
    const scoreBoardArray = Object.entries(scoreBoardResults);

    const scores = [];
    scoreBoardArray.forEach(
        row =>
            scores.push({
                'User': row[0],
                'Score': parseInt(row[1]['Score']),
                'RowKey' : row[1]['TimeStamp']
            })
    );

    scores.sort(sortScores);
    return scores.slice(0, howMany);
}

export const getOnlyScores = (scoresObj) => {
    const onlyScores = [];
    scoresObj.forEach(
        row => onlyScores.push(row['Score'])
    );

    return onlyScores;
}

export const getRowElements = (topScores, Score) => {
    const rows = [];

    topScores.forEach((row, index) => rows.push(
        <Score key={index + 1}
            index={index + 1}
            user={row.User}
            score={row.Score}
        />
    ));

    return rows;
}


/**
 * This function is used to determine if new top 10 score is achieved
 * 
 * @param score - user's current score for a given game played.
 * @param topScoresArray -- an array of scores received from the back-end.
 * It contains only scores, sorted in desc order.
 * @param {*} boardLength -- a parameter that controls the size of the board
 * to be displayed.
 * @returns an array [newRecordSet, whichIndex] - [bool, integer]
 * 
 */
export const checkForNewRecord = (score, topScoresArray, boardLength) => {
    let newRecordSet = false;
    let whichIndex;

    //adding this condition to excludre run for when the board is still loading
    if (topScoresArray === null) {
        return [newRecordSet, whichIndex];
    }

    if (
        topScoresArray.length === 0
        && score !== 0
    ) {
        newRecordSet = true;
        return [newRecordSet, whichIndex];
    }


    if (score > topScoresArray[0]) {
        newRecordSet = true;
        whichIndex = 0;
        return [newRecordSet, whichIndex];
    }

    for (
        let i = 0;
        i < topScoresArray.length - 1;
        i++
    ) {
        if (
            score < topScoresArray[i]
            && score >= topScoresArray[i + 1]
        ) {
            newRecordSet = true;
            whichIndex = i + 1;
            break;
        }
    }

    if (
        !newRecordSet
        && topScoresArray.length < boardLength
        && score !== 0
    ) {
        newRecordSet = true;
    }

    return [newRecordSet, whichIndex];
}


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
}