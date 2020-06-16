const user = require('./controller/user');
const auth = require('./auth');
const pusher = require('./pusher');

module.exports = function (app) {
    app.use('/user', user);
    app.use('/auth', auth);
    app.use('/pusher', pusher);
};