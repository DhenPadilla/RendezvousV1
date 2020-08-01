const userUtils = require('../../utils/user');
const authService = require('../../service/auth');

module.exports =  {
    Query: {
        getUserByUsername: async (parent, args, { models }) =>{ 
            try {
                return await userUtils.getUserViaUsername(args);
            }
            catch (err) {
                console.log(err);
                return {};
            }
        },
        allUsers: async (parent, args, { models }) => { 
            return await userUtils.allUsers();
        },
        // allFriendsForUser: async(parent, args, { models, user }) => {
        //     return {};
        // }
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