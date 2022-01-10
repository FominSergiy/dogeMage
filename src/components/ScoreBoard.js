import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { swapScoreBoard } from '../actions/scoreBoardActions.js';
import Score from './Score.js';
import NameForm from './NameForm.js';
import * as ScoreBoardUtils from "../utils/scoreBoardUtils.js";
import * as Constants from '../constants.js';

export const Scoreboard = () => {
    const dispatch = useDispatch();
    const score = useSelector(store => store.score);
    const scoreBoardResults = useSelector(store => store.scoreboard);
    const onlyScores = useSelector(store => store.topScores);
    const doSwap = useSelector(store => store.swapScoreBoard);

    React.useEffect(() => {
        const resultArr = ScoreBoardUtils.checkForNewRecord(
            score,
            onlyScores,
            Constants.scoreBoardLength
        );
        const newRecordSet = resultArr[0];

        if (newRecordSet) {
            dispatch(
                swapScoreBoard(true)
            );
        }

    }, [dispatch, score, onlyScores]);

    const rowElements = ScoreBoardUtils.getRowElements(
        scoreBoardResults,
        Score
    );

    const resultArr = ScoreBoardUtils.checkForNewRecord(
        score,
        onlyScores,
        Constants.scoreBoardLength
    );
    const whichIndex = resultArr[1];


    if (doSwap) {
        return (
            <NameForm
                whichIndex={whichIndex}
                itemAtIndex={scoreBoardResults[whichIndex]}
                score={score}
            />
        )
    } else {
        return (
            <div className='table'>
                <div className='header'>scoreboard</div>
                <div className='column-headers'>
                    <div className='row-sub' id="index">
                        Place
                    </div>
                    <div className='row-sub' id="name">
                        User
                    </div>
                    <div className='row-sub' id="score">
                        Score
                    </div>
                </div>
                {rowElements}
            </div>
        )
    }
};

export default Scoreboard;
