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
            return await userUtils.getUser(user.id);
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