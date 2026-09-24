const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT;

const client = new MongoClient(process.env.MONGODB_URI);

// MongoDB Connect
async function connectToMongoDB() {
  try {
    await client.connect();

    console.log("✅ MongoDB connected successfully!");

    const db = client.db("amar-fosol");

    console.log("✅ Database selected:", db.databaseName);

  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error(error);
  }
}

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Connect MongoDB
connectToMongoDB();