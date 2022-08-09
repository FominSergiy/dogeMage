import React from "react";

export const getRowElements = (topScores, Score, screenSize) => {
    const rows = [];

    topScores.forEach((row, index) => rows.push(
        <Score key={index + 1}
            index={index + 1}
            user={row.User}
            score={row.Score}
            screenSize={screenSize}
        />
    ));

    return rows;
};

const getCountOfMinNums = (topScoresArr) => {
    const minNum = Math.min(...topScoresArr);
    const minNumsCount = topScoresArr.reduce(
        (accum, currVal) => {
            const val = currVal === minNum ? 1 : 0;
            return accum + val;
        }
    );
    return [minNum , minNumsCount];
};

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

    // if there are > 1 min score in results, new records won't show on the board.
    // therefore I will exclude them from the calculation.

    //adding this condition to excludre run for when the board is still loading
    if (topScoresArray === null) {
        return [newRecordSet, whichIndex];
    }

    // if this is the first score on the board
    if (
        topScoresArray.length === 0
        && score !== 0
    ) {
        newRecordSet = true;
        return [newRecordSet, whichIndex];
    }

    // if this is the new highest score on the board
    if (score >= topScoresArray[0]) {
        newRecordSet = true;
        whichIndex = 0;
        return [newRecordSet, whichIndex];
    }

    // if this is not a new top score, but the board is not full yet
    if (
        !newRecordSet
        && topScoresArray.length < boardLength
        && score !== 0
    ) {
        newRecordSet = true;
        return [newRecordSet, whichIndex];
    }

    if (topScoresArray.length !== 0) {
        const [minNum, minNumsCount] = getCountOfMinNums(topScoresArray);
        // for everything else
        for (
            let i = 0;
            i < topScoresArray.length - 1;
            i++
        ) {
            if (
                score < topScoresArray[i]
                && score >= topScoresArray[i + 1]
                && score !== minNum
            ) {
                newRecordSet = true;
                whichIndex = i + 1;
                break;
            }
            else if  (
                score === minNum
                && minNumsCount < 1
            ) {
                newRecordSet = true;
                whichIndex = i + 1;
                break;
            }
        }
    }

    return [newRecordSet, whichIndex];
};