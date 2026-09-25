const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT;

const client = new MongoClient(process.env.MONGODB_URI);

// MongoDB Connect
async function connectToMongoDB() {
  try {
    await client.connect();

    console.log("✅ MongoDB connected successfully!");

    const db = client.db("amar-fosol");
    const productCollection=db.collection("products")

    // add product api
    app.post('/product', async (req,res)=>{
      const productData = req.body
      const result =await productCollection.insertOne(productData)
      res.send(result)
    })


    // all product get api

    app.get('/product',async (req,res)=>{
      const result = await productCollection.find().toArray()
      res.send(result)
    })

    // one product api for products details 
    app.


























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