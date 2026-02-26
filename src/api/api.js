import axios from "axios";
import {
  PARTITION_KEY,
  POST_NEW_SCORE_ENDPOINT,
  SCOREBOARD_RESULTS_ENDPOINT,
} from "../constants.js";

export const getScoreboardRows = (partitionKey) => {
  try {
    return axios.get(SCOREBOARD_RESULTS_ENDPOINT, {
      params: { partitionKey: partitionKey },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.log(`Request was not successful. Error:${error}`);
  }
};

export const postNewScore = (userName, score) => {
  try {
    return axios.get(POST_NEW_SCORE_ENDPOINT, {
      params: {
        partitionKey: PARTITION_KEY,
        userName: userName,
        score: score,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.log(`Request was not successful. Error:${error}`);
  }
};
