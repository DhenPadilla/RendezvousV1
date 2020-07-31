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
            let res = await authService.signup(args);
            return res;
        },
        login: async (parent, {username, password}, { models }) => {
           let res = await authService.login(username, password);
           return res;
        }
    }
};