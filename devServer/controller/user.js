const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); 
const User = require('../models/User');

// Get list of users
router.get('/', (req, res) => 
    User.findAll()
        .then(users => { 
            res.sendStatus(200).json(users);
        })
        .catch(err => console.log(err))
);

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