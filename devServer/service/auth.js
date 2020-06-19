const bcrypt = require('bcrypt');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const path = require('path');
const passport = require('passport');

const pathToKey = path.join(__dirname, '..', 'secrets', 'keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

let Auth = {};

Auth.issueJWT = function(user) {
    const id = user.id;
    const JWT_TTL = '1d'; // 1 day
    const payload = {
        sub: id,
        iat: Date.now()
    }
    const signedToken = Jwt.sign(
        payload, 
        PRIV_KEY, 
        { expiresIn: JWT_TTL, algorithm: 'RS256' }
    );
    return {
        token: "Bearer " + signedToken,
        expires: JWT_TTL
    }
};

Auth.auth = function () {
  return passport.authenticate('jwt', {session: false});
};

Auth.hashPassword = async function (password) {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

Auth.comparePassword = function (enteredPass, dbPassword) {
  return bcrypt.compare(enteredPass, dbPassword);
};

module.exports = Auth;