const express = require('express');
const router = express.Router();
const { User } = require('../models/index');
const userUtils = require('../utils/user');

// Get list of users
router.get('/', (req, res) => 
    User.findAll()
        .then(users => { 
            res.sendStatus(200).json(users);
        })
        .catch(err => console.log(err))
);

router.get('/:username', async (req, res) => {
    try {
        let user = await userUtils.getUserViaUsername(req.params.username);
        if(user) {
            res.status(200).json({
                success: true,
                user: user
            });
        }
        else {
            res.status(401).json({ success: false, message: "User profile not found" });
        }
    }
    catch {
        res.status(401).json({ success: false, message: "User profile not found" });
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