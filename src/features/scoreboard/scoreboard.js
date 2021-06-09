import { useDispatch, useSelector } from "react-redux";
import { getScoreBoardThunk } from '../../redux/actions.js';
import { getRowElements } from "./scoreboardUtils.js"
import { PARTITION_KEY } from '../../constants.js';
import React from 'react';

export const Scoreboard = (props) => {
    const dispatch = useDispatch();
    const scoreBoardResults = useSelector(store => store.scoreboard);
    const onlyScores = useSelector(store => store.topScores);

    React.useEffect(() => {
        // get top scores, sort then, and save in store
        dispatch(getScoreBoardThunk(PARTITION_KEY, 10));
    }, [dispatch])

    
    const rowElements = getRowElements(scoreBoardResults, Score);
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



