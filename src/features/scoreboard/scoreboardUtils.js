const sortScores = (a, b) => {
    const scoreA = parseInt(a['Score']);
    const scoreB = parseInt(b['Score']);

    if (scoreA > scoreB) return -1;
    if (scoreA === scoreB) return 0;
    if (scoreA < scoreB) return 1;
}


export const getTopSortedScores = (scoreBoardResults, howMany) => {
    // convert into arrays and the right data format
    const scoreBoardArray = Object.entries(scoreBoardResults);

    const scores = [];
    scoreBoardArray.forEach(
        row => 
            scores.push({ 
                'User' : row[0], 
                'Score' : parseInt(row[1]['Score'])
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