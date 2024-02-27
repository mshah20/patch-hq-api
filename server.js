const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 5000;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const dbURI = process.env.DB_URI;
const db = process.env.DB_DB;

var corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

const uri = `mongodb+srv://${user}:${pass}@${dbURI}.dnkgkze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const connect = async () => {
    try {
        await client.connect();
        console.log("Connected to db.");
    } catch (e) {
        console.error(e);
    }
}
connect()

const cleanup = (event) => {
    client.close();
    console.log("Disconnected from db.");
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

app.get('/color', async (req, res) => {
    const { game } = req.query;

    try {
        result = document
        const result = await client.db(db).collection("games").find({game}, { projection: { _id: 0, color: 1 } }).toArray();
        res.send(result[0]);
    } catch (e) {
        console.error(e);
    }
})

app.get('/all-games', async (req, res) => {
    try {
        result = document
        const result = await client.db(db).collection("games").find({}, { projection: { _id: 0, game: 1 } }).toArray();
        res.send(result);
    } catch (e) {
        console.error(e);
    }
})

app.get('/patches', async (req, res) => {
    const { game } = req.query;

    try {
        result = document
        const result = await client.db(db).collection(game).find({}, { projection: { _id: 0 } }).toArray();
        res.send(result);
    }
    catch (e) {
        console.error(e);
    }
})

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})