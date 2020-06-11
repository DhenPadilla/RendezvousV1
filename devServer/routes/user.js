const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');
const User = require('../models/User');

// Get list of users
router.get('/', (req, res) => 
    User.findAll()
        .then(users => { 
            console.log(users);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
);

router.post('/register', async(req, res) => {
    try {
        const { first_name, last_name, username, email, password, password2 } = req.body;
        console.log(req.body);
        // Bcrypt:
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        User.findAll()
            .then(users => {
                console.log("All users:", JSON.stringify(users, null, 4));
            })
            .catch(err => console.log(err));
        User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashedPassword,
            status: "OFFLINE"
        }).then(user => {
            res.status(200).send("Successfully created the user: " + username);

        }).catch(err => console.log(err));
    } catch(err) {
        console.error(err.message);
    }
})

router.delete('/:username', async(req, res) => {
    const user = req.params.username;
    try {
        // Delete user via username
        User.destroy({
            where: {
                username: user
            }
        }).then(() => {
            res.send("Successfully deleted user: " + user);
        });
    }    
    catch (error) {
    }
        
})

module.exports = router;