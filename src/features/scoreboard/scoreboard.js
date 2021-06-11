import { useDispatch, useSelector } from "react-redux";
import { getScoreBoardThunk } from '../../redux/actions.js';
import * as ScoreBoardUtils from "./scoreboardUtils.js"
import * as Constants from '../../constants.js';
import React from 'react';

export const Scoreboard = (props) => {
    const dispatch = useDispatch();
    const score = useSelector(store => store.score);
    const scoreBoardResults = useSelector(store => store.scoreboard);
    const onlyScores = useSelector(store => store.topScores);

    React.useEffect(() => {
        // get top scores, sort then, and save in store
        dispatch(
            getScoreBoardThunk(
                Constants.PARTITION_KEY,
                Constants.scoreBoardLength
            )
        );
    }, []);


    const rowElements = ScoreBoardUtils.getRowElements(
        scoreBoardResults,
        Score
    );

    const [newRecordSet, whichIndex] = ScoreBoardUtils.checkForNewRecord(
        score,
        onlyScores,
        Constants.scoreBoardLength
    );

    if (newRecordSet) {
        if (whichIndex) {
            console.log(`newRecordSet? ${newRecordSet}`);
            console.log(`which index? ${whichIndex}`);
            console.log(`who holds that record? ${scoreBoardResults[whichIndex]['User']}`)
        } else {
            console.log(`Just a new record: ${score}`);
        }
    }

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


const Score = (props) => {
    return (
        <div className='row'>
            <div className='row-sub' id="index">
                {props.index}
            </div>
            <div className='row-sub' id="name">
                {props.user}
            </div>
            <div className='row-sub' id="score">
                {props.score}
            </div>
        </div>
    )
}
