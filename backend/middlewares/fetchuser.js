const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req, res, next) => {
    // get the user from jwt token and add it to req object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).json({error: 'Invalid token'});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch(err) {
        res.status(401).send('Invalid token');
    }
};

module.exports = fetchUser;
