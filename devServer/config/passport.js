const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../config/dbConfig');
const User = require('../models/User');
const userUtils = require('../utils/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');

const pathToKey = path.join(__dirname, '..', 'secrets', 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// TODO
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        let { user } = await userUtils.getUser(payload.sub);
        console.log(user);
        return done(null, user);
    }
    catch (err) {
        console.error('devServer/passport.js error');
        console.error(err);
        done(err, false);
    }
});

// TODO
module.exports = (passport) => {
    passport.use(strategy);
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
      
    passport.deserializeUser((id, done) => {
        try {
            let { user } = userUtils.getUser(id);
            cb(null, user);
        }
        catch (err) {
            console.error('devServer/passport.js error');
            console.error(err);
            done(err, false);
        }
    })
}