const home = require('./controller/home');
const auth = require('./controller/auth');
const user = require('./controller/user');
const pusher = require('./pusher');

module.exports = function (app) {
    app.use('/', home);
    app.use('/user', user);
    app.use('/auth', auth);
    app.use('/pusher', pusher);
};