import * as axios from 'axios';
import {
    SCOREBOARD_RESULTS_ENDPOINT,
    POST_NEW_SCORE_ENDPOINT,
    PARTITION_KEY
} from "./constants.js"

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

export const postNewScore = (userName, score) => {
    console.log('hi');
    try {
        return (
            axios.get(
                POST_NEW_SCORE_ENDPOINT,
                {
                    params: { 
                        'partitionKey': PARTITION_KEY,
                        'userName' : userName,
                        'score' : score
                    },
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                }
            )
        )
                
    } catch (error) {
        console.log(`Request was not successful. Error:${error}`)
    }
}