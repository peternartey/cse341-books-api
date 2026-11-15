
const { MongoClient } = require("mongodb");

let database;

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Check the .env file in src/database/.env");
  }

  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  });

  const connectionPromise = client.connect();
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("MongoDB connection timed out after 5 seconds."));
    }, 5000);
  });

  try {
    await Promise.race([connectionPromise, timeoutPromise]);
  } catch (error) {
    try {
      await client.close();
    } catch (closeError) {
      // Ignore close errors during failed connection attempts.
    }
    throw error;
  }

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
