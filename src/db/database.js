const { MongoClient } = require('mongodb');
import MongoScript from '../../src/script/mongoScript';
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';


// Use connect method to connect to the server
MongoClient.connect(url, async (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db('jobTest');
  const script = new MongoScript();
  await script.updateBlock(db);
  client.close();
});
