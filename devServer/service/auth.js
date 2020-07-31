const bcrypt = require('bcrypt');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const passport = require('passport');
const pathToKey = path.join(__dirname, '..', 'secrets', 'keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const userUtils = require('../utils/user');

let Auth = {};

Auth.issueJWT = function(user) {
    const id = user.id;
    const JWT_TTL = '1d'; // 1 day
    const payload = {
        sub: id,
        iat: Date.now()
    }
    const signedToken = jsonwebtoken.sign(
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
  return passport.authenticate('jwt', { session: false });
};

Auth.hashPassword = async function (password) {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

Auth.comparePassword = function (enteredPass, dbPassword) {
  return bcrypt.compare(enteredPass, dbPassword);
};

Auth.signup = async function (args) {
  try {
    // Bcrypt:
    let hashedPassword = await Auth.hashPassword(args.password);
    args.password = hashedPassword;
    // Check if user username exists:
    let checkUsername = await userUtils.getUserViaUsername(args.username);
    let checkEmail = await userUtils.getUserViaEmail(args.email);
    if(!checkUsername && !checkEmail) {
        let newUser = await userUtils.create(args);
        return {
          success: true,
          message: 'Successfully signed up @' + args.username,
          user: newUser,
        }
    }
    else {
        return {
          success: false,
          errors: [{
            path: 'signup',
            message:  "Email/Username already in use."
          }]
        }
    }
  } catch(err) {
      return {
        success: false,
        errors: [{
          path: 'signup',
          message:  err
        }]
      }  
    } 
}

Auth.login = async function (username, password) {
  try {
    let user = await userUtils.getUserViaUsername(username);
    if(user) {
        // Compare password with hashed password
        const result = await Auth.comparePassword(password, user.password)
            // if passwords match:
        if(result) {
            const { token } = Auth.issueJWT(user);
            return {
                success: true,
                message: "Successfully logged in! ✅",
                token: token
            }
        }
        else {
            return {
                success: false,
                errors: [{
                    path: 'password',
                    message: 'Incorrect password'
                }]
            }
        }
    }
  } catch (err) {
    return {
      success: false,
      errors: [{
        path: 'login',
        message: err
      }]
    }
  }
};



module.exports = Auth;