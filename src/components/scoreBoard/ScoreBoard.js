import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { swapScoreBoard } from "./scoreBoardActions.js";
import Score from "../score/Score.js";
import NameForm from "../nameForm/NameForm";
import * as ScoreBoardUtils from "./scoreBoardUtils.js";
import * as Constants from "../../constants.js";
import "./scoreBoard.css";
import PropTypes from "prop-types";

export const Scoreboard = (props) => {
    const dispatch = useDispatch();
    const score = useSelector(store => store.score);
    const scoreBoardResults = useSelector(store => store.scoreboard);
    const onlyScores = useSelector(store => store.topScores);
    const doSwap = useSelector(store => store.swapScoreBoard);
    const screenSize = props.screenSize;

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
        Score,
        screenSize
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
        );
    } else {
        return (
            <div className={`table ${screenSize}`}>
                <div className={`header-${screenSize}`}>scoreboard</div>
                <div className='column-headers'>
                    <div className='row-sub' id={`index-${screenSize}`}>
                        Place
                    </div>
                    <div className='row-sub' id={`name-${screenSize}`}>
                        User
                    </div>
                    <div className='row-sub' id={`score-${screenSize}`}>
                        Score
                    </div>
                </div>
                {rowElements}
            </div>
        );
    }
};

Scoreboard.propTypes = {
    screenSize: PropTypes.string
};

export default Scoreboard;
