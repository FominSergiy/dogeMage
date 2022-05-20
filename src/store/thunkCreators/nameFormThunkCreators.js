import { postNewScore } from "../../api/api.js";
import { swapScoreBoard } from "../../actions/scoreBoardActions.js";
import { getScoreBoardThunk } from "../../components/game/gameThunkCreators";

// set new score in the table and re-generate scoreboard
export const setNewScoreThunk = (userName, score, partitionKey, howMany) => dispatch => {
    postNewScore(userName, score)
        .then(response => {
            if (response.status === 200) return response;
        }).then(() => {
            dispatch(
                getScoreBoardThunk(
                    partitionKey,
                    howMany
                )
            );}).then(() => {
            dispatch(
                swapScoreBoard(
                    false
                )
            );
        }).catch(
            err => alert(`Ops! Something is Wrong with a new score upload:${err.message}`)
        );
};