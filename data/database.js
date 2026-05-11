const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
let _db;

const connectToDatabase = async () => {
  if (_db) return _db; // already connected
  const client = await MongoClient.connect(uri);
  _db = client.db();
  console.log('✅ Connected to MongoDB');
  return _db;
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not connected');
  }
  return _db;
};

module.exports = {
  connectToDatabase,
  getDb
};
