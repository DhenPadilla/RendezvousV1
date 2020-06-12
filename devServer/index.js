const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Database
const db = require('./config/dbConfig');

// Test DB
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to Rendezvous.'));

// app.get('/users/register', (req, res) => {
    // res.
// })

// ROUTES

const user = require('./routes/user');
const auth = require('./auth');

app.use('/user', user);
app.use('/auth', auth);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.use(function(err, req, res, next) {
    res.json({
        message: err.message,
        error: req.app.get('env') === 'dev' ? err : {}
    });
})