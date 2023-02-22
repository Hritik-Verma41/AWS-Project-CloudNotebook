const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_DB_URI).then(() => {
        console.log('Connected to the database successfully!');
    }).catch((err) => {
        console.log(err.message);
    });
};

module.exports = connectToMongo;
