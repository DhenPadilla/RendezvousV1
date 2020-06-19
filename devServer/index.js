const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const Pusher = require('pusher');

// Database config
const db = require('./config/dbConfig');

// Passport config
require('./config/passport')(passport);

// Test DB
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

const app = express();

// Middleware
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(passport.initialize());

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
  })
}

// ROUTES
require('./routes')(app); // configure our routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


app.use(function(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        error: req.app.get('env') === 'dev' ? err : {}
    });
})