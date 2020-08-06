const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const userUtils = require('../utils/user');
// KEYS
const pathToPrivKey = path.join(__dirname, '..', 'secrets', 'keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');
const pathToPubKey = path.join(__dirname, '..', 'secrets', 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

let Auth = {};

Auth.issueJWT = function(userId) {
    const JWT_TTL = '1d'; // 1 day expiration
    const payload = {
        sub: userId,
        iat: Date.now()
    }
    const signedToken = jwt.sign(
        payload,
        PRIV_KEY, 
        { expiresIn: JWT_TTL, algorithm: 'RS256' }
    );
    return {
        token: signedToken,
        expires: JWT_TTL
    }
};

Auth.issueRefreshJWT= function(user) {
  const id = user.id;
  const JWT_TTL = '7d'; // 1 day expiration
  const payload = {
      sub: id,
      iat: Date.now()
  }
  const signedToken = jwt.sign(
      payload,
      PRIV_KEY, 
      { expiresIn: JWT_TTL, algorithm: 'RS256' }
  );
  return {
      refreshToken: signedToken,
      expires: JWT_TTL
  }
};

Auth.authenticate = function (accessToken) {
  return jwt.verify(accessToken, PUB_KEY);
};

Auth.hashPassword = async function (password) {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

Auth.comparePassword = function (enteredPass, dbPassword) {
  try {
    return bcrypt.compare(enteredPass, dbPassword);
  } catch(err) {
    console.log(err);
  }
};

Auth.signup = async function (args) {
  try {
    // Bcrypt:
    let hashedPassword = await Auth.hashPassword(args.password);
    args.password = hashedPassword;
    // Check if user username exists:
    let checkUsername = await userUtils.getUserViaUsername(args.username);
    let checkEmail = await userUtils.getUserViaEmail(args.email);
    if(!(checkUsername.success) && !(checkEmail.success)) {
        let newUser = await userUtils.create(args);
        return {
          success: true,
          message: 'Successfully signed up @' + args.username,
          user: newUser
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
    let { user } = await userUtils.getUserViaUsername(username);
    if(user) {
      // Compare password with hashed password
        const result = await Auth.comparePassword(password, user.password);
            // if passwords match:
        if(result) {
            const { token } = Auth.issueJWT(user.id);
            const { refreshToken } = Auth.issueRefreshJWT(user.id);

            return {
                success: true,
                message: "Successfully logged in! ✅",
                token: token,
                refreshToken: refreshToken
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