import { useDispatch, useSelector } from "react-redux";
import { setScoreBoardThunk } from '../../actions.js';
import { PARTITION_KEY } from '../../constants.js';
import React from 'react';

export const Scoreboard = (props) => {
    const dispatch = useDispatch();
    const scoreBoardResults = useSelector(store => store.scoreboard);
    console.log('scoreboard render')

    React.useEffect(() => {
        console.log('running useEffect here')
        dispatch(setScoreBoardThunk(PARTITION_KEY));
    }, [])

    console.log(scoreBoardResults)

    return (
        <div className='bigBoy'>
         hi
        </div>
    )
}