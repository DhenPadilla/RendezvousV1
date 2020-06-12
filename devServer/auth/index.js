const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');
const User = require('../models/User');
const userUtils = require('../utils/user');

// Route paths are prepended with '/auth'

router.post('/register', async(req, res, next) => {
    try {
        // TODO: Do form validation in Front-End
        const { first_name, last_name, username, email, password, password2 } = req.body;
        console.log(req.body);
        // Bcrypt:
        let hashedPassword = await bcrypt.hash(password, 10);

        // Check if user username exists:
        let checkUsername = await userUtils.getUserViaUsername(username);
        if(!checkUsername) {
            userUtils.create(first_name, last_name, username, email, hashedPassword)
            .then(user => {
                res.status(200).send("Successfully created the user: @" + username);
            }).catch((err) => {
                res.status(401).send(err.message);
            });
        }
        else {
            next(new Error('Username already in use'));
        }

        //Check if email exists
        let checkEmail = await userUtils.getUserViaEmail(email);
        if(!checkEmail) {
            userUtils.create(first_name, last_name, username, email, hashedPassword)
            .then(user => {
                res.status(200).send("Successfully created the user: @" + username);
            }).catch((err) => {
                res.status(401).send(err.message);
            });
        }
        else {
            next(new Error('Email already in use'));
        }
    } catch(err) {
        console.error(err.message);
        res.status(401).send(err.message);
        next(new Error('Invalid User registration'));
    }
});

module.exports = router;