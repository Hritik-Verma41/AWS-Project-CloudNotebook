const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
const port = 5001;

// Connecting to the database
connectToMongo();

app.use(cors());
app.use(express.json());

// Adding the routes
app.get('/', (req, res) => {
    res.json({message : 'Welcome to cloud notebook api'});
});
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

// Starting the server
app.listen(port, () => {
    console.log(`Cloud notebook server started running!`);
});
