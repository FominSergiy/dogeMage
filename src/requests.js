import * as axios from 'axios';
import {SCOREBOARD_RESULTS_ENDPOINT} from "./constants.js"

export const getScoreboardRows = (partitionKey) => {
    try {
        return (
            axios.get(
                SCOREBOARD_RESULTS_ENDPOINT,
                {
                    params: { partitionKey: partitionKey },
                    headers: {"Access-Control-Allow-Origin": "*"}
                }
            )
        )
                
    } catch (error) {
        console.log(`Request was not successful. Error:${error}`)
    }
}