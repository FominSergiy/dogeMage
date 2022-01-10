export const getOnlyScores = (scoresObj) => {
    const onlyScores = [];
    scoresObj.forEach(
        row => onlyScores.push(row['Score'])
    );

    return onlyScores;
};

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
};

const sortScores = (a, b) => {
    const scoreA = parseInt(a['Score']);
    const scoreB = parseInt(b['Score']);

    if (scoreA > scoreB) return -1;
    if (scoreA === scoreB) return 0;
    if (scoreA < scoreB) return 1;
};