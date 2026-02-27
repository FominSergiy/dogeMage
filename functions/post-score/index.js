const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();
const ALLOWED_ORIGIN = 'https://fominsergiy.github.io';
const VALID_INPUT = /^[a-zA-Z1-9\-_*$]+$/;

exports.postScore = async (req, res) => {
  res.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { partitionKey, userName, score } = req.query;

  if (!partitionKey || !userName || score === undefined) {
    res.status(400).send('Missing required query parameters: partitionKey, userName, score');
    return;
  }

  if (!VALID_INPUT.test(partitionKey) || !VALID_INPUT.test(userName)) {
    res.status(400).send('Invalid characters in partitionKey or userName');
    return;
  }

  const docId = `${partitionKey}_${userName}`;
  await db.collection('scores').doc(docId).set({
    partitionKey,
    userName,
    score: String(score),
    timeStamp: new Date().toISOString(),
  });

  res.status(200).send('OK');
};
