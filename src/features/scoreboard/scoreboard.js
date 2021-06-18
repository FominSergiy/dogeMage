import { useDispatch, useSelector } from "react-redux";
import { swapScoreBoard, setUserName } from '../../redux/actions.js';
import * as ScoreBoardUtils from "./scoreboardUtils.js"
import * as Constants from '../../constants.js';
import React from 'react';

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
    
        if (newRecordSet)
            dispatch(
                swapScoreBoard(true)
            );
        
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



const NameForm = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(store => store.userName);

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const isSubmit = event.keyCode === 13
                ? true
                : false;
    

            if (isSubmit) {
                ScoreBoardUtils.handleSubmit(
                    event, 
                    userName,
                    props.whichIndex,
                    props.itemAtIndex,
                    props.score,
                    dispatch
                );
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // cleanup this component
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch, props, userName]);

    return (
        <div className='winner'>
            <div className='congrats'>
                <h1>Congrats on setting a new Record!</h1>
            </div>
            <form onSubmit={
                event => ScoreBoardUtils.handleSubmit(
                    event, 
                    userName,
                    props.whichIndex,
                    props.itemAtIndex,
                    props.score,
                    dispatch
                )}>
                <label>
                    How should we write you down in History?
                    <br></br>
                    <input 
                        type='text' 
                        onChange={event => dispatch(
                            setUserName(event.target.value)
                        )}
                    />
                </label>
                <br></br>
                <button className='submit' type='Submit'>
                    submit
                </button>
            </form>
        </div>
    )
}
