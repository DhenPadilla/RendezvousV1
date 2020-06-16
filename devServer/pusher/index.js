const express = require('express');
const router = express.Router();
const Pusher = require('Pusher');

// Pusher config:
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});

router.post('/auth', (req, res) => {
    let socketId = req.body.socket_id;
    let channel = req.body.channel_name;
    random_string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let presenceData = {
        user_id: random_string,
        user_info: {
            username: '@' + random_string,
        }
    };
    let auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

router.post('/updateLocation', (req, res) => {
    // trigger a new post event via pusher
    pusher.trigger('presence-channel', 'location-update', {
        'username': req.body.username,
        'location': req.body.location
    })
    res.json({ 'status': 200 });
});

module.exports = router;