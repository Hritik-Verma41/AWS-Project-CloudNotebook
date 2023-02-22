const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
const port = 5001;

// Connecting to the database
connectToMongo();

// Setting up cors
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Adding the routes
app.get('/api', (req, res) => {
    res.json({message : 'Welcome to cloud notebook api'});
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Starting the server
app.listen(port, () => {
    console.log(`Cloud notebook server started running!`);
});
