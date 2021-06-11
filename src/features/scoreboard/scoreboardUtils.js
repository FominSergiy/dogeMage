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
                'Score': parseInt(row[1]['Score'])
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

export const checkForNewRecord = (score, topScoresArray, boardLength) => {
    let newRecordSet = false;
    let whichIndex;

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
            && score > topScoresArray[i + 1]
        ) {
            newRecordSet = true;
            whichIndex = i + 1;
            break;
        }
    }

    if (
        !newRecordSet
        && topScoresArray.length < boardLength
    ) {
        newRecordSet = true;
    }

    return [newRecordSet, whichIndex];
}