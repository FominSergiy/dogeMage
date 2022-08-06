import React from "react";
import * as Constants from "../../constants.js";
import GameOver from "../gameOver/GameOver.js";
import Scoreboard from "../scoreBoard/ScoreBoard.js";

export const renderBoard = (
    Board,
    isGameOver,
    squares,
    coinAndMagePos,
    score,
    timer,
    screenSize
) => {
    if (isGameOver) {
        const renderScore = renderGameOver(score);
        const img = Constants.GAME_OVER_IMG;

        return (
            <div>
                <GameOver
                    img={img}
                    renderScore={renderScore}
                />
                <Scoreboard />
            </div>
        );
    } else {
        return (
            <div className={`game-board ${screenSize}`}>
                <div className="score"><h2>Score: {score}</h2></div>
                <div className="timer"><h2>Time: {timer}</h2></div>
                <Board
                    class="board"
                    squares={squares}
                    coinAndMagePos={coinAndMagePos}
                    img={Constants.IMG}
                    coinImg={Constants.COIN}
                    timer={timer}
                />
            </div>
        );
    }
};

export const renderInstructions = () => {
    return (
        <div className="instructions">
            <h1>Collect all the DOGE!</h1>
            <h2>Rules:</h2>
            <h3>1. Use keyboard arrows (← ↑ ↓ →) to move the character</h3>
            <h3>1. Use Enter key to restart the game</h3>
            <h3>2. If you move over the edge it is game over</h3>
            <h3>3. Collect as many DOGE in 60 sec to fly to the moon!</h3>
        </div>
    );
};

const renderGameOver = (score) => {
    const msg = getScoreMessage(score);

    return (
        <div className="finalScore">
            <h2>Your Score: {score}</h2>
            <h3>{msg}</h3>
        </div>
    );
};

const getScoreMessage = (score) => {
    let msg = null;

    if (score >= 0) msg="Try harder next time!";
    if (score > 5) msg="Are you sure you are using keyboard?";
    if (score > 10) msg="Your rocket crashed back on Earth!";
    if (score > 20) msg="I can see DODG high in the sky!";
    if (score > 50) msg="You are really good at this!";
    if (score > 75) msg="TO THE MOOOON!";

    return msg;
};

export const getOnlyScores = (scoresObj) => {
    const onlyScores = [];
    scoresObj.forEach(
        row => onlyScores.push(row["Score"])
    );

    return onlyScores;
};

export const getTopSortedScores = (scoreBoardResults, howMany) => {
    const scoreBoardArray = Object.entries(scoreBoardResults);

    const scores = [];
    scoreBoardArray.forEach(
        row =>
            scores.push({
                "User": row[0],
                "Score": parseInt(row[1]["Score"]),
                "RowKey" : row[1]["TimeStamp"]
            })
    );

    scores.sort(sortScores);
    return scores.slice(0, howMany);
};

const sortScores = (a, b) => {
    const scoreA = parseInt(a["Score"]);
    const scoreB = parseInt(b["Score"]);

    if (scoreA > scoreB) return -1;
    if (scoreA === scoreB) return 0;
    if (scoreA < scoreB) return 1;
};

export const getScreenSize = () => {
    const screenWidth = window.innerWidth;
    const smallScrenWidth = Constants.SMALL_SCREEN.width;

    if (
        screenWidth <= smallScrenWidth
    ) {
        return Constants.SCREEN_SIZES.small;
    }

    return Constants.SCREEN_SIZES.large;
};