


require("dotenv").config();

const express = require("express");
const { connectToDatabase } = require("./src/database/connection");

const app = express();
const booksRoute = require("./src/routes/books");

app.use(express.json());
app.use("/books", booksRoute);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Books API",
  });
});

const startServer = async () => {
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on("error", (error) => {
    console.error("Server error:", error);
  });

  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.warn("Server will continue running without a database connection.");
  }
};

startServer();


