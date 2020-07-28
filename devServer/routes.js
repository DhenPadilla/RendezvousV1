const home = require('./controller/home');
const auth = require('./controller/auth');
const user = require('./controller/user');
const pusher = require('./pusher');
const friends = require('./controller/friends');

module.exports = function (app) {
    app.use('/', home);
    app.use('/user', user);
    app.use('/auth', auth);
    app.use('/pusher', pusher);
    app.use('/friends', friends);
};