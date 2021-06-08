import { useDispatch, useSelector } from "react-redux";
import { getScoreBoardThunk } from '../../actions.js';
import { getTopScores, getRowElements  } from "./scoreboardUtils.js"
import { PARTITION_KEY } from '../../constants.js';
import React from 'react';

export const Scoreboard = (props) => {
    const dispatch = useDispatch();
    const scoreBoardResults = useSelector(store => store.scoreboard);

    React.useEffect(() => {
        dispatch(getScoreBoardThunk(PARTITION_KEY));
    }, [])

 
    const topScores = getTopScores(scoreBoardResults, 10);
    console.log(topScores);
    const rowElements = getRowElements(topScores, Score);

    return (
        <div className='table'>
            <div className='header'>scoreboard</div>
            {rowElements}
        </div>
    )
}


const Score = (props) => {
    return (
        <div className='row'>
            <div className="index">
                {props.index}
            </div>
            <div className="row" id="name">
                {props.user}
            </div>
            <div className="row" id="score">
                {props.score}
            </div>
        </div>
    )
}



