const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middlewares/fetchuser');
require('dotenv').config();

// Sign up end-point: Creates a new user using POST request
router.post('/signup', [
    // Adding the body validation
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('first_name').isLength({min: 1, max: 20}),
    body('last_name').isLength({min: 1, max: 20})
], async (req, res) => {
    // Checking for a valid request - Throw errors if found 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        // Check if a user with same email if already exists - If found return with a message
        let user_exist_check = await User.findOne({email: req.body.email});
        if(user_exist_check) {
            return res.status(400).json({
                message: 'User with same email id already exist!'
            });
        }
        // Hasing the password to make it encrypted and secure
        const salt = await bcrypt.genSalt(10);
        const securedPswd = await bcrypt.hash(req.body.password, salt);
        // Adding a new user to the database
        let new_user = await User.create({
            email: req.body.email,
            password: securedPswd,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });
        // Generating an auth token
        const data = {
            user: {
                id: new_user._id
            }
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        // adding the auth-token to headers
        res.setHeader("Access-Control-Expose-Headers", "auth-token");
        res.setHeader('auth-token', authToken);
        // response a success message to the user
        res.json({
            message: 'New user created successfully!'
        });
    } catch(err) {
        // log the error and show an internal sever error if any error occurs
        console.log({errors: err.message});
        res.status(500).send('ERROR 500 | Internal Server Error!');
    }
});

// Login end-point: Authenticates an existing user using POST request
router.post('/login', [
    // Adding a body validation
    body('email').isEmail(),
    body('password').isLength({min: 5})
], async (req, res) => {
    // Check if a user with same email if already exists - If found return with a message
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        // Checking if the user with requested email exists or not
        let user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials!'});
        }
        // Comaparing the hashed request password to user's hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        // Return with a unauthorized access response if passwords doesn't match
        if(!passwordCompare) {
            return res.status(400).json({message: 'Invalid credentials!'});
        }
        const data = {
            user: {
                id: user.id
            }
        };
        // Generating an auth token
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        // adding the auth-token to headers
        res.setHeader("Access-Control-Expose-Headers", "auth-token");
        res.setHeader('auth-token', authToken);
        // response a success message to the user
        res.json({
            message: 'User logged in successfully!'
        });
    } catch(err) {
        // log the error and show an internal sever error if any error occurs
        console.log({errors: err.message});
        res.status(500).send('ERROR 500 | Internal Server Error!');
    }
});

// Get user details end-point: Get signed in user details using GET request
router.get('/getuser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        // response the user details
        res.json(user);
    } catch(err) {
        // log the error and show an internal sever error if any error occurs
        console.log({errors: err.message});
        res.status(500).send('ERROR 500 | Internal Server Error!');
    }
});

module.exports = router;
