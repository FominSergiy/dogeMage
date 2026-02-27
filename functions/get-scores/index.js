const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();
const ALLOWED_ORIGIN = 'https://fominsergiy.github.io';

exports.getScores = async (req, res) => {
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

  const { partitionKey } = req.query;
  if (!partitionKey) {
    res.status(400).send('Missing partitionKey');
    return;
  }

  const snapshot = await db
    .collection('scores')
    .where('partitionKey', '==', partitionKey)
    .get();

  const result = {};
  snapshot.forEach((doc) => {
    const data = doc.data();
    result[data.userName] = {
      Score: String(data.score),
      TimeStamp: data.timeStamp,
    };
  });

  res.status(200).json(result);
};
