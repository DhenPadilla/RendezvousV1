const bcrypt = require('bcrypt');
const userUtils = require('../../utils/user');
const authService = require('../../service/auth');

module.exports =  {
    Query: {
        getUserByUsername(parent, args, { models }) { 
            try {
                return models.User(models.sequelize).findOne({ 
                    where: args 
                }).then((user) => {
                    return user;
                });
            }
            catch (err) {
                console.log(err);
                return {};
            }
        },
        allUsers(parent, args, { models }) { 
            return models.User(models.sequelize).findAll();
        }
    },
    Mutation: {
        signup: async (parent, args, { models }) => {
            // return models.User(models.sequelize).create(args);
            try {
                // Bcrypt:
                let hashedPassword = await authService.hashPassword(args.password);
                args.password = hashedPassword;
                // Check if user username exists:
                let checkUsername = await userUtils.getUserViaUsername(args.username);
                let checkEmail = await userUtils.getUserViaEmail(args.email);
                if(!checkUsername && !checkEmail) {
                    return await userUtils.create(args);
                }
                else {
                    console.log("Email/Username already in use.");
                }
            } catch(err) {
                console.log('Invalid user registration');
                return {};
            }
        },
        login: async (parent, args, { models }) => {
            try {
                // Check if user username exists:
                let user = await userUtils.getUserViaUsername(args.username);
                if(user) {
                    // Compare password with hashed password
                    authService.comparePassword(args.password, user.password)
                    .then((result) => {
                        // if passwords match:
                        if(result) {
                            const token = authService.issueJWT(user);
                            return user;
                        }
                    })
                    .catch(err => {
                        // return { success: false, message: "No user found with that username" };
                        console.log(err);
                    });
                }
                // else {
                //    return { success: false, message: "Bcrypt compare went wrong?" };
                // }
            } catch(err) {
                console.log(err);
            }
        }
    }
};