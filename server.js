
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "src", "database", ".env") });

const express = require("express");
const { connectToDatabase } = require("./src/database/connection");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Books API",
  });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    console.warn("Server will continue running without a database connection.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
