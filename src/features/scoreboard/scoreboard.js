import { useDispatch, useSelector } from "react-redux";
import { getScoreBoardThunk } from '../../actions.js';
import { getTopScores } from "./scoreboardUtils.js"
import { PARTITION_KEY } from '../../constants.js';
import React from 'react';

export const Scoreboard = (props) => {
    const dispatch = useDispatch();
    const scoreBoardResults = useSelector(store => store.scoreboard);
    console.log('scoreboard render')

    React.useEffect(() => {
        console.log('running useEffect here')
        dispatch(getScoreBoardThunk(PARTITION_KEY));
    }, [])


    
    const topScores = getTopScores(scoreBoardResults, 10);
    console.log(topScores);
    // const topTenScores = getTopTenScores(scoreBoardResults)
    return (
        <div className='bigBoy'>
         hi
        </div>
    )
}


const Score = (props) => {

}



