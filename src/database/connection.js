

const { MongoClient } = require("mongodb");

let database;

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Check your .env file.");
  }

  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 30000,
  });

  await client.connect();

  database = client.db("cse341-books-db");

  console.log("Connected to MongoDB");
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database is not connected");
  }

  return database;
};

module.exports = { connectToDatabase, getDatabase };
