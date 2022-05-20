import { setTopScores, setScoreboard } from "./gameActions";
import { getScoreboardRows } from "../../api/api.js";
import { getOnlyScores, getTopSortedScores } from "./gameUtils.js";

// get the response from the api, use func to process data...
// ...save processed data to the redux store.
export const getScoreBoardThunk = (partitionKey, howMany) => dispatch => {
    getScoreboardRows(partitionKey)
        .then(response => getTopSortedScores(response.data, howMany))
        .then(processedData => {
            dispatch(setScoreboard(processedData));
            return getOnlyScores(processedData);

        }).then(onlyScores => dispatch(setTopScores(onlyScores))
        ).catch(err => alert(`Ops! Something is Wrong with the Scoreboard load:${err.message}`));
};