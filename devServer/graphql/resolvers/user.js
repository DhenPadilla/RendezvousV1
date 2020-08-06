const userUtils = require('../../utils/user');
const authService = require('../../service/auth');
const friendshipUtils = require('../../utils/friendship');

module.exports =  {
    Query: {
        getUserByUsername: async (parent, args, { models }) =>{ 
            return await userUtils.getUserViaUsername(args);
        },
        allUsers: async (parent, args, { models }) => { 
            return await userUtils.allUsers();
        },
        getUser: async (parents, args, { models, user }) => {
            if(user) {
                return await userUtils.getUser(user);
            }
            return {
                success: false,
                errors: {
                    path: '/graphql/getUser',
                    message: 'Could not find user / userId is not defined in graphql context'
                }
            };
        }
    },
    Mutation: {
        signup: async (parent, args, { models }) => {
            let res = await authService.signup(args);
            return res;
        },
        login: async (parent, {username, password}, { req, models }) => {
           let { success, message, token, refreshToken } = await authService.login(username, password);
           return {
               success,
               message,
               token
           };
        }
    }
};