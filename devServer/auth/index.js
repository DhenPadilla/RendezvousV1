const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');
const User = require('../models/User');
const userUtils = require('../utils/user');

// Route paths are prepended with '/auth'

// Sign-up/register
router.post('/signup', async(req, res, next) => {
    try {
        // TODO: Do form validation in Front-End
        const { first_name, last_name, username, email, password, password2 } = req.body;
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

// Login
router.post('/login', async(req, res, next) => {
    try {
        // TODO: Do form validation in Front-End
        const { username, password } = req.body;
        // Bcrypt:
        let hashedPassword = await bcrypt.hash(password, 10);
        // Check if user username exists:
        let user = await userUtils.getUserViaUsername(username);
        if(user) {
            // Compare password with hashed password
            bcrypt.compare(req.body.password, user.password)
            .then((result) => {
                // if passwords match:
                if(result) {
                    // Set the 'set-cookie' header:
                    const isSecure = req.app.get('env') !== 'development';
                    res.cookie('user_id', user.id, {
                        httpOnly: true,
                        // Set true when in production
                        secure: isSecure,
                        signed: true,
                    });
                    res.status(200).json({
                        result,
                        message: "Successfully logged in user: @" + username + '!  ✅'
                    });
                }
                else {
                    next(new Error('Invalid login'));
                }
            })
        }
        else {
            next(new Error('Invalid login'));
        }
    } catch(err) {
        console.error(err.message);
        res.status(401).send(err.message);
        next(new Error('Invalid User Login'));
    }
})

module.exports = router;