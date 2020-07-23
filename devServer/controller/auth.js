const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');
const User = require('../models/User');
const userUtils = require('../utils/user');
const authService = require('../service/auth');

// Route paths are prepended with '/auth'

// Authenticate the user (protected)
router.get('/authenticate', authService.auth(), (req, res, next) => {
    res.status(200).json({ success: true, message: 'You are authorised!' });
});

// Sign-up/register
router.post('/signup', async(req, res, next) => {
    try {
        // TODO: Do form validation in Front-End
        const { first_name, last_name, username, email, password } = req.body;
        // Bcrypt:
        let hashedPassword = await authService.hashPassword(password);
        // Check if user username exists:
        let checkUsername = await userUtils.getUserViaUsername(username);
        if(!checkUsername) {
            userUtils.create(first_name, last_name, username, email, hashedPassword)
            .then(user => {
                const jwt = authService.issueJWT(user);
                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
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
                const jwt = authService.issueJWT(user);
                res.json({ 
                    success: true, 
                    user: user, 
                    token: jwt.token, 
                    expiresIn: jwt.expires 
                });
            }).catch((err) => {
                res.status(401).send(err.message);
            });
        }
        else {
            next(new Error('Email already in use'));
        }
    } catch(err) {
        res.status(401).send(err.message);
        next(new Error('Invalid User registration'));
    }
});

// Login
router.post('/login', async(req, res, next) => {
    try {
        // TODO: Do form validation in Front-End
        const { username, password } = req.body;
        // Check if user username exists:
        let user = await userUtils.getUserViaUsername(username);
        if(user) {
            // Compare password with hashed password
            authService.comparePassword(req.body.password, user.password)
            .then((result) => {
                // if passwords match:
                if(result) {
                    delete user['dataValues'].password;
                    console.log(user);
                    const token = authService.issueJWT(user);
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: token.token,
                        expires: token.expires,
                        message: "Successfully logged in user: @" + username + "!  ✅"
                    });
                }
                else {
                    res.status(401).json({ success: false, message: "You have entered the wrong password" });
                }
            })
            .catch(err => {
                res.status(401).json({ success: false, message: "No user found with that username" });
            });
        }
        else {
            res.status(401).json({ success: false, message: "Bcrypt compare went wrong?" });
        }
    } catch(err) {
        res.status(401).send(err.message);
        next(new Error('Invalid User Login'));
    }
})

// TODO: Logout

module.exports = router;